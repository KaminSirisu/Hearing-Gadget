import { Phone, Mail, MapPin, Send, Lock, Users, Shield, MapPinned, CalendarCheck } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left: Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <p className="text-blue-600 text-xs font-semibold tracking-widest uppercase mb-3">ติดต่อเรา</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">เราพร้อมช่วยเหลือคุณ</h1>
          <p className="text-gray-500 text-sm mb-8">
            มีคำถามหรือต้องการความช่วยเหลือ? กรอกแบบฟอร์มด้านล่าง แล้วทีมงานของเราจะติดต่อกลับโดยเร็วที่สุด
          </p>

          <form className="space-y-4">
            {/* Name */}
            <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-3">
              <Users size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="ชื่อของคุณ"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-3">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <input
                type="email"
                placeholder="อีเมล"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
            </div>

            {/* Message */}
            <div className="border border-gray-200 rounded-lg px-4 py-3">
              <div className="flex items-start gap-3">
                <Send size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <textarea
                  placeholder="ข้อความของคุณ"
                  rows={5}
                  maxLength={1000}
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent resize-none"
                />
              </div>
              <p className="text-right text-xs text-gray-400 mt-1">0 / 1000</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Send size={16} />
              ส่งข้อความ
            </button>
          </form>

          <p className="flex items-center gap-2 text-xs text-gray-400 mt-5">
            <Lock size={12} />
            ข้อมูลของคุณปลอดภัยกับเรา เราเคารพความเป็นส่วนตัวของคุณ
          </p>
        </div>

        {/* Right: Get in Touch */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ช่องทางการติดต่อ</h2>
          <p className="text-gray-500 text-sm mb-8">ติดต่อเราได้ผ่านช่องทางด้านล่างนี้</p>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <div className="bg-blue-50 rounded-full p-3 shrink-0">
                <Phone size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">โทรศัพท์</p>
                <p className="text-blue-600 font-semibold text-base">0856633099</p>
                <p className="text-xs text-gray-400 mt-0.5">จันทร์ - ศุกร์ 9:00 - 16:30 น.</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <div className="bg-blue-50 rounded-full p-3 shrink-0">
                <Mail size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">อีเมล</p>
                <p className="text-blue-600 font-semibold text-base">charoen239@gmail.com</p>
                <p className="text-xs text-gray-400 mt-0.5">เราตอบกลับภายใน 24 ชั่วโมง</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 rounded-full p-3 shrink-0">
                <MapPin size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">ที่ตั้ง</p>
                <p className="text-blue-600 font-semibold text-base">48/175 ซอยนวมินทร์ 143 ถนนนวมินทร์ แขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพมหานคร</p>
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

        {/* Card overlay
        <div className="absolute top-1/2 left-10 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6 w-64">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-blue-600" />
            <p className="font-bold text-gray-900">Our Location</p>
          </div>
          <p className="text-sm text-gray-700 font-semibold">Hearing Gadget Co., Ltd.</p>
          <p className="text-sm text-gray-500 mt-1">Nawamin, Bueng Kum</p>
          <p className="text-sm text-gray-500">Bangkok 10240, Thailand</p>
          <a
            href="https://maps.app.goo.gl/KBzsTivygPEuY32v9"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
          >
            Get Directions →
          </a>
        </div> */}
      </div>

      {/* Features Strip */}
      <div className="bg-blue-50 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, title: 'ผู้เชี่ยวชาญพร้อมช่วย', desc: 'ทีมผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษา' },
            { icon: Shield, title: 'เชื่อถือได้', desc: 'มากกว่า 10 ปีในวงการเครื่องช่วยฟัง' },
            { icon: MapPinned, title: 'ทีมงานในท้องถิ่น', desc: 'ดูแลชุมชนไทยด้วยความภาคภูมิใจ' },
            { icon: CalendarCheck, title: 'นัดหมายยืดหยุ่น', desc: 'เลือกเวลาที่สะดวกสำหรับคุณได้เลย' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2.5 shrink-0">
                <Icon size={18} className="text-blue-600" />
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
