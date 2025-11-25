import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is Juweria?",
    a: "Juweria is a community-driven platform supporting women and underserved groups through education, hygiene, and empowerment initiatives."
  },
  {
    q: "Who can register?",
    a: "Anyone—beneficiaries, volunteers, donors, and organizers—can join Juweria and participate based on their role."
  },
  {
    q: "How do I volunteer or join activities?",
    a: "Simply register an account, then visit the Activities or Volunteer sections to see opportunities."
  },
  {
    q: "How do I donate?",
    a: "Head to the Donate page, choose your amount, and follow the instructions for secure, simple giving."
  },
  {
    q: "What data is required to sign up?",
    a: "Basic info (name, email, password) is needed to create your account. Conservative privacy and security policies are in place."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number|null>(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-200 flex justify-center items-start py-10">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-emerald-700 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="divide-y">
          {faqs.map((fq, idx) => (
            <motion.div key={fq.q} layout>
              <button
                className="w-full text-left py-4 px-2 flex items-center gap-3 font-semibold text-emerald-800 focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
              >
                <span>{fq.q}</span>
                <span className={`ml-auto transition-transform text-2xl ${openIdx === idx ? 'rotate-45' : 'rotate-0'}`}>+</span>
              </button>
              <motion.div
                initial={false}
                animate={openIdx === idx ? { height: "auto", opacity: 1, marginBottom: 20 } : { height: 0, opacity: 0, marginBottom: 0 }}
                style={{ overflow: "hidden" }}
                transition={{ duration: 0.36 }}
              >
                {openIdx === idx && (
                  <div className="py-2 px-2 text-gray-700 text-sm">{fq.a}</div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
