import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";
// Update the path based on where your logo actually is.
// Example assumes logo is in src/assets/logo.png
import organizationLogo from "@/assets/logo.png";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 px-6 bg-white border-t border-gray-100 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.img
          src={organizationLogo}
          alt="Organization Logo"
          className="mx-auto w-32 h-32 mb-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />

        <motion.h2
          className="text-4xl font-bold text-emerald-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
         Get in Touch
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          We’d love to hear from you! Reach out with any questions, suggestions, or partnership inquiries.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="jadonsmith@gmail.com"
            className="flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-emerald-800 hover:shadow-xl transition-all duration-300"
          >
            <Mail className="w-5 h-5" /> Email Us
          </a>

          <a
            href="tel:+251937183256"
            className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-6 py-3 rounded-lg shadow-md hover:bg-emerald-100 hover:shadow-xl transition-all duration-300"
          >
            <Phone className="w-5 h-5" /> Call Us
          </a>

          <a
            href="https://goo.gl/maps/yourlocation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-emerald-700 border border-emerald-300 px-6 py-3 rounded-lg shadow-md hover:bg-emerald-50 hover:shadow-xl transition-all duration-300"
          >
            <MapPin className="w-5 h-5" /> Visit Us
          </a>
        </div>
      </div>
    </section>
  );
}
