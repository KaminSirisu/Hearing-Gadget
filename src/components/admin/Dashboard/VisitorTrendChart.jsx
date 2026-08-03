import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const VisitorTrendChart = ({ visitorTrend }) => {
    const { trend }  = visitorTrend;

    if (trend.length === 0) {
        return (
            <div className="bg-white shadow rounded-lg p-4">
                <p className="text-gray-500 text-sm">No visitor trend data available.</p>
            </div>
        )
    }

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line type="monotone" dataKey="visitors" stroke="#3b82f6" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default VisitorTrendChart;