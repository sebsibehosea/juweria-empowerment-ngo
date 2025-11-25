// src/pages/Dashboard.tsx
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 className="text-3xl text-emerald-800 mb-6" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}>
          Admin Dashboard
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="text-sm text-gray-500">Total Donations</div>
            <div className="text-2xl font-semibold text-emerald-800 mt-2">$123,456</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="text-sm text-gray-500">Active Campaigns</div>
            <div className="text-2xl font-semibold text-emerald-800 mt-2">3</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="text-sm text-gray-500">Pending Distributions</div>
            <div className="text-2xl font-semibold text-emerald-800 mt-2">12</div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-600">Redash / charts placeholder — we will embed live dashboards later.</p>
        </div>
      </div>
    </section>
  );
}
