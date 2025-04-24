require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');

// Add debugging to see environment variables at startup
console.log("Starting server...");
console.log("Environment variables:", Object.keys(process.env));
console.log("GROQ_API_KEY exists:", Boolean(process.env.GROQ_API_KEY));
console.log("GROQ_API_KEY length:", process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0);

// Initialize Groq client with fallback and better error handling
let groq;
try {
  const { Groq } = require("groq-sdk");
  
  // Check if API key exists, otherwise use a hardcoded key (for development/testing)
  const apiKey = process.env.GROQ_API_KEY || "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";
  
  console.log("Initializing Groq client with API key (first 5 chars):", apiKey.substring(0, 5) + "...");
  
  groq = new Groq({
    apiKey: apiKey,
  });
  console.log("Groq client initialized successfully");
} catch (error) {
  console.error("Failed to initialize Groq client:", error);
}

const { BASE_PROMPT, getSystemPrompt } = require("./prompts");
const { basePrompt: nodeBasePrompt } = require("./defaults/node");
const { basePrompt: reactBasePrompt } = require("./defaults/react");

const app = express();

// Add health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send({
    status: "ok",
    groqInitialized: Boolean(groq),
    envVars: {
      hasGroqKey: Boolean(process.env.GROQ_API_KEY),
      port: process.env.PORT
    }
  });
});

// Error handler middleware - add this first to catch path-to-regexp errors
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  if (err instanceof TypeError && err.message.includes('Missing parameter name')) {
    return res.status(400).send('Invalid URL format');
  }
  next(err);
});

app.use(cors());
app.use(express.json());

// API routes - defined explicitly
app.post("/template", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'qwen-qwq-32b',
      temperature: 0.1,
      max_completion_tokens: 10,
      top_p: 0.95,
      stream: false
    });

    const answer = response.choices[0].message.content.trim().toLowerCase();
    console.log("LLM answer:", JSON.stringify(answer));

    if (answer.includes("react")) {
      res.json({
        prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        uiPrompts: [reactBasePrompt]
      });
      return;
    }

    if (answer.includes("node")) {
      res.json({
        prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        uiPrompts: [nodeBasePrompt]
      });
      return;
    }

    // Always fallback to React template
    res.json({
      prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [reactBasePrompt]
    });
  } catch (error) {
    console.error('Error in /template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: getSystemPrompt() },
        ...messages
      ],
      model: 'qwen-qwq-32b',
      temperature: 0.7,
      max_completion_tokens: 8000,
      top_p: 0.95,
      stream: false
    });

    res.json({
      response: response.choices[0].message.content
    });
  } catch (error) {
    console.error('Error in /chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../public')));

// SPA fallback - avoid using wildcards with path-to-regexp
app.use((req, res) => {
  // Only send index.html for non-API requests with an HTML content type
  if (!req.path.startsWith('/api/') && 
      (req.headers.accept && req.headers.accept.includes('text/html'))) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } else {
    res.status(404).send('Not Found');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
