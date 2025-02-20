import { useEffect, useRef, useState } from "react"

function Question ({question, totalQuestions, questionIndex, setAnswer, answer}) {
    const [selectedOption, setSelectedOption] = useState(null)
    const inputRef = useRef(null)

    // Focus the input field when the question index changes
    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus()
        }
    },[questionIndex])

    // Handle option change
    const handleChange = (option) =>{
        setSelectedOption(option)
        setAnswer(option)
    }

    return (
        <>
        <h4 className="text-lg font-semibold mb-2">{questionIndex+1}/{totalQuestions}</h4>
        <h2 className="text-xl font-bold mb-4">Q.{questionIndex+1} {question.question}</h2>
        <div>
            <p className="mb-2">{question.options.length>1?"Options:":"Type your answer"}</p>
            {question.options.length > 0 ? question.options.map((option, index) => (
                <div key={index} className="mb-2">
                    <span className="mr-2">{index+1}</span>
                    <button
                        onClick={() => handleChange(option)}
                        className={`px-4 py-2 rounded-lg ${selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {option}
                    </button>
                </div>
            )) :
            <input
                type="text"
                ref={inputRef}
                onChange={(e) => handleChange(e.target.value)}
                value={answer}
                className="px-4 py-2 border rounded-lg w-full"
            />
            }
        </div>
        </>
    )
}

export default Question