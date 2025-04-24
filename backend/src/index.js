require("dotenv").config();
const express = require("express");
const { Groq } = require("groq-sdk");
const { BASE_PROMPT, getSystemPrompt } = require("./prompts");
const { basePrompt: nodeBasePrompt } = require("./defaults/node");
const { basePrompt: reactBasePrompt } = require("./defaults/react");
const cors = require("cors");
const path = require('path');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../public')));

app.post("/template", async (req, res) => {
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
  console.log("LLM answer:", JSON.stringify(answer)); // <--- Add this line

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

  // Always fallback to React template, never 403
  res.json({
    prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
    uiPrompts: [reactBasePrompt]
  });
  return;
});

app.post("/chat", async (req, res) => {
  const messages = req.body.messages;

  // Call Groq API with system prompt as first message
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

  // Return the LLM response content
  res.json({
    response: response.choices[0].message.content
  });
});

// React Router fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
