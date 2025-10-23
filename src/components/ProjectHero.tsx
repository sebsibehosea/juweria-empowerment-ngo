import { motion } from "motion/react";

export function ProjectHero() {
  // Smooth scroll handler
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-emerald-600 to-green-700 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">
          Juweria Women & Youth Empowerment Project
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-emerald-50 mb-8">
          Empowering women and youth across Somali Region through education,
          skills development, and community initiatives.
        </p>

        <div className="flex gap-4 justify-center">
          {/* Roadmap Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleScroll("roadmap")}
            className="bg-white text-emerald-700 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-emerald-50 hover:shadow-xl transition-all duration-300"
          >
            View Roadmap
          </motion.button>

          {/* Contact Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleScroll("contact")}
            className="bg-emerald-800 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-emerald-900 hover:shadow-xl transition-all duration-300"
          >
            Get in Touch
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
