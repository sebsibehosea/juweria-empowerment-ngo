import { motion } from "motion/react";

export function InteractiveRoadmap() {
  const roadmapPhases = [
    { icon: "📍", title: "Phase 1", text: "Community Assessment & Baseline Study" },
    { icon: "🚀", title: "Phase 2", text: "Skills Development & Training Programs" },
    { icon: "🌱", title: "Phase 3", text: "Women Entrepreneurship & Micro-Finance Support" },
    { icon: "🤝", title: "Phase 4", text: "Youth Empowerment & Networking" },
    { icon: "🏁", title: "Phase 5", text: "Monitoring, Evaluation, and Expansion" },
  ];

  return (
    <section
      id="roadmap"
      className="py-20 px-6 bg-gradient-to-b from-green-50 to-emerald-50 scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-emerald-800 mb-8">
          Our Project Roadmap
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Follow our timeline from planning to execution as we empower
          communities step by step.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <ul className="space-y-6 text-left">
            {roadmapPhases.map((phase, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-start gap-3 bg-emerald-50 p-4 rounded-xl hover:bg-emerald-100 cursor-pointer transition-all"
              >
                <span className="text-2xl">{phase.icon}</span>
                <span>
                  <strong className="text-emerald-800">{phase.title}:</strong>{" "}
                  {phase.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
