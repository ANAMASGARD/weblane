require("dotenv").config();
const express = require("express");
const { Groq } = require("groq-sdk");
const { BASE_PROMPT, getSystemPrompt } = require("./prompts");
const { basePrompt: nodeBasePrompt } = require("./defaults/node");
const { basePrompt: reactBasePrompt } = require("./defaults/react");
const cors = require("cors");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
const app = express();
app.use(cors());
app.use(express.json());

app.post("/template", async (req, res) => {
  try {
    // Log received request body
    console.log("Received request body:", req.body);
    
    if (!req.body || !req.body.prompt) {
      console.log("Missing prompt in request");
      return res.status(400).json({ message: "Missing prompt in request" });
    }
    
    const prompt = req.body.prompt;
    console.log("Processing prompt:", prompt);
    
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
      temperature: 0.2,
      max_tokens: 200,
      top_p: 0.95,
      stream: false
    });

    // Log full API response
    console.log("API Response:", JSON.stringify(response, null, 2));
    
    const answer = response.choices[0]?.message?.content?.trim().toLowerCase(); // react or node
    console.log("Detected project type:", answer);

    // More flexible matching
    if (answer && answer.includes("react")) {
      res.json({
        prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        uiPrompts: [reactBasePrompt]
      });
      return;
    }

    if (answer && answer.includes("node")) {
      res.json({
        prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        uiPrompts: [nodeBasePrompt]
      });
      return;
    }

    res.status(403).json({message: "You cant access this"});
    return;
  } catch (error) {
    console.error("Error processing template request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;
    
    // Format messages for Groq API (with system prompt as first message)
    const messageList = [
      { role: 'system', content: getSystemPrompt() },
      ...(Array.isArray(messages) ? messages : [{ role: 'user', content: messages }])
    ];
    
    // Call Groq API
    const response = await groq.chat.completions.create({
      messages: messageList,
      model: 'qwen-qwq-32b',
      temperature: 0.7,
      max_tokens: 8000,
      top_p: 0.95,
      stream: false
    });

    console.log(response);

    // Return response in the same format as the TS code
    res.json({
      response: response.choices[0].message.content
    });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});