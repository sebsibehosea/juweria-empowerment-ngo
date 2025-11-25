import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const Profile = () => {
  const navigate = useNavigate();
  let userName = '';
  let userEmail = '';
  let userInitial = '';
  let userPhone = '';
  let userAddress = '';
  let userBirthdate = '';
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      userName = user.name || '';
      userEmail = user.email || '';
      userPhone = user.phone || '';
      userAddress = user.address || '';
      userBirthdate = user.birthdate || '';
      userInitial = userName.charAt(0).toUpperCase();
    }
  } catch {}

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState(userPhone);
  const [address, setAddress] = useState(userAddress);
  const [birthdate, setBirthdate] = useState(userBirthdate);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const [pwMode, setPwMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const res = await axiosClient.patch(
        "/auth/profile",
        { name: name.trim(), email: email.trim() },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMsg(res.data.message || "Profile updated.");
      localStorage.setItem("user", JSON.stringify({ name: name.trim(), email: email.trim() }));
      setEditMode(false);
      window.location.reload();
    } catch (err: any) {
      setMsg(err?.response?.data?.message || "Error saving changes.");
    } finally {
      setSaving(false);
    }
  };

  const handlePw = async (e: FormEvent) => {
    e.preventDefault();
    setPwSaving(true);
    setPwMsg("");
    try {
      if (!newPassword || !currentPassword) {
        setPwMsg("Fill both current and new password.");
        setPwSaving(false);
        return;
      }
      const res = await axiosClient.patch(
        "/auth/password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setPwMsg(res.data.message || "Password updated.");
      setPwMode(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPwMsg(err?.response?.data?.message || "Error updating password.");
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-emerald-200 text-emerald-800 text-4xl font-bold border border-emerald-400 mb-2">
            {userInitial || 'U'}
          </div>
          <div className="text-xl font-bold text-emerald-800">{userName || 'User'}</div>
          <div className="text-gray-500">{userEmail || 'No email found'}</div>
          {userPhone && <div className="text-gray-500">Phone: {userPhone}</div>}
          {userAddress && <div className="text-gray-500">Address: {userAddress}</div>}
          {userBirthdate && <div className="text-gray-500">Birthdate: {userBirthdate}</div>}
        </div>
        {/* Edit Profile form */}
        <div className="space-y-3 mb-6">
          {!editMode ? (
            <button className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50" onClick={() => setEditMode(true)}>Edit Profile</button>
          ) : (
            <form className="space-y-2" onSubmit={handleEdit}>
              <input className="w-full border rounded-lg p-2 mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
              <input className="w-full border rounded-lg p-2 mb-2" placeholder="Email" value={email} type="email" onChange={e => setEmail(e.target.value)} required />
              <input className="w-full border rounded-lg p-2 mb-2" placeholder="Phone number" value={phone} type="tel" onChange={e => setPhone(e.target.value)} required />
              <input className="w-full border rounded-lg p-2 mb-2" placeholder="Address (optional)" value={address} onChange={e => setAddress(e.target.value)} />
              <input className="w-full border rounded-lg p-2 mb-2" placeholder="Birthdate (optional)" value={birthdate} type="date" onChange={e => setBirthdate(e.target.value)} />
              <button disabled={saving} className="bg-emerald-600 text-white px-4 py-2 rounded mr-2">Save</button>
              <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => setEditMode(false)}>Cancel</button>
              {msg && <div className="text-sm py-1 text-emerald-700 font-medium">{msg}</div>}
            </form>
          )}
        </div>
        {/* Change Password form  */}
        <div className="space-y-3 mb-6">
          {!pwMode ? (
            <button className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 font-medium hover:bg-blue-50" onClick={() => setPwMode(true)}>Change Password</button>
          ) : (
            <form className="space-y-2" onSubmit={handlePw}>
              <input
                className="w-full border rounded-lg p-2 mb-2"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                required
              />
              <input
                className="w-full border rounded-lg p-2 mb-2"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                required
              />
              <button disabled={pwSaving} className="bg-emerald-600 text-white px-4 py-2 rounded mr-2">Change</button>
              <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => setPwMode(false)}>Cancel</button>
              {pwMsg && <div className="text-sm py-1 text-blue-700 font-medium">{pwMsg}</div>}
            </form>
          )}
        </div>
        <hr className="my-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-gray-600 text-sm">Account settings and extra features coming soon!</div>
          <button
            onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/auth/login'); }}
            className="px-4 py-2 border rounded-lg text-emerald-700 border-emerald-700 hover:bg-emerald-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
