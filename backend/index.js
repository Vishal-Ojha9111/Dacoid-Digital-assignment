import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { getQuestions, verifyAnswers } from "./controllers/questions.controller.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to enable CORS with specific options
app.use(cors({
    origin: process.env.ORIGIN, // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to get quiz questions
app.get("/api/getquestions", getQuestions);

// Route to verify quiz answers
app.post("/api/verifyanswers", verifyAnswers);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});