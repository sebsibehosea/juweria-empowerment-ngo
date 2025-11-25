// src/App.tsx
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ActivitiesPage from "./pages/Activities";
import Donate from "./pages/Donate";
import Resources from "./pages/Resources";
import Distribution from "./pages/Distribution";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Budget from "./pages/Budget";
import Profile from "./pages/Profile";
import AllActivities from "./pages/AllActivities";
import CategoryActivityPage from "./pages/CategoryActivityPage";
import FAQ from "./pages/FAQ";
import Comments from "./pages/Comments";

function useSessionTimeout() {
  const navigate = useNavigate();
  useEffect(() => {
    const doLogout = () => {
      localStorage.clear();
      navigate("/auth/login");
    };
    // 2hr timer
    let loginTime = localStorage.getItem("loginTime");
    if (!loginTime && localStorage.getItem("token")) {
      localStorage.setItem("loginTime", Date.now().toString());
      loginTime = Date.now().toString();
    }
    let rem = 1000 * 60 * 60 * 2;
    if (loginTime) {
      const elapsed = Date.now() - parseInt(loginTime, 10);
      rem = Math.max(0, 1000 * 60 * 60 * 2 - elapsed);
    }
    const timer = setTimeout(() => {
      doLogout();
      alert("Your session has expired. Please log in again.");
    }, rem);
    function handleOffline() {
      doLogout();
      alert("You went offline. For security, you have been logged out.");
    }
    window.addEventListener("offline", handleOffline);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate]);
}

export default function App() {
  useSessionTimeout();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-green-50 text-gray-800">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<ProtectedRoute><ActivitiesPage /></ProtectedRoute>} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
          <Route path="/distribution" element={<ProtectedRoute><Distribution /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/all-activities" element={<AllActivities />} />
          <Route path="/activities/:categoryId" element={<CategoryActivityPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
