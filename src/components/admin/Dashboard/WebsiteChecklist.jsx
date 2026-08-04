import { CircleCheck, TriangleAlert } from 'lucide-react';

const WebsiteChecklist = ({ checklist }) => {
    return (
        <div className="bg-white p-5 space-y-2 rounded-lg shadow-md">
            <h1 className="font-medium text-md">Website Checklist</h1>
            {checklist.map((item, index) => (
                <div key={index} className="flex justify-between space-x-0.5 text-xs">
                    <div className="flex items-center gap-1.5">
                        {item.completed ? (
                            <CircleCheck className="text-green-500" />
                        ) : (
                            <TriangleAlert className="text-orange-500" />
                        )}
                        <span>{item.label}</span>
                    </div>
                    <span className={item.completed ? "text-green-500" : "text-orange-500"}>
                        {item.completed ? "Completed" : "Missing"}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default WebsiteChecklist;