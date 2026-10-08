import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import { Menu, X, ArrowRight, LayoutDashboard, Sparkles, Building2, ShieldCheck, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onOpenSignup }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setViewMode, setIsAuthenticated, setIsIsolationTestModalOpen } = useApp();

  const handleDownloadHtml = () => {
    // Generates a download of the current complete standalone HTML file of SHAFAF HISAB
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob(['<!doctype html>\n' + htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shafaf-hisab-complete.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const navLinks = [
    { label: 'Platform Features', href: '#features' },
    { label: 'Industry Verticals', href: '#demo' },
    { label: 'Customer Udhaar / Khata', href: '#khata-demo' },
    { label: 'Analytics & Reports', href: '#reports' },
    { label: 'Pricing Plans', href: '#pricing' },
    { label: 'About', href: '#about' },
  ];

  const handleLaunchPortal = () => {
    setIsAuthenticated(true);
    setViewMode('app');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0C2340]/95 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo Lockup */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 hover:opacity-95 transition-opacity">
            <Logo size="md" variant="light" showTagline={true} />
          </a>
          <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>v2.6 Enterprise</span>
          </span>
        </div>

        {/* Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-emerald-300 transition-colors duration-150 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary Header Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => setIsIsolationTestModalOpen(true)}
            className="px-3 py-2 text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Inspect & Verify Zero Data Leakage Across Accounts"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Isolation Test</span>
          </button>

          <button
            onClick={onOpenLogin}
            className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={onOpenSignup}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl shadow-sm transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-teal-950/30"
          >
            <span>Start Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleLaunchPortal}
            className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Explore Interactive Demo Workspace"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Demo</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleLaunchPortal}
            className="px-2.5 py-1.5 text-xs font-medium text-emerald-300 bg-white/10 rounded-lg border border-emerald-500/30"
          >
            Console
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-[#0C2340] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-200 bg-slate-800/80 rounded-xl"
            >
              Portal Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSignup();
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl"
            >
              Apply for Admission / Enterprise Inquiry
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLaunchPortal();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-emerald-300 bg-white/10 border border-emerald-500/30 rounded-xl"
            >
              Launch Software Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
