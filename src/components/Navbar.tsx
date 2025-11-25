// src/components/Navbar.tsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const isAuthed = !!localStorage.getItem("token");

  // Parse user name initial if present
  let userName = '';
  let userInitial = '';
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      userName = JSON.parse(userStr).name || '';
      userInitial = userName.charAt(0).toUpperCase();
    }
  } catch {}

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/activities", label: "Activities" },
    { to: "/resources", label: "Resources" },
    { to: "/distribution", label: "Distribution" },
    { to: "/donate", label: "Donate" },
    { to: "/budget", label: "Budget" },
    { to: "/faq", label: "FAQ" },
    { to: "/comments", label: "Comments" },
  ];

  return (
    <header className="backdrop-blur-sm bg-white/60 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Juweria" className="w-10 h-10 rounded-full object-cover" />
          <div className="text-lg font-semibold text-emerald-800">Juweria</div>
        </Link>
        {/* Right side (desktop): search + nav aligned to right */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <form
            className="flex items-center bg-white border border-emerald-200 rounded-lg shadow px-2 py-1 focus-within:ring-2 focus-within:ring-emerald-400"
            onSubmit={e => { e.preventDefault(); }}
          >
            <Search size={18} className="text-emerald-600 mr-2" />
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </form>
          <nav className="flex items-center gap-6">
            {navItems
              .filter((it) => (isAuthed ? true : ["/", "/donate"].includes(it.to)))
              .map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? "text-emerald-700" : "text-gray-700 hover:text-emerald-600"}`
                }
              >
                {it.label}
              </NavLink>
            ))}
            {!isAuthed ? (
              <>
                <Link to="/auth/login" className="text-sm px-4 py-2 border rounded-lg text-emerald-700 border-emerald-700 hover:bg-emerald-50 transition">Login</Link>
                <Link to="/auth/register" className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">Register</Link>
              </>
            ) : (
              <Link to="/profile" className="flex items-center gap-2 px-2 py-1" style={{ minWidth: '44px' }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-200 text-emerald-800 text-lg font-bold border border-emerald-400">
                  {userInitial || 'P'}
                </span>
              </Link>
            )}
          </nav>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2 rounded-md">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:hidden bg-white/95 border-t">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile search */}
            <form className="mb-2 flex items-center bg-white border border-emerald-200 rounded-lg shadow px-2 py-1 focus-within:ring-2 focus-within:ring-emerald-400" onSubmit={e => {e.preventDefault();}}>
              <Search size={18} className="text-emerald-600 mr-2" />
              <input
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </form>
            {navItems
              .filter((it) => (isAuthed ? true : ["/", "/donate"].includes(it.to)))
              .map((it) => (
              <NavLink key={it.to} to={it.to} onClick={() => setOpen(false)} className="block text-gray-700">
                {it.label}
              </NavLink>
            ))}
            <div className="flex gap-2">
              {!isAuthed ? (
                <>
                  <Link to="/auth/login" onClick={() => setOpen(false)} className="text-sm px-4 py-2 border rounded-lg text-emerald-700 border-emerald-700">Login</Link>
                  <Link to="/auth/register" onClick={() => setOpen(false)} className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-lg">Register</Link>
                </>
              ) : (
                <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 px-2 py-1" style={{ minWidth: '44px' }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-200 text-emerald-800 text-lg font-bold border border-emerald-400">
                    {userInitial || 'P'}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
