// src/pages/Distribution.tsx
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import axiosClient from "../api/axiosClient";

export default function Distribution() {
  const [dists, setDists] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loc, setLoc] = useState("");
  const [count, setCount] = useState("");
  const [pkgType, setPkgType] = useState("");
  const [notes, setNotes] = useState("");
  const token = localStorage.getItem("token");

  const fetchDists = async () => {
    setError("");
    try {
      const res = await axiosClient.get("/hygiene", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setDists(res.data);
    } catch (err: any) {
      setError("Could not fetch distributions");
      setDists([]);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(""); setMsg("");
    try {
      await axiosClient.post(
        "/hygiene",
        { location: loc, beneficiary_count: count, package_type: pkgType, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("Distribution recorded!");
      setLoc(""); setCount(""); setPkgType(""); setNotes("");
      setShowForm(false);
      fetchDists();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to record.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => { fetchDists(); }, []);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 className="text-3xl text-emerald-800 mb-6" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}>
          Hygiene Material Distribution
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-emerald-700 mb-3">Recent Distributions</h3>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <ul className="space-y-3 text-gray-700">
              {dists.length === 0 && <li>No records found.</li>}
              {dists.map((rec) => (
                <li key={rec.id} className="flex flex-col">
                  <span><span className="font-bold">{rec.location}</span> — {rec.beneficiary_count} kits{rec.package_type && ` (${rec.package_type})`}</span>
                  <span className="text-xs text-gray-500">{rec.created_at?.slice?.(0,10)}</span>
                  {rec.notes && <span className="text-xs text-gray-600 italic">{rec.notes}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-emerald-700 mb-3">Record a Distribution</h3>
            <p className="text-sm text-gray-600 mb-4">(Admin / Volunteer only)
            </p>
            {msg && <div className="text-emerald-700 font-medium mb-2">{msg}</div>}
            {!showForm ? (
              <button className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg" onClick={() => setShowForm(true)} disabled={!token}>
                Record Distribution
              </button>
            ) : (
              <form className="flex flex-col gap-2" onSubmit={onSubmit}>
                <input
                  className="border rounded p-2"
                  placeholder="Location"
                  required
                  value={loc}
                  onChange={e => setLoc(e.target.value)}
                />
                <input
                  className="border rounded p-2"
                  placeholder="Number of Beneficiaries"
                  type="number"
                  required
                  min={1}
                  value={count}
                  onChange={e => setCount(e.target.value)}
                />
                <input
                  className="border rounded p-2"
                  placeholder="Package Type (optional)"
                  value={pkgType}
                  onChange={e => setPkgType(e.target.value)}
                />
                <textarea
                  placeholder="Notes (optional)"
                  className="border rounded p-2"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button type="submit" disabled={submitting} className="bg-emerald-600 text-white px-4 py-2 rounded">
                    Save
                  </button>
                  <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={()=>setShowForm(false)}>
                    Cancel
                  </button>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
