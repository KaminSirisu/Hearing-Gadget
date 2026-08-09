import VerticalLine from './VerticalLine.jsx';
import line from "../assets/line.png";
import gmail from "../assets/gmail.png";
import phoneCall from "../assets/phone-call.png";

const Footer = () => {
  return (
    <div className="border border-t-neutral-200">
        <div className='flex flex-col items-center gap-5 bg-white py-10'>
            <div className='flex flex-row gap-10 text-[#283d6c] text-sm'>
                <div className='flex flex-col gap-1'>
                    <p className='font-bold'>Hearing Gadget</p>
                    <p>ศูนย์จัดจำหน่ายและซ่อมเครื่องช่วยฟังแบรนด์ <br/> Signia, Akera, Siemens, Rextonฯ</p>
                </div>
                <VerticalLine className="h-28" />
                <div className='flex flex-col gap-1'>
                    <p className='font-bold'>ติดต่อ</p>
                    <p className='flex'>
                        <img className="w-5 h-5" src={phoneCall} alt="phone" />
                        &nbsp;0856633099
                    </p>
                    <p className='flex'>
                        <img className="w-5 h-5" src={line} alt="line" />
                        &nbsp;@kaew3699
                    </p>
                    <p className='flex'>
                        <img className="w-5 h-5" src={gmail} alt="gmail" />
                        &nbsp;charoen239@gmail.com
                    </p>
                </div>
                <VerticalLine className="h-28" />
                <div className='flex flex-col gap-1'>
                    <p className='font-bold'>ที่อยู่</p>
                    <p>เลขที่ 48/175 ซอยนวมินทร์ 143 ถนนนวมินทร์ <br/> แขวงนวลจันทร์ <br/> เขตบึงกุ่ม <br/> กรุงเทพมหานคร 10230</p>
                </div>
                <VerticalLine className="h-28" />
                <div className='flex flex-col gap-1'>
                    <p className='font-bold'>เวลาทำการ</p>
                    <p>จันทร์-เสาร์ 9:00-16:30 น.</p>
                </div>
            </div>
           
            
        </div>
        <div className='bg-[#283d6c] py-5 text-center'>
            <h1 className='text-white text-xs'>Copyright © 2026 Hearing Gadget. All rights reserved.</h1>
        </div>
    </div>
    
  )
}

export default Footer
