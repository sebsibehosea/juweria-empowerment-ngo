// src/pages/Resources.tsx
import { motion } from "framer-motion";

const sample = [
  { id: 1, title: "Reusable Pads: Step-by-Step Guide (PDF)", type: "pdf", url: "#" },
  { id: 2, title: "Community Hygiene Workshop (Video)", type: "video", url: "#" },
  { id: 3, title: "Teacher Literacy Toolkit (PDF)", type: "pdf", url: "#" },
  { id: 4, title: "Parent Numeracy Handout (PDF)", type: "pdf", url: "#" },
];

export default function Resources() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 className="text-3xl text-emerald-800 font-bold mb-6" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}>
          Educational Resources
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {sample.map((r) => (
            <motion.div key={r.id} whileHover={{ scale: 1.02 }} className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-500 mb-2">{r.type.toUpperCase()}</div>
              <h3 className="font-semibold text-emerald-800">{r.title}</h3>
              <div className="mt-4">
                <a className="text-sm text-emerald-600 hover:underline" href={r.url}>View / Download</a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h3 className="text-2xl text-emerald-800 font-semibold mt-12 mb-4" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}>
          Stories from the Field
        </motion.h3>
        <p className="text-gray-600 mb-6">Curated public media featuring mothers and children in rural Ethiopia. Replace with your own media later.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow bg-white">
            <img
              src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1200&auto=format&fit=crop"
              alt="Mother and child in rural Ethiopia"
              className="w-full h-48 object-cover"
              loading="lazy"
              onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = 'https://source.unsplash.com/1200x800/?mother,ethiopia'; }}
            />
            <div className="p-4">
              <h4 className="font-semibold text-emerald-800">Learning Together</h4>
              <p className="text-sm text-gray-600">Community-led study circles for mothers and girls.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow bg-white">
            <img
              src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?q=80&w=1200&auto=format&fit=crop"
              alt="Children smiling in countryside"
              className="w-full h-48 object-cover"
              loading="lazy"
              onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = 'https://source.unsplash.com/1200x800/?children,ethiopia'; }}
            />
            <div className="p-4">
              <h4 className="font-semibold text-emerald-800">Healthy Smiles</h4>
              <p className="text-sm text-gray-600">Hygiene and wellbeing programs for children.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow bg-white">
            <img
              src="https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=80&w=1200&auto=format&fit=crop"
              alt="Women entrepreneurship"
              className="w-full h-48 object-cover"
              loading="lazy"
              onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = 'https://source.unsplash.com/1200x800/?women,entrepreneurship,africa'; }}
            />
            <div className="p-4">
              <h4 className="font-semibold text-emerald-800">Mothers in Microenterprise</h4>
              <p className="text-sm text-gray-600">Local craft and market access initiatives.</p>
            </div>
          </motion.div>
        </div>

        <motion.h3 className="text-2xl text-emerald-800 font-semibold mt-12 mb-4" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}>
          Hygiene & Learning Materials
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow bg-white">
            <img
              src="https://images.unsplash.com/photo-1600959907703-125ba1374a12?q=80&w=1200&auto=format&fit=crop"
              alt="Hygiene kits"
              className="w-full h-48 object-cover"
              loading="lazy"
              onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = 'https://source.unsplash.com/1200x800/?hygiene,kits'; }}
            />
            <div className="p-4">
              <h4 className="font-semibold text-emerald-800">Women’s Hygiene Kits</h4>
              <p className="text-sm text-gray-600">Soap, reusable pads, underwear, and guidance leaflets.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow bg-white">
            <img
              src="https://images.unsplash.com/photo-1584697964199-10a3f31e3f47?q=80&w=1200&auto=format&fit=crop"
              alt="Teaching materials"
              className="w-full h-48 object-cover"
              loading="lazy"
              onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = 'https://picsum.photos/seed/education123/1200/800'; }}
            />
            <div className="p-4">
              <h4 className="font-semibold text-emerald-800">Teaching Materials</h4>
              <p className="text-sm text-gray-600">Flashcards, reading charts, and basic arithmetic sets.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow bg-white">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"
              alt="Handwashing station"
              className="w-full h-48 object-cover"
              loading="lazy"
              onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = 'https://picsum.photos/seed/handwash/1200/800'; }}
            />
            <div className="p-4">
              <h4 className="font-semibold text-emerald-800">Handwashing Stations</h4>
              <p className="text-sm text-gray-600">Low-cost tippy-taps and handwashing education posters.</p>
            </div>
          </motion.div>
        </div>

        <motion.h3 className="text-2xl text-emerald-800 font-semibold mt-12 mb-4" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}>
          Short Videos
        </motion.h3>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.01 }} className="rounded-2xl overflow-hidden shadow bg-white">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/8Z9bM5cTqis"
                title="Community education in rural Ethiopia"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-emerald-800">Community Education</h4>
              <p className="text-sm text-gray-600">Sample clip. Replace with your own footage.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="rounded-2xl overflow-hidden shadow bg-white">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ysz5S6PUM-U"
                title="Women empowerment initiatives"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-emerald-800">Women Empowerment</h4>
              <p className="text-sm text-gray-600">Hygiene, leadership, and training highlights.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
