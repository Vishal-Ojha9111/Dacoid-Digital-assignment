import { useEffect, useState } from "react"
import { openDB } from "idb"
import History from "./History"

function Result({ results }) {
    const [oldResults, setOldResults] = useState([])

    // Store results in IndexedDB and retrieve old results
    useEffect(() => {
        const storeResults = async () => {
            if (results && Object.keys(results).length > 0) {
                const db = await openDB('quiz-results', 1, {
                    upgrade(db) {
                        db.createObjectStore('results', { keyPath: 'id' })
                    }
                })

                // Get all old results first
                const allResults = await db.getAll('results')
                setOldResults(allResults)

                // Store the new result
                const timestamp = new Date().getTime()
                await db.put('results', { id: timestamp, results })
            }
        }

        storeResults()
    }, [results])

    // Handle retake button click
    const handleRetake = () => {
        window.location.reload()
    }

    return (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Result</h2>
            <div className="mb-4">
                <span className="block text-lg font-semibold">Total Correct Answers</span>
                <span className="block text-lg">{results.pointsScored}</span>
                <span className="block text-lg font-semibold">Score</span>
                <span className="block text-lg">{results.pointsScored}/{results.totalPoints}</span>
            </div>
            <button
                onClick={handleRetake}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
                Retake
            </button>
            {oldResults.length > 0 && <History results={oldResults} />}
        </div>
    )
}

export default Result