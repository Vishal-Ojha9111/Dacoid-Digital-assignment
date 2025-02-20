import { Questions } from "../data/questions.js"

// Function to get quiz questions
export const getQuestions = async (req,res) =>{
    try {
        const questions = Questions.map((question)=>{
            // Return only the id, question, and options of each question
            return {
                id: question.id,
                question: question.question,
                options: question.options
            };
        })
        // Send the questions as a JSON response
        res.status(200).json(questions);
    } catch (error) {
        // Handle any errors that occur in the response
        res.status(500).json({ message: "Error retrieving questions", error:error.message});
        // Handle any errors that occur in the console
        console.log("Error in getQuestions controller ",error.message)
    }
}

export const verifyAnswers = async (req, res) => {
    try {
        const userAnswer = req.body;
        let points = 0;
        // Compare user answers with correct answers and calculate points and store the result in an array
        const result = userAnswer.map((answer)=>{
            // Set isCorrect to false by default
            answer.isCorrect = false;
            // Find the question with the same id as the answer
            const question = Questions.find(q => q.id === answer.id);
            // If the question exists and the answer is correct, increment the points and set isCorrect to true
            if (question && question.answer === answer.answer) {
                points += 1;
                answer.isCorrect = true;
            }
            // Return only the id and isCorrect of each answer
            return {id:answer.id,isCorrect:answer.isCorrect}
        })
        // Send the result, total points and points scored as a JSON response
        res.status(200).json({ result, pointsScored:points,totalPoints:Questions.length });
    } catch (error) {
        // Handle any errors that occur in the response
        res.status(500).json({ message: "Error verifying answer", error:error.message});
        // Handle any errors that occur in the console
        console.log("Error in verifyAnswer controller ",error.message)
    }
}