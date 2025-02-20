import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import Question from "./components/Question"
import Result from "./components/Result"

function App() {

 const apiurl = import.meta.env.VITE_API_URL

 const [questions, setQuestions] = useState([])
 const [quizStarted,setQuizStarted] = useState(false)
 const [currentQuestion,setCurrentQuestion] = useState(0)
 const [countdown,setCountdown] = useState(30)
 const [intervalId, setIntervalId] = useState(null)
 const [quizEnded,setQuizEnded] = useState(false)
 const [userAnswers,setUserAnswers] = useState([])
 const [answer,setAnswer] = useState("")
 const [results, setResults] = useState([])

  // Function to fetch questions from the API
  const getquestions = async () =>{
    try {
      const res = await fetch(`${apiurl}/api/getquestions`)
      if (!res.ok) {
        throw new Error()
      }
      return await res.json()
    } catch (error) {
      toast.error(error.message)
      return []
    }
  }

  // Function to start the quiz
const startQuiz = async () =>{
  const fetchedQuestions = await getquestions()
  if (fetchedQuestions.length === 0) {
    toast.error("Failed to fetch questions. Please try again later.")
    return
  }
  setQuestions(fetchedQuestions)
  setQuizStarted(true)
}

// Effect to start the countdown when the quiz starts and questions are loaded
useEffect(() => {
  if (quizStarted && questions.length > 0) {
    startCountdown()
  }
}, [quizStarted, questions])

// Effect to move to the next question when the countdown reaches 0
useEffect(() => {
  if (countdown === 0) {
    nextQuestion()
  }
}, [countdown])

// Effect to restart the countdown when the current question changes
useEffect(() => {
  if (quizStarted && questions.length > 0) {
    startCountdown()
  }
}, [currentQuestion])

// Effect to end the quiz when quizEnded is set to true
useEffect(() => {
  if (quizEnded) {
    endQuiz()
  }
}, [quizEnded])

// Function to move to the next question or end the quiz if it's the last question
const nextQuestion = () =>{
  clearInterval(intervalId) // Clear any existing interval
  const newUserAnswers = [...userAnswers, { id: questions[currentQuestion].id, answer }]
  setUserAnswers(newUserAnswers)
  setAnswer("")
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
    setCountdown(30) // Reset countdown for the next question
  } else {
    clearInterval(intervalId)
    setQuizEnded(true) // Set quizEnded to true when the last question is reached
  }
}

// Function to start the countdown timer
const startCountdown = () =>{
  clearInterval(intervalId) // Clear any existing interval
  const id = setInterval(() => {
    setCountdown(prevCountdown => {
      if (prevCountdown <= 0) {
        clearInterval(id)
        return 0
      }
      return prevCountdown - 1
    })
  }, 1000)
  setIntervalId(id)
}

// Function to end the quiz and verify answers
const endQuiz = async () => {
  clearInterval(intervalId)
  try {
    const res = await fetch(`${apiurl}/api/verifyanswers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userAnswers)
    })
    if (!res.ok) {
      throw new Error("Error verifying answers")
    }
    const result = await res.json()
    setResults(result)
  } catch (error) {
    toast.error(error.message)
  }
}

// Cleanup effect to clear the interval on component unmount
useEffect(() => {
  return () => clearInterval(intervalId)
}, [intervalId])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Toaster />
      {quizStarted ? (
        quizEnded ? (
          <Result results={results} />
        ) : (
          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">{countdown}</span>
              <button
                onClick={nextQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
            {questions.length > 0 ? (
              <Question
                question={questions[currentQuestion]}
                totalQuestions={questions.length}
                questionIndex={currentQuestion}
                setAnswer={setAnswer}
                answer={answer}
              />
            ) : (
              <p className="text-red-500">No questions available.</p>
            )}
          </div>
        )
      ) : (
        <button
          onClick={startQuiz}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Start quiz
        </button>
      )}
    </div>
  )
}

export default App
