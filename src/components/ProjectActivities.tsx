import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, TrendingUp, Users, Heart, Shield } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import axiosClient from '../api/axiosClient';

// map categories to icons for dynamic rendering
const iconMap: Record<string, any> = {
  education: BookOpen,
  economic: TrendingUp,
  leadership: Users,
  health: Heart,
  protection: Shield,
};

interface ActivityItem {
  name: string;
  description: string;
}

interface Activity {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: ActivityItem[];
}

export default function ProjectActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    let isMounted = true;
    axiosClient
      .get('/activities')
      .then((res) => {
        if (isMounted) setActivities(res.data);
      })
      .catch((err) => console.error('❌ Error fetching activities:', err));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="activities" className="py-20 px-6 bg-white">
      <div className="container-max mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl text-emerald-800 mb-2">
            Project Activities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive programs designed to empower and support women and youth
          </p>
        </motion.div>

        {activities.length > 0 ? (
          <Tabs defaultValue={activities[0].id}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {activities.map((act) => {
                const Icon = iconMap[act.icon] || BookOpen;
                return (
                  <TabsTrigger key={act.id} value={act.id} className="flex flex-col items-center p-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm hidden md:inline">{act.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {activities.map((act) => {
              const Icon = iconMap[act.icon] || BookOpen;
              return (
                <TabsContent key={act.id} value={act.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl text-emerald-800">{act.title}</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {act.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: idx * 0.08 }}
                          className="bg-white p-6 rounded-xl shadow-sm"
                        >
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
        ) : (
          <p className="text-center text-gray-500">Loading activities...</p>
        )}
      </div>
    </section>
  );
}
