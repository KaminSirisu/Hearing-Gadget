import { Ear, User, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [ openDropDown, setOpenDropDown ] = useState(false);

  return (
    <div className="bg-white py-4">
        <div className="justify-between flex items-center mx-20">
            <div className='flex gap-2'>
                <Ear size={25} className="text-blue-600"/>
                <Link to="/" className="font-bold text-xl">Hearing Gadget</Link>
            </div>
            <div className="flex gap-15 text-sm">
                <Link to="/" className="hover:text-blue-400">หน้าแรก</Link>
                <Link to="/product" className="hover:text-blue-400">รายการสินค้า</Link>
                <Link to="/about" className="hover:text-blue-400">เกี่ยวกับเรา</Link>
                <Link to="/contact" className="hover:text-blue-400">ติดต่อ</Link>
            </div>
            <div className='relative'>
                <button onClick={() => setOpenDropDown(!openDropDown)}>
                    <User className={`${openDropDown && 'text-blue-500 border border-gray-300 rounded-xl p-0.5 shadow-md'}`}/>
                </button>

                {openDropDown && (
                    <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg z-50 text-sm">
                        <Link
                            to="/admin/login"
                            className="px-4 py-3 hover:bg-blue-100 flex gap-2 hover:text-blue-600 justify-center hover:rounded-lg"
                        >
                            
                            <BadgeCheck className=''/>
                            ล็อคอินแอดมิน
                        </Link>

                        <Link
                            to="/user/login"
                            className="flex gap-2 px-4 py-3 hover:bg-blue-100 justify-center hover:text-blue-600 hover:rounded-lg"
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
