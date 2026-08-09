import { Ear, User, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [ openDropDown, setOpenDropDown ] = useState(false);

  return (
    <div className="bg-white max-w-6xl">
        <div className="w-full justify-between flex items-center py-4 mx-30">
            <div className='flex items-center gap-2'>
                <Ear size={25} className="text-blue-600"/>
                <Link to="/" className="font-bold text-2xl tracking-wider">Hearing Gadget</Link>
            </div>
            <div className="flex gap-5 text-sm">
                <Link to="/" className="hover:bg-gray-100 rounded-lg px-4 py-2">หน้าแรก</Link>
                <Link to="/products" className="hover:bg-gray-100 rounded-lg px-4 py-2">รายการสินค้า</Link>
                <Link to="/about" className="hover:bg-gray-100 rounded-lg px-4 py-2">เกี่ยวกับเรา</Link>
                <Link to="/contact" className="hover:bg-gray-100 rounded-lg px-4 py-2">ติดต่อ</Link>
            </div>
            <div className='relative'>
                <button onClick={() => setOpenDropDown(!openDropDown)}>
                    <User className={`${openDropDown && 'text-blue-500 border border-gray-300 rounded-xl p-0.5 shadow-md'}`}/>
                </button>

                {openDropDown && (
                    <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg z-50 text-sm">
                        <Link
                            to="/admin/login"
                            className="px-4 py-3 hover:bg-blue-100 flex gap-2 hover:text-blue-600 justify-center rounded-t-lg"
                        >
                            
                            <BadgeCheck />
                            ล็อคอินแอดมิน
                        </Link>

                        <Link
                            to="/user/login"
                            className="flex gap-2 px-4 py-3 hover:bg-blue-100 justify-center hover:text-blue-600 rounded-b-lg"
                        >
                            <User />
                            ล็อคอินผู้ใช้
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar
