import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const DEFAULT_TITLES = [
  "Awareness Campaign",
  "Fundraising Event",
  "Hygiene Drive",
  "Resource Distribution",
];

export default function AllActivities() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosClient.get("/activities");
      const acts = res.data.filter(
        (a: any) => !!a.parentCategory && !DEFAULT_TITLES.includes(a.title)
      );
      setRows(acts);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error fetching activities");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    setDeleting(id);
    try {
      await axiosClient.delete(`/activities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRows();
    } catch {}
    setDeleting(null);
  };

  useEffect(() => {
    fetchRows();
     
  }, []);

  if (!token)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-200">
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="mb-2">You must be logged in to view all activities.</p>
          <a href="/auth/login" className="text-emerald-600 underline">Go to Login</a>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-200 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">All Activities (User Entries)</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : rows.length === 0 ? (
          <div className="text-gray-500 text-center">No activities found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border divide-y">
              <thead>
                <tr className="bg-emerald-100 text-emerald-800">
                  <th className="py-2 px-2 text-left text-sm font-semibold">Title</th>
                  <th className="py-2 px-2 text-left text-sm font-semibold">Description</th>
                  <th className="py-2 px-2 text-left text-sm font-semibold">Date</th>
                  <th className="py-2 px-2 text-left text-sm font-semibold">Category</th>
                  <th className="py-2 px-2 text-left text-sm font-semibold">Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-emerald-50">
                    <td className="py-2 px-2 text-sm">{r.title}</td>
                    <td className="py-2 px-2 text-sm max-w-xs line-clamp-3">{r.description}</td>
                    <td className="py-2 px-2 text-xs text-gray-600">{r.date || (r.meta && typeof r.meta === 'object' && r.meta.date) || ''}</td>
                    <td className="py-2 px-2 text-xs text-gray-700">{r.parentCategory}</td>
                    <td className="py-2 px-2 text-xs text-gray-500">{r.created_at?.slice?.(0,10) || ''}</td>
                    <td className="py-2 px-2">
                      <button
                        className="text-red-600 text-lg font-bold hover:bg-red-100 rounded px-2"
                        onClick={() => onDelete(r.id)}
                        disabled={deleting===r.id}
                        title="Delete activity"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
