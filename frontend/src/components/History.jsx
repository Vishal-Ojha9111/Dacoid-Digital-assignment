function History({ results }) {

    // Format timestamp to Indian Standard Time
    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">History</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-2 border-b">S.N.</th>
                        <th className="py-2 px-2 border-b">Time(IST)</th>
                        <th className="py-2 px-2 border-b">Correct Answers</th>
                        <th className="py-2 px-2 border-b">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => {
                        const correctAnswers = result.results.result.filter(r => r.isCorrect).length
                        return (
                            <tr key={result.id}>
                                <td className="py-2 px-2 border-b">{index + 1}</td>
                                <td className="py-2 px-2 border-b">{formatDate(result.id)}</td>
                                <td className="py-2 px-2 border-b">{correctAnswers} / {result.results.result.length}</td>
                                <td className="py-2 px-2 border-b">{result.results.pointsScored} / {result.results.totalPoints}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default History