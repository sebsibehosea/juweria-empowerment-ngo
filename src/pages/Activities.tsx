import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

const DEFAULT_ACTIVITIES = [
  { id: "awareness", title: "Awareness Campaign", description: "Educational events to raise community awareness.", meta: { icon: "📣", color: "bg-yellow-100 text-yellow-700" } },
  { id: "fundraising", title: "Fundraising Event", description: "Gather donations and resources for our initiatives.", meta: { icon: "💰", color: "bg-green-100 text-green-700" } },
  { id: "hygiene", title: "Hygiene Drive", description: "Distribution of hygiene packages to those in need.", meta: { icon: "🧼", color: "bg-blue-100 text-blue-700" } },
  { id: "resources", title: "Resource Distribution", description: "Providing food, water, and other critical supplies.", meta: { icon: "🎒", color: "bg-purple-100 text-purple-700" } },
];

export default function Activities() {
  const [mind, setMind] = useState("");
  const [mindPosts, setMindPosts] = useState<string[]>([]);
  const [editingIdx, setEditingIdx] = useState<number|null>(null);
  const [editText, setEditText] = useState("");

  const handleMind = (e: FormEvent) => {
    e.preventDefault();
    if (mind.trim()) {
      setMindPosts([mind.trim(), ...mindPosts]);
      setMind("");
    }
  };
  const deletePost = (idx:number) => {
    setMindPosts(posts => posts.filter((_, i) => i !== idx));
    // If editing this post, stop editing
    if (editingIdx === idx) {
      setEditingIdx(null);
      setEditText("");
    }
  };
  const startEdit = (idx:number, cur:string) => {
    setEditingIdx(idx); setEditText(cur);
  };
  const saveEdit = (idx:number) => {
    if (editText.trim()) {
      setMindPosts(posts => posts.map((p,i) => i === idx ? editText.trim() : p));
      setEditingIdx(null); setEditText("");
    }
  };
  const cancelEdit = () => {
    setEditingIdx(null); setEditText("");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-200">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="col-span-1 bg-white shadow rounded-2xl p-6 flex flex-col gap-3 border-emerald-200 border hover:shadow-lg transition-all">
          <div className="font-semibold text-lg text-emerald-700 mb-2">What's on your mind?</div>
          <form className="flex flex-col gap-2" onSubmit={handleMind}>
            <textarea
              rows={2}
              className="border rounded-lg p-2 focus:ring-emerald-400 resize-none"
              placeholder="Share an idea or activity suggestion..."
              value={mind}
              maxLength={200}
              onChange={e => setMind(e.target.value)}
              required
            />
            <button type="submit" className="self-end px-4 py-1 rounded bg-emerald-600 text-white font-semibold hover:bg-emerald-800 transition text-sm">Add</button>
          </form>
          {mindPosts.length > 0 && (
            <div className="mt-3 space-y-2">
              {mindPosts.map((p, idx) => (
                <div key={idx} className="bg-emerald-50 border rounded p-2 text-gray-700 text-sm flex items-start justify-between gap-2">
                  {editingIdx === idx ? (
                    <div className="flex-1 flex flex-col gap-1">
                      <textarea className="border rounded p-1" value={editText} maxLength={200} rows={2} onChange={e=>setEditText(e.target.value)} />
                      <div className="flex gap-1 mt-1">
                        <button className="bg-emerald-600 text-white rounded px-2 py-0.5 text-xs hover:bg-emerald-800" onClick={()=>saveEdit(idx)} type="button">Save</button>
                        <button className="bg-gray-200 rounded px-2 py-0.5 text-xs" onClick={cancelEdit} type="button">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1 break-words">{p}</span>
                      <button onClick={()=>startEdit(idx, p)} className="ml-2 text-emerald-500 hover:text-emerald-700 text-xl px-1.5 py-0.5 rounded" title="Edit post" type="button">✏️</button>
                      <button onClick={()=>deletePost(idx)} className="ml-1 text-red-500 hover:text-red-700 text-xl px-1.5 py-0.5 rounded" title="Delete post" type="button">🗑️</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Empty div on mobile for grid symmetry */}
        <div className="hidden md:block" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {DEFAULT_ACTIVITIES.map((a) => (
          <Link
            key={a.id}
            to={`/activities/${a.id}`}
            className={`no-underline cursor-pointer select-none transition-all duration-150 flex flex-col shadow rounded-xl px-6 py-6 ${a.meta.color} hover:ring-2 hover:ring-emerald-400 hover:scale-[1.03]`}
            style={{ textDecoration: "none" }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{a.meta.icon}</span>
              <div>
                <div className="font-bold text-lg">{a.title}</div>
                <div className="text-gray-600 text-sm">{a.description}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
