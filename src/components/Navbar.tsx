import React from "react";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <img
          src="/logo.png"
          alt="Juweria Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold text-green-700">Juweria Project</h1>
      </div>
      <ul className="hidden md:flex space-x-6 text-green-800">
        {["home", "foundation", "education", "contact"].map((section) => (
          <li key={section}>
            <button
              onClick={() => scrollToSection(section)}
              className="hover:text-green-600 transition"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
