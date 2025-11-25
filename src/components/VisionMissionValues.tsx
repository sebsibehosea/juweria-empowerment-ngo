import { motion } from 'motion/react';
import { Eye, Target, Heart, Flag } from 'lucide-react';

export default function VisionMissionValues() {
  return (
    <section id="foundation" className="py-20 px-6 bg-white">
      <div className="container-max mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <h2 className="text-3xl md:text-4xl text-emerald-800 mb-2">Our Foundation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Guided by our vision, mission, and core values to create lasting change</p>
        </motion.div>

        <div className="relative">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-emerald-200/30 blur-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-teal-200/30 blur-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          />
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="card-soft p-8 rounded-2xl">
            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl text-emerald-800 mb-3">Vision</h3>
            <p className="text-gray-700 leading-relaxed text-left">
              To build a world where women and youth are empowered, self-sufficient, and capable of shaping their futures, contributing to resilient communities, and promoting equality and social justice.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="card-soft p-8 rounded-2xl">
            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl text-emerald-800 mb-3">Mission</h3>
            <p className="text-gray-700 leading-relaxed text-left">
              To empower women and youth by providing access to education, economic opportunities, and essential life skills, fostering a culture of self-confidence, leadership, and inclusivity that drives sustainable development and positive change.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="card-soft p-8 rounded-2xl">
            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl text-emerald-800 mb-3">Values</h3>
            <ul className="space-y-2 text-gray-700">
              {['Empowerment','Inclusivity','Equity','Integrity','Innovation','Sustainability'].map((v)=>(
                <li key={v} className="flex items-start gap-2"><span className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></span>{v}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="card-soft p-8 rounded-2xl">
            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Flag className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl text-emerald-800 mb-3">Aim</h3>
            <p className="text-gray-700 leading-relaxed text-left">
              Expand access to education and economic opportunity for women and children in remote Ethiopian communities through community-led programs and partnerships.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
