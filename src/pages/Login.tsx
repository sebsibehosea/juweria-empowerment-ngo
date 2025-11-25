import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPwd, setShowPwd] = useState(false); // password visibility state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify({ name: res.data.user.name || '', email: res.data.user.email || '' }));
      }
      alert("✅ Login successful!");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || "Login failed";
      const detail = err?.response?.data?.detail;
      alert(`❌ ${msg}${detail ? `\nDetail: ${detail}` : ''}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-emerald-700">Welcome back</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-12"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-700 focus:outline-none"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? (
                  // eye (open) icon
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // eye-off
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.91 10.91 0 0 1 12 19c-7 0-11-7-11-7 1.47-2.53 3.63-4.46 6.16-5.74" />
                    <path d="M1 1l22 22" />
                    <path d="M14.12 9.88A3 3 0 0 0 12 9a3 3 0 0 0-3 3c0 .65.2 1.25.53 1.74" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-emerald-700 transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don\'t have an account? <a href="/auth/register" className="text-emerald-700 hover:underline font-medium">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
