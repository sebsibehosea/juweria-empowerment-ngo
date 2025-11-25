import { motion } from "framer-motion";

const programs = [
  {
    title: "Basic Literacy & Numeracy",
    text: "Community-based education for those with limited formal schooling.",
    image: "https://source.unsplash.com/400x300/?education,classroom",
  },
  {
    title: "Vocational Training",
    text: "Courses in tailoring, agriculture, and technology.",
    image: "https://source.unsplash.com/400x300/?workshop,skills",
  },
  {
    title: "Digital Empowerment",
    text: "IT and digital literacy programs for youth and women.",
    image: "https://source.unsplash.com/400x300/?computer,women",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-green-50 px-8 text-center">
      <motion.h2
        className="text-3xl font-bold text-green-800 mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Education & Skill Development
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {programs.map((item, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
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
