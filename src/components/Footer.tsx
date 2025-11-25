// src/components/Footer.tsx
import { Mail, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-800 text-emerald-100 py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-lg font-semibold">Juweria Empowerment</h4>
          <p className="text-sm mt-2 max-w-md">Empowering women & youth in remote communities through education, hygiene, and economic support.</p>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="/#activities" className="hover:underline">Activities</a></li>
            <li><a href="/resources" className="hover:underline">Resources</a></li>
            <li><a href="/donate" className="hover:underline">Donate</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Contact</h5>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +251 911 965 018</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@juweriaproject.org</div>
            <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> www.juweria.org</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-emerald-200">
        © {new Date().getFullYear()} Juweria Empowerment — All rights reserved.
      </div>
    </footer>
  );
}
