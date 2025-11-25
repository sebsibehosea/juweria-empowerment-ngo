import { motion } from 'framer-motion';

const cards = [
  {
    title: 'Learning in Remote Villages',
    text: 'After-school literacy and numeracy circles for girls.',
    emoji: '📚',
    bg: 'from-emerald-50 to-green-50',
  },
  {
    title: 'Hygiene & Wellbeing',
    text: 'Dignity kits and health workshops for young women.',
    emoji: '🧼',
    bg: 'from-teal-50 to-cyan-50',
  },
  {
    title: 'Mothers in Microenterprise',
    text: 'Seed capital and mentorship for women-led businesses.',
    emoji: '🧺',
    bg: 'from-lime-50 to-emerald-50',
  },
];

export default function ImpactGallery() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-emerald-800 text-center mb-8"
        >
          Empowerment in Motion
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl shadow-lg p-6 bg-gradient-to-br ${c.bg} overflow-hidden`}
            >
              <div className="text-4xl mb-3">{c.emoji}</div>
              <h3 className="text-xl font-semibold text-emerald-800">{c.title}</h3>
              <p className="text-gray-700 mt-2">{c.text}</p>
              <motion.div
                aria-hidden
                className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-emerald-200/30 blur-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


