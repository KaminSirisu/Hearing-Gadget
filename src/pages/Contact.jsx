import { Phone, Mail, MapPin, Send, Lock, Users, Shield, MapPinned, CalendarCheck, BookOpenText, LoaderCircle } from 'lucide-react';
import { useFetcher, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useRef, useEffect } from 'react';
import { sendContactMessage } from '../services/emailService.js';

const Contact = () => {
  const formRef = useRef(null);
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === "idle") {
      formRef.current.reset();
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <div className="min-h-screen">
      <p className="px-20 py-8">
        <Link to="/" className="text-neutral-500">
          Home&nbsp;{'>'}
        </Link> <span className="font-medium">Contact</span>
      </p>
      {/* Hero Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        

        {/* Left: Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-neutral-50">
          <p className="text-[#283d6c] text-xs font-semibold tracking-widest uppercase mb-3">ติดต่อเรา</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">เราพร้อมช่วยเหลือคุณ</h1>
          <p className="text-gray-500 text-sm mb-8">
            มีคำถามหรือต้องการความช่วยเหลือ? กรอกแบบฟอร์มด้านล่าง แล้วทีมงานของเราจะติดต่อกลับโดยเร็วที่สุด
          </p>

          <fetcher.Form method="POST" ref={formRef} className="space-y-4">
            {/* Title */}
            <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-3">
              <BookOpenText size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                name="title"
                placeholder="ชื่อหัวข้อ"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                required
              />
            </div>

            {/* Name */}
            <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-3">
              <Users size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                name="name"
                placeholder="ชื่อของคุณ"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-3">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <input
                type="email"
                name="email"
                placeholder="อีเมล"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                required
              />
            </div>

            {/* Message */}
            <div className="border border-gray-200 rounded-lg px-4 py-3">
              <div className="flex items-start gap-3">
                <Send size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <textarea
                  placeholder="ข้อความของคุณ"
                  name="message"
                  rows={5}
                  maxLength={1000}
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent resize-none"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full bg-[#283d6c] hover:bg-[#1a2a5a] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle size={16} className="animate-spin" />
              ):(
                <>
                  <Send size={16} />
                  ส่งข้อความ
                </>
              )}
              
            </button>
          </fetcher.Form>

          <p className="flex items-center gap-2 text-xs text-gray-400 mt-5">
            <Lock size={12} />
            ข้อมูลของคุณปลอดภัยกับเรา เราเคารพความเป็นส่วนตัวของคุณ
          </p>
        </div>

        {/* Right: Get in Touch */}
        <div className="bg-white shadow-sm rounded-2xl p-8 border border-neutral-50 h-120">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ช่องทางการติดต่อ</h2>
          <p className="text-gray-500 text-sm mb-8">ติดต่อเราได้ผ่านช่องทางด้านล่างนี้</p>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <div className="bg-[#283d6c] rounded-full p-3 shrink-0">
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">โทรศัพท์</p>
                <p className=" font-semibold text-base">0856633099</p>
                <p className="text-xs text-gray-400 mt-0.5">จันทร์ - ศุกร์ 9:00 - 16:30 น.</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <div className="bg-[#283d6c] rounded-full p-3 shrink-0">
                <Mail size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">อีเมล</p>
                <p className="font-semibold text-base">charoen239@gmail.com</p>
                <p className="text-xs text-gray-400 mt-0.5">เราตอบกลับภายใน 24 ชั่วโมง</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="bg-[#283d6c] rounded-full p-3 shrink-0">
                <MapPin size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">ที่ตั้ง</p>
                <p className="font-semibold text-base">48/175 ซอยนวมินทร์ 143 ถนนนวมินทร์ แขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพมหานคร</p>
                <p className="text-xs text-gray-400 mt-0.5">เข้าเยี่ยมชมได้โดยนัดหมายล่วงหน้า</p>
              </div>
            </div>
          </div>

          {/* Social */}
          {/* <div className="mt-10">
            <p className="text-sm font-semibold text-gray-700 mb-4">ติดตามเรา</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-blue-400 hover:text-blue-600 text-gray-500 transition-colors"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-96 bg-gray-200 overflow-hidden">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7748.530014365462!2d100.6527254!3d13.8231192!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d62f9dbfd3631%3A0x482c5f0c447e3fa4!2sHearing%20Gadget!5e0!3m2!1sen!2sth!4v1781896354991!5m2!1sen!2sth"
          className="w-full h-full"
          style={{ border: 0, filter: 'grayscale(20%)' }}
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Features Strip */}
      <div className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, title: 'ผู้เชี่ยวชาญพร้อมช่วย', desc: 'ทีมผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษา' },
            { icon: Shield, title: 'เชื่อถือได้', desc: 'มากกว่า 10 ปีในวงการเครื่องช่วยฟัง' },
            { icon: MapPinned, title: 'ทีมงานในท้องถิ่น', desc: 'ดูแลชุมชนไทยด้วยความภาคภูมิใจ' },
            { icon: CalendarCheck, title: 'นัดหมายยืดหยุ่น', desc: 'เลือกเวลาที่สะดวกสำหรับคุณได้เลย' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="bg-[#283d6c] rounded-full p-2.5 shrink-0">
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

export async function actionContact({ request }) {
  const formData = await request.formData();
  const { title, name, email, message } = Object.fromEntries(formData);

  try {
    await sendContactMessage({ title, name, email, message });
    toast.success("ส่งข้อความสำเร็จ! ทางเราจะติดต่อกลับโดยเร็วที่สุด");
  } catch (error) {
    console.error("Message failed to send:", error);
    toast.error("เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองอีกครั้ง");
    return { success: false }; 
  }

  return { success: true };
}
