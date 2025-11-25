// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";
import VisionMissionValues from "../components/VisionMissionValues";
import { InteractiveRoadmap } from "../components/InteractiveRoadmap";
import ImpactGallery from "../components/ImpactGallery";
import logo from "../assets/logo.png";

const stats = [
  { label: "Beneficiaries reached", value: 5000, icon: "🌍" },
  { label: "Hygiene kits delivered", value: 2700, icon: "🧴" },
  { label: "Learning centers", value: 7, icon: "🏫" },
  { label: "Empowerment events", value: 24, icon: "🚀" },
];
const pillars = [
  { id: 'education', icon: '🎓', label: 'Education', color: 'emerald', details: 'Building opportunities through literacy, digital skills, and mentorship for youth and women.' },
  { id: 'hygiene', icon: '🧼', label: 'Hygiene', color: 'blue', details: 'Delivering essential hygiene supplies and education to foster health, dignity and confidence.' },
  { id: 'empowerment', icon: '💪', label: 'Empowerment', color: 'pink', details: 'Enabling communities through microfinance, support groups and leadership training.' },
];
const helpTiles = [
  { icon: "🤝", head: "Volunteer", desc: "Join our passionate team on the ground and online.", cta: "Sign up", url: "/auth/register", color: "from-green-200 to-green-100" },
  { icon: "💝", head: "Donate", desc: "One-time or monthly gifts change lives directly.", cta: "Give now", url: "/donate", color: "from-emerald-200 to-emerald-100" },
  { icon: "📣", head: "Share", desc: "Spread the word on social and inspire others.", cta: "Share", url: "#share", color: "from-pink-200 to-rose-100" }
];
const testimonials = [
  { quote: "This program inspired my daughter to dream bigger.", speaker: "Fatima, Beneficiary", emoji: "👩" },
  { quote: "Juweria helped our whole community — I'm so thankful.", speaker: "Ahmed, Volunteer", emoji: "🧔" },
  { quote: "Volunteering brought me closer to friends and new skills.", speaker: "Layla, Youth Leader", emoji: "🎓" }
];

