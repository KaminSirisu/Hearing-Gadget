import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import HorizontalLine from '../components/HorizontalLine.jsx';
import VerticalLine from '../components/VerticalLine.jsx';
import { 
  heroBanner, 
  signia, 
  shopee, 
  lazada, 
  line, 
  phoneCall,
  ear,
  lightBulb,
  feather,
  insurance
} from '../image.js';


const CheckIcon = () => (
  <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const WarnIcon = () => (
  <svg className="w-6 h-6 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.538-1.333-3.308 0L3.732 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const products = [
  {
    name: 'Signia Fast',
    tag: 'เหมาะสำหรับผู้เริ่มต้นใช้งาน',
    desc: 'เครื่องช่วยฟังดิจิตอลคุณภาพสูง',
    features: [
      'เสียงพูดชัดเจนในทุกสถานการณ์',
      'ปรับเสียงอัตโนมัติตามสภาพแวดล้อม',
      'เชื่อมต่ออุปกรณ์ได้ง่าย',
      'แบตเตอรี่ใช้งานได้นาน',
    ],
  },
  {
    name: 'Signia Fun',
    tag: 'เหมาะสำหรับการใช้งานในชีวิตประจำวัน',
    desc: 'เครื่องช่วยฟังดิจิตอลคุณภาพสูง',
    features: [
      'ดีไซน์สวยงาม สวมใส่สบาย',
      'เสียงเป็นธรรมชาติ',
      'ลดเสียงรบกวนรอบข้าง',
      'ใช้งานง่ายด้วยปุ่มควบคุม',
    ],
  },
  {
    name: 'Signia Run',
    tag: 'เหมาะสำหรับผู้ที่ใช้ชีวิตแอคทีฟ',
    desc: 'เครื่องช่วยฟังดิจิตอลคุณภาพสูง',
    features: [
      'ประสิทธิภาพสูงในทุกสภาพแวดล้อม',
      'รองรับกิจกรรมที่หลากหลาย',
      'กันน้ำ กันเหงื่อและความชื้น',
      'เชื่อมต่อสายได้โดยตรง',
    ],
  },
];

const features = [
  { icon: <img src={ear} alt="Ear" className='w-10 h-10'/>, label: 'ได้ยินชัดเจนยิ่งขึ้น' },
  { icon: <img src={lightBulb} alt="Light Bulb" className='w-10 h-10' />, label: 'เทคโนโลยีทันสมัย' },
  { icon: <img src={feather} alt="Feather" className='w-10 h-10' />, label: 'สวมใส่สบาย น้ำหนักเบา' },
  { icon: <img src={insurance} alt="Warranty" className='w-10 h-10' />, label: 'รับประกันคุณภาพ' },
];

const problems = [
  'ขยายเสียงเท่าๆ กันในทุกความถี่ ปรับเกนรายความถี่ไม่ได้',
  'มีเสียงรบกวนมากซึ่งอาจเป็นอันตรายต่อการได้ยิน',
  'ทำให้ผู้ป่วยบางรายไม่อยากใช้เครื่องช่วยฟังอีกเลย',
  'ส่งผลให้ขาดโอกาสใช้ชีวิตปกติ อาจนำไปสู่ภาวะซึมเศร้า',
];

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Banner */}
      <section>
        <div className="relative w-full">
          <img src={heroBanner} alt="Hero section" className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center text-center right-180 flex-col gap-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#283d6c] leading-tight">
              การหาซื้อเครื่องช่วยฟังดีๆ สักเครื่อง <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                จะไม่ใช่เรื่องยุ่งยากอีกต่อไป
              </span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              พบกับเครื่องช่วยฟังแบรนด์ <strong className="text-slate-800">Signia</strong> นวัตกรรมระดับโลกที่ให้คุณเลือกปรับเกนขยายและความดังที่เหมาะสมได้ด้วยตนเองผ่านระบบอัจฉริยะ แม่นยำ และปลอดภัย
            </p>
          </div>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-2">
                {f.icon}
                <p className="text-sm font-medium text-[#283d6c]">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HorizontalLine className="bg-gray-100" />

      {/* FDA + Brand Badge */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            <div className="flex items-center gap-4">
              <p className="text-md text-gray-500 font-medium">ตัวแทนจำหน่ายอย่างเป็นทางการ</p>
              <img src={signia} alt="Signia" className='w-20 h-20'/>
            </div>
          </div>
        </div>
      </section>
      <HorizontalLine className="bg-gray-100" />

      {/* Problem Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">ปัญหาที่พบบ่อย</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">เครื่องช่วยฟังทั่วไปในตลาดออนไลน์</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">สินค้าส่วนใหญ่ที่ขายตาม Website เป็นเพียงเครื่องขยายเสียงในรูปแบบเครื่องช่วยฟัง ซึ่งมีปัญหาสำคัญที่อาจเป็นอันตราย</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {problems.map((p) => (
              <div key={p} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-red-100">
                <WarnIcon />
                <p className="text-gray-700 text-sm leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signia Solution */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">นวัตกรรมจาก Signia</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#283d6c]">ทางออกที่แท้จริงสำหรับผู้มีปัญหาการได้ยิน</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Siemens/Signia ผู้มีประสบการณ์การผลิตเครื่องช่วยฟังกว่า 100 ปี ได้พัฒนาเทคโนโลยีที่ให้ผู้ใช้สามารถปรับเกนการขยายที่เหมาะสมได้ด้วยตนเอง
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-[#283d6c] mb-2">ปรับเกนรายความถี่ได้</h3>
              <p className="text-gray-600 text-sm">กำหนดเกนการขยายแต่ละช่วงความถี่จากผล Audiogram ของผู้ป่วยส่วนใหญ่ให้พอดีกับระดับการสูญเสียการได้ยิน</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-bold text-[#283d6c] mb-2">เลือกความดังได้ด้วยตนเอง</h3>
              <p className="text-gray-600 text-sm">ครั้งแรกในโลกที่ผู้ใช้เลือกเกนขยายและความดังที่เหมาะสมได้เอง ลดความจำเป็นต้องปรับที่ศูนย์บริการทุกครั้ง</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-[#283d6c] mb-2">ผ่านการรับรอง อย.</h3>
              <p className="text-gray-600 text-sm">ได้รับการรับรองจากสำนักงานคณะกรรมการอาหารและยา กระทรวงสาธารณสุข สำหรับการนำเข้าเครื่องมือแพทย์</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">สินค้าของเรา</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#283d6c]">เครื่องช่วยฟังคุณภาพสูงจาก Signia</h2>
            <p className="text-gray-500 mt-2">ครอบคลุมทุกระดับหูตึง เลือกรุ่นที่เหมาะกับไลฟ์สไตล์ของคุณ</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                <div className="bg-[#283d6c] px-5 py-4">
                  <h3 className="text-white font-bold text-lg">{p.name}</h3>
                  <p className="text-blue-200 text-xs mt-0.5">{p.desc}</p>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <ul className="space-y-2 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <HorizontalLine className="mb-4 bg-gray-100" />
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
            <CheckIcon />
            รับประกันเครื่องช่วยฟัง 1 ปี พร้อมบริการหลังการขายมาตรฐาน
          </p>
        </div>
      </section>

      {/* Buy CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#283d6c] mb-2">สั่งซื้อสินค้ากับเราได้ที่</h2>
          <p className="text-gray-500 mb-8 text-sm">ช้อปปิ้งออนไลน์สะดวก ปลอดภัย มั่นใจได้</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://shopee.co.th/charoensi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-md"
            >
              <img src={shopee} alt="Shopee" className='w-10 h-10'/> ซื้อที่ Shopee
            </a>
            <a
              href="https://www.lazada.co.th/shop/hearing-gadget"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#283d6c] hover:bg-[#1e2e52] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-md"
            >
              <img src={lazada} alt="Lazada" className='w-10 h-10 rounded-xl'/> ซื้อที่ Lazada
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">บริการของเรา</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#283d6c]">เราพร้อมดูแลคุณทุกขั้นตอน</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5">
              <div className="text-4xl shrink-0">🔧</div>
              <div>
                <h3 className="font-bold text-[#283d6c] text-lg mb-2">บริการซ่อมเครื่องช่วยฟัง</h3>
                <p className="text-gray-500 text-sm mb-4">บริการตรวจเช็ค ทำความสะอาด ซ่อมแซม โดยผู้เชี่ยวชาญ อะไหล่แท้ มาตรฐานศูนย์บริการ</p>
                <ul className="space-y-1.5">
                  {['ตรวจเช็คและประเมินอาการฟรี', 'ซ่อมด่วน รวดเร็ว', 'รับประกันงานซ่อม'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5">
              <div className="text-4xl shrink-0">💬</div>
              <div>
                <h3 className="font-bold text-[#283d6c] text-lg mb-2">ปรึกษาผู้เชี่ยวชาญ</h3>
                <p className="text-gray-500 text-sm mb-4">ทีมผู้เชี่ยวชาญด้านการได้ยิน พร้อมให้คำแนะนำและประเมินการได้ยินอย่างมืออาชีพ</p>
                <ul className="space-y-1.5">
                  {['ประเมินการได้ยินเบื้องต้น', 'แนะนำเครื่องช่วยฟังที่เหมาะสม', 'บริการด้วยความใส่ใจ'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Signia / Brand Note */}
      <section className="py-14 bg-[#283d6c]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">เกี่ยวกับแบรนด์ Signia</h2>
          <p className="text-blue-200 leading-relaxed text-sm sm:text-base">
            สินค้าเครื่องช่วยฟังในแบรนด์ <strong className="text-white">SIEMENS</strong> ที่มีมานานกว่า 100 ปี และมีจำหน่ายกว่า 120 ประเทศทั่วโลก ได้เปลี่ยนชื่อใหม่เป็นแบรนด์ <strong className="text-white">Signia</strong> พร้อมกับแบรนด์ในเครือ AudioService, Rexton, A&amp;M, Audibene, HearUSA และ TruHearing ปัจจุบันได้ควบรวมกิจการกับเครื่องช่วยฟังแบรนด์ <strong className="text-white">WIDEX</strong> ส่งผลให้เป็น<strong className="text-white">บริษัทผลิตเครื่องช่วยฟังอันดับ 1 ใน 3 ของโลก</strong>
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[#283d6c] mb-2">ไม่แน่ใจ? ปรึกษาเราก่อนได้เลย</h2>
          <p className="text-gray-500 text-sm mb-6">
            หากท่านไม่แน่ใจในการสั่งซื้อ สอบถามข้อมูลก่อนได้ที่ <strong className="text-[#283d6c]">0856633099</strong> ได้ทุกเวลา<br />
            ร้านเปิดทำการ <strong>จันทร์–เสาร์ เวลา 9:00-16:30 น.</strong> โทรมานัดหมายก่อนจะได้รับความสะดวก
          </p>
          <p className="text-xs text-gray-400 italic">
            "การใส่เครื่องช่วยฟัง ควรได้รับการแนะนำจากแพทย์หรือนักโสตสัมผัสวิทยา(audiologist)"
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:0856633099"
              className="inline-flex items-center justify-center gap-2 bg-[#283d6c] hover:bg-[#1e2e52] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <img src={phoneCall} alt="Phone" className='w-7 h-7 bg-white rounded-4xl'/> โทร 0856633099
            </a>
            <a
              href="https://line.me/ti/p/~@kaew3699"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <img src={line} alt="Line" className='w-7 h-7'/> Line: @kaew3699
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
