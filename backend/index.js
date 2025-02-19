import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { getQuestions, verifyAnswers } from "./controllers/questions.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())

app.get("/api/getquestions",getQuestions);
app.post("/api/verifyanswer",verifyAnswers);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});