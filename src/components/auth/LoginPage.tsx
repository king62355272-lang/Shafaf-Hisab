import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import { ArrowLeft, CheckCircle2, TrendingUp, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LoginPageProps {
  onBackToHome: () => void;
  onGoToSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBackToHome, onGoToSignup }) => {
  const { loginUser, showToast } = useApp();
  const [identifier, setIdentifier] = useState('0300-1111111');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(identifier, password);
    }, 300);
  };

  const handleQuickDemo = () => {
    loginUser('0300-1111111');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center">
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Split: SHAFAF HISAB Branding, Benefits & Mini Dashboard Preview */}
        <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-[#0B1F33] via-[#0E2841] to-[#0B1F33] text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#0F766E20_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Website</span>
            </button>
            <Logo size="md" variant="light" />
          </div>

          {/* Center Brand Statements */}
          <div className="relative z-10 my-auto py-8">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-3">
              Management Platform
            </span>
            <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Your business is ready <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                when you are.
              </span>
            </h2>

            {/* Short benefit statements */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-base font-semibold text-slate-200">Track sales & invoices in real time</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-base font-semibold text-slate-200">Understand true take-home profit</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-base font-semibold text-slate-200">Stay on top of customer udhaar balances</span>
              </div>
            </div>

            {/* Miniature Dashboard Preview Tile */}
            <div className="mt-10 p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-xl max-w-md">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Al-Madina Super Store · Today</span>
                <span className="text-emerald-400 font-mono-numbers">Live Sync</span>
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold font-mono-numbers text-white">Rs. 84,500</span>
                  <span className="text-xs text-slate-400 block mt-0.5">126 Orders Completed</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono-numbers text-emerald-400">+Rs. 32,850</span>
                  <span className="text-[11px] text-slate-400 block">Calculated Profit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Assurance */}
          <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400 pt-6 border-t border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Multi-tenant encrypted database architecture with isolated tenant storage.</span>
          </div>
        </div>

        {/* Right Split: Login Form (Single column on mobile) */}
        <div className="col-span-1 lg:col-span-6 bg-white p-6 sm:p-12 xl:p-16 flex flex-col justify-between">
          <div className="flex items-center justify-between lg:hidden pb-6 border-b border-slate-100">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <Logo size="sm" variant="dark" />
          </div>

          <div className="max-w-md w-full mx-auto my-auto py-8">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
                Login to SHAFAF HISAB
              </h1>
              <p className="text-sm text-slate-600 mt-1.5">
                Enter your credentials to access your business operations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="0300-1234567 or email@domain.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-all"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to registered mobile/email.'); }} className="text-xs font-semibold text-[#0F766E] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-all"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span>Accessing Business...</span>
                ) : (
                  <>
                    <span>Login to My Business</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Test Accounts for Data Isolation Verification */}
            <div className="mt-5 pt-5 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Test Accounts (Data Isolation Verified):
              </span>
              <div className="grid grid-cols-3 gap-2 text-left">
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier('0300-1111111');
                    loginUser('0300-1111111');
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 transition-all cursor-pointer text-left"
                >
                  <span className="text-[10px] font-bold text-emerald-700 block">Account A</span>
                  <span className="text-[11px] font-extrabold block truncate">Kiryana</span>
                  <span className="text-[9px] text-slate-400 font-mono">0300-1111111</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier('0300-2222222');
                    loginUser('0300-2222222');
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 transition-all cursor-pointer text-left"
                >
                  <span className="text-[10px] font-bold text-teal-700 block">Account B</span>
                  <span className="text-[11px] font-extrabold block truncate">E-Commerce</span>
                  <span className="text-[9px] text-slate-400 font-mono">0300-2222222</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier('0300-3333333');
                    loginUser('0300-3333333');
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 transition-all cursor-pointer text-left"
                >
                  <span className="text-[10px] font-bold text-indigo-700 block">Account C</span>
                  <span className="text-[11px] font-extrabold block truncate">Freelancer</span>
                  <span className="text-[9px] text-slate-400 font-mono">0300-3333333</span>
                </button>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onGoToSignup}
                className="font-bold text-[#0F766E] hover:underline cursor-pointer"
              >
                Create your business
              </button>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400 pt-4">
            Protected by SHAFAF HISAB Tenant Security Layer · 2026
          </div>
        </div>
      </div>
    </div>
  );
};
