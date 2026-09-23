import { User, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-2xl tracking-wider">
            Hearing Gadget
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-2 text-sm">
          <Link to="/" className="hover:bg-gray-100 rounded-lg px-4 py-2 transition-colors">
            หน้าแรก
          </Link>
          <Link to="/products" className="hover:bg-gray-100 rounded-lg px-4 py-2 transition-colors">
            รายการสินค้า
          </Link>
          <Link to="/about" className="hover:bg-gray-100 rounded-lg px-4 py-2 transition-colors">
            เกี่ยวกับเรา
          </Link>
          <Link to="/contact" className="hover:bg-gray-100 rounded-lg px-4 py-2 transition-colors">
            ติดต่อ
          </Link>
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setOpenDropDown(!openDropDown)} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <User className={`${openDropDown ? 'text-blue-500' : 'text-gray-700'}`} />
          </button>

          {openDropDown && (
            <div className="absolute right-0 mt-2 w-44 rounded-lg bg-white shadow-lg border border-gray-100 z-50 text-sm overflow-hidden">
              <Link
                to="/admin/login"
                onClick={() => setOpenDropDown(false)}
                className="px-4 py-3 hover:bg-blue-50 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors border-b border-gray-100"
              >
                <BadgeCheck size={18} />
                ล็อคอินแอดมิน
              </Link>

              <Link
                to="/user/login"
                onClick={() => setOpenDropDown(false)}
                className="px-4 py-3 hover:bg-blue-50 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User size={18} />
                ล็อคอินผู้ใช้
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