export default function Home() {
  const [openPillar, setOpenPillar] = useState<string | null>(null);
  const [testiIndex, setTestiIndex] = useState(0);
  // Hero, bg blobs
  const heroImgVariants = {
    animate: {
      y: [0, -14, 0, 12, 0],
      rotate: [0, 2.5, 0, -2.5, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const }
    }
  } satisfies Variants;
  const bg1 = {
    animate: { y: [0, -20, 0, 25, 0], x: [0, 10, -16, 0], transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const } }
  } satisfies Variants;
  const bg2 = {
    animate: { y: [0, 14, 0, -22, 0], x: [0, -14, 24, 0], transition: { duration: 12, repeat: Infinity, ease: "easeInOut" as const } }
  } satisfies Variants;
  useEffect(() => {
    const t = setInterval(() => setTestiIndex(i => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <section className="relative bg-gradient-to-br from-emerald-100 via-white to-green-100 overflow-hidden pb-24 pt-12">
        <motion.div className="absolute right-0 top-0 w-72 h-[480px] bg-emerald-200 rounded-full mix-blend-multiply opacity-50 blur-[80px] -z-10" variants={bg1} animate="animate" />
        <motion.div className="absolute left-0 bottom-0 w-72 h-[300px] bg-pink-200 rounded-full mix-blend-multiply opacity-30 blur-[90px] -z-10" variants={bg2} animate="animate" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="Juweria" className="w-12 h-12 rounded-full shadow object-cover" />
              <span className="text-xl font-extrabold text-emerald-800 tracking-tight">Juweria</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 leading-tight mb-3">
              Uplifting Women & Communities<br className="hidden md:inline" /> in remote regions
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-2 mb-8 text-gray-600 max-w-xl text-lg">
              Delivering education, hygiene, and opportunity—with modern support for beneficiaries, volunteers & donors.
            </motion.p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/activities" className="cta-btn px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-lg text-base font-semibold transition-all focus:ring-2 focus:ring-emerald-400 outline-none">Our Activities</Link>
              <Link to="/donate" className="cta-btn px-6 py-3 border border-emerald-600 text-emerald-700 rounded-lg shadow hover:bg-emerald-50 transition font-semibold focus:ring-2 focus:ring-emerald-300 outline-none">Donate</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.13, duration: 0.5 }}
                  className="bg-white/80 rounded-xl shadow p-4 flex flex-col items-center border-b-4 border-emerald-200">
                  <span className="text-3xl mb-1">{s.icon}</span>
                  <span className="text-2xl font-bold text-emerald-800">
                    {s.value.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-700 text-center mt-1">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={heroImgVariants} animate="animate" className="flex-1 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=500&q=80" alt="Empowerment illustration" className="rounded-2xl shadow-xl w-full max-w-sm border-4 border-white" />
          </motion.div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-10 bg-green-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-3">
          {pillars.map((p) => (
            <motion.div
              key={p.id}
              layout
              className={`rounded-2xl shadow-lg border group bg-white transition-all cursor-pointer flex flex-col items-center text-center ${{ education: 'hover:border-emerald-300', hygiene: 'hover:border-blue-300', empowerment: 'hover:border-pink-300' }[p.id]}`}
              style={{ minHeight: openPillar === p.id ? 190 : 110, padding: openPillar === p.id ? '1.7rem 1.4rem' : '1rem 1rem' }}
              onMouseEnter={() => setOpenPillar(p.id)}
              onMouseLeave={() => setOpenPillar(null)}
              onClick={() => setOpenPillar(openPillar === p.id ? null : p.id)}
              tabIndex={0}
              aria-expanded={openPillar === p.id}
            >
              <span className="text-2xl md:text-3xl mb-1">{p.icon}</span>
              <span className="font-bold text-base md:text-lg text-emerald-800 mb-1">{p.label}</span>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={openPillar === p.id ? { height: 'auto', opacity: 1, marginTop: 8 } : { height: 0, opacity: 0, marginTop: 0 }}
                style={{ overflow: 'hidden' }}
                transition={{ duration: 0.38 }}
                className="w-full"
              >
                {openPillar === p.id && (
                  <div className="text-gray-600 text-sm px-1">{p.details}</div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 px-4">
          {helpTiles.map((tile) => (
            <div key={tile.cta} className={`rounded-2xl p-6 bg-gradient-to-br ${tile.color} shadow flex flex-col items-center text-center`}>
              <span className="text-3xl mb-2">{tile.icon}</span>
              <div className="font-bold mb-1 text-lg">{tile.head}</div>
              <div className="mb-2 text-gray-700 text-sm">{tile.desc}</div>
              <Link to={tile.url} className="bg-emerald-700 text-white rounded-lg px-4 py-2 text-sm hover:bg-emerald-900 transition">{tile.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-emerald-50">
        <div className="max-w-3xl mx-auto flex items-center gap-6 px-4 justify-center ">
          <span className="text-4xl">{testimonials[testiIndex].emoji}</span>
          <motion.div key={testimonials[testiIndex].quote} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="flex-1">
            <div className="text-xl font-semibold text-emerald-700 mb-1">“{testimonials[testiIndex].quote}”</div>
            <div className="text-right text-sm text-emerald-800 italic font-bold">— {testimonials[testiIndex].speaker}</div>
          </motion.div>
        </div>
      </section>

      <VisionMissionValues />
      <InteractiveRoadmap />
      <ImpactGallery />
      <style>{`
        .cta-btn {
          box-shadow: 0 2px 10px 0 rgba(42,178,114,0.08), 0 1.5px 5px 0 rgba(16,93,49,0.05);
        }
        .cta-btn:hover,
        .cta-btn:focus {
          transform: scale(1.065);
          box-shadow: 0 4px 24px 0 rgba(42,178,102,0.20), 0 1.5px 7px 0 rgba(16,93,49,0.08);
          border-color: #059669;
          background-color: #059669;
          color: #fff;
        }
        .cta-btn:active {
          transform: scale(.98);
        }
      `}</style>
    </>
  );
}
