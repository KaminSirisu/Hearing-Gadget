import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar.jsx";
import AdminHeader from "../components/admin/AdminHeader.jsx";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
            <AdminHeader />

            <main className="min-w-0 flex-1 p-6">
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout