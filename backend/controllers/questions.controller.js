import { Questions } from "../lib/questions.js"

export const getQuestions = async (req,res) =>{
    try {
        console.log(Questions)
        const questions = Questions.map((question)=>{
            return {
                id: question.id,
                question: question.question,
                options: question.options
            };
        })
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving questions", error:error.message});
        console.log("Error in getQuestions controller ",error.message)
    }
}

export const verifyAnswers = async (req, res) => {
    try {
        const {userAnswer} = req.body;
        let points = 0;
        const result = userAnswer.map((answer)=>{
            answer.isCorrect = false;
            const question = Questions.find(q => q.id === answer.id);
            if (question && question.answer === answer.answer) {
                points += 1;
                answer.isCorrect = true;
            }
            return {id:answer.id,isCorrect:answer.isCorrect}
        })
        res.status(200).json({ result, pointsEarned:points,totalPoints:Questions.length });
    } catch (error) {
        res.status(500).json({ message: "Error verifying answer", error:error.message});
        console.log("Error in verifyAnswer controller ",error.message)
    }
}