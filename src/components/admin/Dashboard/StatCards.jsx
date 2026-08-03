import { Boxes, Tag, Users } from 'lucide-react';


const StatCards = ({ data }) => {
    const cards = [
        {
            icon: <Boxes className="w-6 h-6 text-blue-500" />,
            label: 'Total Products',
            value: data.stats?.totalProducts ?? "-",
            subtext: "All products in your store"
        },
        {
            icon: <Tag className="w-6 h-6 text-blue-500" />,
            label: 'Total Categories',
            value: data.stats?.totalCategories ?? "-",
            subtext: "Product categories in your store"
        },
        {
            icon: <Users className="w-6 h-6 text-blue-500" />,
            label: 'Website Visitors',
            value: data.analytics?.count ?? "-",
            subtext: "Total visitors to your website"
        }
    ]

    return (
        <>
            {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div className="bg-blue-50 p-2 rounded-lg">
                            {card.icon}
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">{card.label}</p>
                            <p className="text-2xl font-bold mt-1">{card.value}</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{card.subtext}</p>
                </div>
            ))}
        </>
    )
}

export default StatCards;

// {
//     icon: <Users className="w-6 h-6 text-blue-500" />,
//     label: 'Website Visitors',
//     value: data.analytics ?? "-",
//     subtext: "Total visitors to your website"
// },
// {
//     icon: <Users className="w-6 h-6 text-blue-500" />,
//     label: 'Website Setup Progress',
//     value: data.websiteStatus?.percent ?? "-",
//     subtext: ""
// }