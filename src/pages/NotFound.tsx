// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold text-emerald-800">404</h1>
      <p className="mt-4 text-gray-600">Page not found</p>
      <Link to="/" className="mt-6 inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg">Back home</Link>
    </div>
  );
}
