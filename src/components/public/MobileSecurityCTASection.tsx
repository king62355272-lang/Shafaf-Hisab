import React from 'react';
import {
  Smartphone,
  ShieldCheck,
  Lock,
  Database,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  MessageCircle,
  Share2,
  Layers,
  Server,
  FileCheck,
} from 'lucide-react';

interface MobileSecurityCTAProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export const MobileSecurityCTASection: React.FC<MobileSecurityCTAProps> = ({
  onGetStarted,
  onExploreDemo,
}) => {
  return (
    <div className="space-y-0">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 10: MOBILE APP PREVIEW */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text & Features */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Section 10 · Native-Grade Mobile Experience</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight leading-tight">
                Your entire business. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 animate-text-shimmer">
                  Right in your pocket.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Whether you're behind the counter, visiting wholesalers in Akbari Mandi, or managing dispatches from home, SHAFAF HISAB is optimized for smartphones with zero horizontal scrolling.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">One-Handed Fast Counter Checkout</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Big touch targets designed for rapid shop counter typing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">1-Tap WhatsApp Statement Delivery</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Send polite customer balance reminders with running debit/credit tables directly into their WhatsApp.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Works on 320px to 430px Devices</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Tested across low-cost and flagship mobile devices without layout distortion.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Mobile Device Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-[300px] sm:w-[320px] rounded-[44px] p-3 bg-slate-900 border-4 border-slate-800 shadow-2xl shadow-slate-900/40">
                {/* Phone Speaker Notch */}
                <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-slate-800 inline-block" />
                </div>

                {/* Mobile Screen Interior */}
                <div className="rounded-[34px] bg-[#0C2340] text-white p-4 overflow-hidden border border-slate-800 space-y-3">
                  {/* Mobile Top Bar */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pb-2 border-b border-slate-800">
                    <span className="text-emerald-400 font-bold">SHAFAF MOBILE</span>
                    <span>100% Synced</span>
                  </div>

                  {/* Active Business Banner */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[9px] font-bold uppercase text-teal-400 tracking-wider block">
                      Active Store
                    </span>
                    <span className="text-sm font-black text-white block">
                      Al-Madina Kiryana
                    </span>
                    <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-[9px] text-slate-400 block">Today's Sales</span>
                        <span className="text-base font-extrabold text-white font-mono">Rs. 94,800</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 block">Net Profit</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">+Rs. 23,450</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Quick Action Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="p-2 rounded-xl bg-[#0F766E] text-white text-[10px] font-bold">
                      + Sale
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800 text-teal-300 text-[10px] font-bold border border-slate-700">
                      + Udhaar
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700">
                      + Expense
                    </div>
                  </div>

                  {/* Customer Udhaar Card */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Ali Ahmed</span>
                      <span className="text-xs font-extrabold text-amber-400 font-mono">Rs. 3,200 Due</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Grocery (Flour, Oil, Biscuits)</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9px] text-slate-500">Last: 07 Oct 2026</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold flex items-center gap-1">
                        <MessageCircle className="w-2.5 h-2.5" /> Send WhatsApp
                      </span>
                    </div>
                  </div>

                  {/* Low Stock Warning */}
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-300 block">Low Stock Alert</span>
                      <span className="text-[9px] text-slate-300">Coca Cola 1.5L (6 left)</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-400 font-mono">Order 24</span>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 11: SECURITY & GUARANTEED DATA PRIVACY */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-[#0B1F33] text-white border-b border-slate-800 relative overflow-hidden">
        {/* Subtle background tech rings */}
        <div className="absolute inset-0 bg-[radial-gradient(#0F766E20_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>Section 11 · Security & Privacy Commitment</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Your business data stays <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-cyan-300 animate-text-shimmer">
                completely separate.
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              We know your customer lists, profit margins, and supplier pricing are confidential. SHAFAF HISAB is engineered with complete tenancy isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Strict Tenancy Partitioning</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Account A (Kiryana) can NEVER query or view Account B (E-commerce) records. Every customer, product, and transaction is keyed to a dedicated business workspace ID.
              </p>
              <div className="pt-2 text-[10px] font-mono text-emerald-400 font-bold">
                ✓ Zero cross-tenant data leaks
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Multi-Business on One Phone</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If your phone operates both a physical shop and an online store, switching workspaces instantly purges the previous business state from the UI and recalculates only the active workspace.
              </p>
              <div className="pt-2 text-[10px] font-mono text-emerald-400 font-bold">
                ✓ Instant state purge & reload
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Isolated Demo Sandboxes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exploratory demo visitors run in isolated sandbox environments. Demo data NEVER enters or pollutes a registered merchant’s production database.
              </p>
              <div className="pt-2 text-[10px] font-mono text-emerald-400 font-bold">
                ✓ Sandbox barrier enforced
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 12: FINAL HIGH-CONVERTING CTA */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0C2340] via-[#091B33] to-[#0C2340] text-white text-center relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Start Free · No Credit Card Required</span>
          </div>

          {/* User Exact Headline: "Your business. Your numbers. Your control." */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Your business. <br />
            Your numbers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-cyan-300 animate-text-shimmer">
              Your control.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses managing counter sales, customer udhaar, inventory, and net profit with SHAFAF HISAB.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-base font-extrabold shadow-xl shadow-teal-950/60 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-slate-200 text-base font-bold transition-all cursor-pointer backdrop-blur-sm"
            >
              <span>Explore Interactive Demo</span>
            </button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span>✓ 2-Minute Setup</span>
            <span>✓ 100% Data Isolation</span>
            <span>✓ Real Downloadable PDFs</span>
            <span>✓ Multi-Branch Ready</span>
          </div>
        </div>
      </section>
    </div>
  );
};
