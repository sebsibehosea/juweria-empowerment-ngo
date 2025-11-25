import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axiosClient from "../api/axiosClient";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    birthdate: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/register", form);
      alert("✅ Registration successful!");
      console.log(res.data);
      window.location.href = "/auth/login";
    } catch (err) {
      console.error(err);
      alert("❌ Registration failed. Check console.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <label className="w-1/3 text-gray-700 font-semibold">Name:</label>
            <input
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="w-2/3 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="w-1/3 text-gray-700 font-semibold">Email:</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-2/3 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="w-1/3 text-gray-700 font-semibold">Phone Number:</label>
            <input
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
              className="w-2/3 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="w-1/3 text-gray-700 font-semibold">Address (optional):</label>
            <input
              name="address"
              type="text"
              placeholder="Enter your address"
              onChange={handleChange}
              className="w-2/3 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="w-1/3 text-gray-700 font-semibold">Birthdate (optional):</label>
            <input
              name="birthdate"
              type="date"
              onChange={handleChange}
              className="w-2/3 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="w-1/3 text-gray-700 font-semibold">Password:</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-2/3 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-emerald-700 transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
