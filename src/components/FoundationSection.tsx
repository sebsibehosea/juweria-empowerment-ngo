import { motion } from "framer-motion";

const data = [
  {
    title: "Vision",
    text: "A world where women and youth are empowered and self-sufficient.",
    image: "https://source.unsplash.com/400x300/?vision,success",
  },
  {
    title: "Mission",
    text: "To provide opportunities, resources, and mentorship for growth.",
    image: "https://source.unsplash.com/400x300/?teamwork,community",
  },
  {
    title: "Values",
    text: "Empowerment • Inclusivity • Integrity • Innovation • Sustainability",
    image: "https://source.unsplash.com/400x300/?nature,growth",
  },
];

export default function FoundationSection() {
  return (
    <section id="foundation" className="py-20 px-8 bg-green-100 text-center">
      <motion.h2
        className="text-3xl font-bold text-green-800 mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Foundation
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data.map((item, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                {item.title}
              </h3>
              <p className="text-green-600">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
