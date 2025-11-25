// src/pages/Donate.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import axiosClient from "../api/axiosClient";

export default function Donate() {
  const [amount, setAmount] = useState<number | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleDonate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const numericAmount = Number(amount);
      if (!numericAmount || numericAmount <= 0) {
        alert("Please enter a valid amount greater than 0.");
        return;
      }
      await axiosClient.post("/donations/pledge", { donor_name: name, email: email || null, amount: numericAmount });
      alert(`Thank you, ${name || "donor"}! You pledged $${numericAmount}`);
      setAmount("");
      setName("");
      setEmail("");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Could not record your pledge. Please try again.";
      alert(`❌ ${msg}`);
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-3xl text-emerald-800 font-bold">Support Our Work</h2>
          <p className="text-gray-600 mt-2">Your contribution helps us reach more women and youth with education and supplies.</p>
        </motion.div>

        <form onSubmit={handleDonate} className="bg-white rounded-2xl p-6 shadow">
          <label className="block text-sm text-gray-700">Full name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full p-3 rounded-lg border mt-2 mb-4" placeholder="Your name" required />

          <label className="block text-sm text-gray-700">Email (optional)</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full p-3 rounded-lg border mt-2 mb-4" placeholder="you@example.com" />

          <label className="block text-sm text-gray-700">Amount (USD)</label>
          <input value={amount} onChange={e => setAmount(Number(e.target.value) || "")} type="number" className="w-full p-3 rounded-lg border mt-2 mb-4" placeholder="50" required />

          <div className="mt-4 flex justify-end">
            <Button type="submit">Donate Now</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
