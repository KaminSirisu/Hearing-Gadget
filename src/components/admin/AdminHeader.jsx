import { UserCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

function AdminHeader() {
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-end border-b border-gray-200 bg-white px-6 py-3">
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-50 cursor-pointer transition-colors">
                {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <UserCircle size={20} className="text-gray-500" />
                </div> */}
                <span className="text-sm font-medium text-gray-700">
                    {user?.email ?? 'Admin'}
                </span>
                <ChevronDown size={14} className="text-gray-400" />
            </div>
        </header>
    );
}

export default AdminHeader;
