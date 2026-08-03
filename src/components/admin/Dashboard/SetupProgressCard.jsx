
const SetupProgressCard = ({ websiteStatus }) => {
    const { percent } = websiteStatus;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = (1 - (percent/100)) * circumference;

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-2">Website Setup Progress</p>
            <div className="flex ">
                <svg width="120" height="120" viewBox="0 0 120 120">
                    {/* background track circle */}
                    <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    {/* Progress circle */}
                    <circle 
                        cx="60" cy="60" r={radius}
                        fill="none" stroke="#3b82f6" strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 60 60)"
                    />
                    <text x="60" y="50" textAnchor="middle" dominantBaseline="middle" className="font-bold">{percent}%</text>
                    <text x="60" y="70" textAnchor="middle" dominantBaseline="middle" className="text-xs text-gray-500">Complete</text>
                </svg>
            </div>
            
        </div>
    )
}

export default SetupProgressCard;