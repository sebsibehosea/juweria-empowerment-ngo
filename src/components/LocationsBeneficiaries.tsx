import { motion } from 'motion/react';
import { MapPin, Users } from 'lucide-react';

const locations = [
  'Ethiopian Somalia Regional State',
  'Jigjiga City',
  'Harerie Regional State',
  'Dirie Dawa Administrative City',
  'Addis Ababa Administrative City'
];

export default function LocationsBeneficiaries() {
  return (
    <section id="locations" className="py-20 px-6 bg-white">
      <div className="container-max mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl text-emerald-800">Project Locations</h2>
            </div>

            <div className="card-soft p-6 rounded-2xl">
              <ul className="space-y-3 text-gray-700">
                {locations.map((loc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></span>
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl text-emerald-800">Beneficiaries</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-600 to-green-600 text-white rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3">Primary Beneficiaries</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">👩</span>
                    <div>
                      <p>Women (ages 26-59)</p>
                      <p className="text-emerald-100">From underserved communities</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl">👦</span>
                    <div>
                      <p>Youth (ages 10-25)</p>
                      <p className="text-emerald-100">From underserved communities</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-soft p-6 rounded-2xl">
                <h3 className="text-lg text-emerald-800 mb-3">Secondary Beneficiaries</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></span><span>Families of primary beneficiaries</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></span><span>Local communities</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></span><span>Schools and educational institutions</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></span><span>Local government entities</span></li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
