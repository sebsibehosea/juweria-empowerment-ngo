import { motion } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
import { DollarSign } from "lucide-react";

const budgetData = [
  { name: "Education & Skill Development", value: 25000, color: "#059669" },
  { name: "Vocational Training Materials", value: 20000, color: "#10b981" },
  { name: "Microfinance & Entrepreneurship", value: 15000, color: "#34d399" },
  { name: "Leadership & Advocacy", value: 10000, color: "#6ee7b7" },
  { name: "Youth & Women Development", value: 8000, color: "#14b8a6" },
  { name: "Monitoring & Evaluation", value: 7000, color: "#2dd4bf" },
  { name: "Administrative Costs", value: 10000, color: "#5eead4" },
  { name: "Needs Assessment", value: 5000, color: "#99f6e4" },
];

const totalBudget = budgetData.reduce((sum, item) => sum + item.value, 0);

export default function BudgetOverview() {
  return (
    <section
      id="budget"
      className="py-20 px-6 bg-gradient-to-br from-gray-50 to-emerald-50 scroll-mt-20"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-bold text-emerald-800 mb-2">
          Budget Overview
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transparent allocation of resources for maximum impact.
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
        {/* Budget Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-600">Total Project Budget</p>
              <p className="text-2xl text-emerald-800 font-semibold">
                ${totalBudget.toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            3-Year Investment Period (2025–2028)
          </p>

          {/* Progress Bars */}
          <div className="space-y-3">
            {budgetData.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm md:text-base">
                      {item.name}
                    </span>
                    <span className="text-emerald-800 font-medium text-sm md:text-base">
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.value / totalBudget) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pie Chart Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={(props: PieLabelRenderProps) => {
                    const pct = Number(props.percent ?? 0);
                    return `${(pct * 100).toFixed(0)}%`;
                  }}
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This is an estimated budget and may be
              adjusted based on actual project needs and available funding. We
              maintain full transparency with all stakeholders regarding fund
              allocation and usage.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
