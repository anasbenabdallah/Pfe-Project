// chatbot.router.js
const express = require("express");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const dotenv = require("dotenv").config();

const ChatbotRouter = express.Router();
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 1000,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  // Add other safety settings as required
];

async function runChat(userInput) {
  const chat = await model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are a virtual assistant at Wyplay, a leader in software solutions for TV operators. Your job is to help users understand our services and guide them through our offerings..",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hello! Welcome to Wyplay. My name is Alex. Can I help you with information about our services or do you need support for specific products?",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Hi" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hi there! To better assist you, may I have your name and email address? This will help me provide more personalized service and update you with the latest from Wyplay.",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

ChatbotRouter.post("/chat", async (req, res) => {
  const userInput = req.body?.userInput;

  if (!userInput) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = ChatbotRouter;
