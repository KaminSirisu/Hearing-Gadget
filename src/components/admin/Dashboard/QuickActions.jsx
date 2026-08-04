import { Boxes, Settings, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    { icon: <Boxes size={30} className="text-blue-400 bg-blue-100 rounded-md p-1"/> ,label: "Manage Products", subtext: "Add, edit and manage your products", link: "/admin/products" },
    { icon: <Tag size={30} className="text-green-400 bg-green-100 rounded-md p-1"/> ,label: "Manage Categories", subtext: "Organize your product categories", link: "/admin/categories" },
    { icon: <Settings size={30} className="text-purple-400 bg-purple-100 rounded-md p-1"/> ,label: "Manage Settings", subtext: "Configure your website settings", link: "/admin/setting" },
  ]

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="font-medium text-lg mb-2">Quick Actions</h2>
        {actions.map((action, index) => (
            <div key={index} className="bg-white p-2 shadow-sm rounded-lg mb-2">
                <Link to={action.link} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {action.icon}
                        <div>
                            <h2 className="font-medium">{action.label}</h2>
                            <p className="text-xs text-gray-500">{action.subtext}</p>
                        </div>
                    </div>
                    <ArrowRight className="text-gray-400" size={15}/>
                </Link>
            </div>
            
        ))}
    </div>
  )
}

export default QuickActions