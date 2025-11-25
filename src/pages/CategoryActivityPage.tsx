import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const ACTIVITY_META: Record<string, any> = {
  awareness: {
    title: "Awareness Campaign",
    description:
      "Educational events to raise community awareness. Awareness campaigns inform and educate the public to foster understanding and engagement about important topics, such as health, hygiene, or social responsibility.",
    icon: "📣",
    color: "bg-yellow-100 text-yellow-700",
  },
  fundraising: {
    title: "Fundraising Event",
    description:
      "Gather donations and resources for our initiatives. Fundraising activities bring the community together to support our causes, raising monetary or in-kind donations.",
    icon: "💰",
    color: "bg-green-100 text-green-700",
  },
  hygiene: {
    title: "Hygiene Drive",
    description:
      "Distribution of hygiene packages to those in need. Volunteers collect and distribute essential hygiene items—such as soap, toothpaste, and sanitary products—to families, schools, or shelters.",
    icon: "🧼",
    color: "bg-blue-100 text-blue-700",
  },
  resources: {
    title: "Resource Distribution",
    description:
      "Providing food, water, and other critical supplies. Outreach programs deliver food, water, clothing, or educational materials to communities in need.",
    icon: "🎒",
    color: "bg-purple-100 text-purple-700",
  },
};

export default function CategoryActivityPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const meta = categoryId ? ACTIVITY_META[categoryId] : null;
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [addErr, setAddErr] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const token = localStorage.getItem("token");

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosClient.get(`/activities`);
      setList(
        res.data.filter((a: any) => a.parentCategory === categoryId)
      );
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error loading activities.");
    } finally {
      setLoading(false);
    }
  };

  const onAdd = async (e: FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setAddErr("");
    try {
      if (!title || !description || !date) {
        setAddErr("Please fill all fields.");
        setAdding(false);
        return;
      }
      await axiosClient.post(
        "/activities",
        { title, description, date, parentCategory: categoryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      setDate("");
      fetchList();
    } catch (err: any) {
      setAddErr(err?.response?.data?.message || "Error adding activity.");
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, [categoryId]);

  if (!meta)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-200">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2 text-emerald-600">Category Not Found</h2>
          <p>This activity category does not exist.</p>
          <Link className="text-emerald-700 underline mt-2 block" to="/activities">
            Go Back
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-200 p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-6 mt-6">
        <div className="mb-4">
          <Link to="/activities" className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:underline">
            <span style={{fontSize:'1.3em',lineHeight:'0'}}>&larr;</span>
            Back to Activities
          </Link>
        </div>
        <div className={`flex items-center gap-4 mb-2 ${meta.color}`}>
          <span className="text-4xl">{meta.icon}</span>
          <div>
            <div className="font-bold text-2xl text-emerald-800">{meta.title}</div>
            <div className="text-gray-700 mt-1">{meta.description}</div>
          </div>
        </div>

        <h3 className="text-emerald-700 font-bold mt-4 mb-2 text-xl">Today's Activities</h3>
        {loading ? <div>Loading...</div>
          : error ? <div className="text-red-500">{error}</div>
          : (
            list.length ? (
              <div className="divide-y border rounded-lg bg-emerald-50">
                {list.map((a) => (
                  <div key={a.id} className="p-4 flex items-start gap-2">
                    <div className="flex-1">
                      <div className="font-semibold">{a.title}</div>
                      <div className="text-sm text-gray-700">{a.description}</div>
                      <div className="text-xs text-gray-500 mt-1">{a.date || (a.meta && typeof a.meta === 'object' && a.meta.date) || ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="text-gray-500 text-center">No activities logged for this category yet.</div>
          )}


        {token && (
          <div className="bg-white px-0 py-4">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2 items-end" onSubmit={onAdd}>
              <input
                type="text"
                className="border rounded p-2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                className="border rounded p-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="date"
                className="border rounded p-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={adding}
                className="md:col-span-3 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-800 transition mt-2"
              >
                Add Activity
              </button>
            </form>
            {addErr && <div className="text-red-600 text-sm">{addErr}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
