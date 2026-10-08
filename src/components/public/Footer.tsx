import React from 'react';
import { Logo } from '../brand/Logo';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-[#0B1F33] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" variant="light" showTagline={true} />
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed mt-2">
              The modern business management platform for retail, e-commerce, wholesale, garments, and service enterprises across Pakistan and emerging markets.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+92 (300) 123-4567 / +92 (42) 3578-9000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@shafafhisab.pk</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Main Boulevard, Gulberg III, Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#reports" className="hover:text-white transition-colors">Reports</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">WhatsApp Hub</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Multi-Branch Setup</a></li>
            </ul>
          </div>

          {/* Business Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Business
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#businesses" className="hover:text-white transition-colors">Retail Stores</a></li>
              <li><a href="#businesses" className="hover:text-white transition-colors">E-commerce Brands</a></li>
              <li><a href="#businesses" className="hover:text-white transition-colors">Freelancers & Studios</a></li>
              <li><a href="#businesses" className="hover:text-white transition-colors">Service Businesses</a></li>
              <li><a href="#businesses" className="hover:text-white transition-colors">Wholesale Distributors</a></li>
              <li><a href="#businesses" className="hover:text-white transition-colors">Garments & Footwear</a></li>
            </ul>
          </div>

          {/* Company & Support Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Company & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Help Center & Docs</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Security & Backups</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>© 2026 SHAFAF HISAB Inc. All rights reserved. “Manage Better. Grow Smarter.”</span>
          </div>

          <div className="flex items-center gap-6">
            <span>256-bit Encrypted</span>
            <span>Zero Data Sharing</span>
            <span>99.9% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
