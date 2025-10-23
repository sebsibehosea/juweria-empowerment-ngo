import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, TrendingUp, Users, Heart, Shield } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

const activities = [
  {
    id: 'education',
    title: 'Education & Skill Development',
    icon: BookOpen,
    color: 'emerald',
    items: [
      { name: 'Basic Literacy and Numeracy', description: 'Community-based classes for those with limited formal education' },
      { name: 'Vocational Training', description: 'Courses in tailoring, IT, agriculture, TVET and other market-driven skills' },
      { name: 'Digital Literacy Workshops', description: 'Essential digital skills to improve access to information and job opportunities' }
    ]
  },
  {
    id: 'economic',
    title: 'Economic Empowerment',
    icon: TrendingUp,
    color: 'green',
    items: [
      { name: 'Entrepreneurship Training', description: 'Workshops on business planning, financial management, and marketing' },
      { name: 'Microfinance Support', description: 'Small loans and savings opportunities through local microfinance institutions' },
      { name: 'Job Placement Support', description: 'Partnerships with local businesses to facilitate job placement' }
    ]
  },
  {
    id: 'leadership',
    title: 'Leadership Development',
    icon: Users,
    color: 'lime',
    items: [
      { name: 'Leadership Training Workshops', description: 'Public speaking and leadership skills training' },
      { name: 'Community Advocacy Campaigns', description: 'Youth-led campaigns on gender equality and rights' },
      { name: 'Peer Mentorship', description: 'Building networks of emerging and experienced leaders' }
    ]
  },
  {
    id: 'health',
    title: 'Health & Wellbeing',
    icon: Heart,
    color: 'teal',
    items: [
      { name: 'Health Education Workshops', description: 'Training on reproductive health, hygiene, nutrition, and disease prevention' },
      { name: 'Mental Health Support', description: 'Counseling services, group therapy, and peer support groups' },
      { name: 'Nutritional Support Programs', description: 'Food distribution and nutrition education for vulnerable families' }
    ]
  },
  {
    id: 'protection',
    title: 'Protection & Support',
    icon: Shield,
    color: 'cyan',
    items: [
      { name: 'Women & Youth Development', description: 'Educational support and learning activities' },
      { name: 'Counseling and Mentorship', description: 'Access to counselors and mentors for personal development' },
      { name: 'Rights Awareness Workshops', description: 'Education on protection, rights, and GBV prevention' }
    ]
  }
];

export default function ProjectActivities() {
  return (
    <section id="activities" className="py-20 px-6 bg-white">
      <div className="container-max mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl text-emerald-800 mb-2">Project Activities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive programs designed to empower and support women and youth</p>
        </motion.div>

        <Tabs defaultValue="education">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {activities.map(act => {
              const Icon = act.icon;
              return (
                <TabsTrigger key={act.id} value={act.id} className="flex flex-col items-center p-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm hidden md:inline">{act.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {activities.map(act => {
            const Icon = act.icon;
            return (
              <TabsContent key={act.id} value={act.id}>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl text-emerald-800">{act.title}</h3>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {act.items.map((item, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.08 }} className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="text-emerald-800 mb-1 font-semibold">{item.name}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
