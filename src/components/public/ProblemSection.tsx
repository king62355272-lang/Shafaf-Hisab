import React from 'react';
import {
  BookX,
  MessageSquareX,
  FileSpreadsheet,
  Calculator,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Lock,
} from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const oldProblems = [
    {
      icon: BookX,
      title: 'Scattered Notebooks',
      desc: 'Torn pages, water-stained registers, and illegible handwriting with zero cloud backup.',
    },
    {
      icon: MessageSquareX,
      title: 'WhatsApp Messages',
      desc: 'Credit requests, verbal promises, and payment slips buried under hundreds of personal chats.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Complex Spreadsheets',
      desc: 'Clunky Excel sheets that crash on phones and require formula expertise to maintain.',
    },
    {
      icon: Calculator,
      title: 'Manual Calculations',
      desc: 'Human arithmetic mistakes that quietly erode monthly margins and cause customer disputes.',
    },
    {
      icon: HelpCircle,
      title: 'Forgotten Payments',
      desc: 'Thousands in uncollected udhaar balances because no one remembered who owed what.',
    },
  ];

  const shafafSolutions = [
    {
      title: 'Single Organized System',
      desc: 'All counter sales, customer ledgers, inventory, and profit calculated automatically in real time.',
    },
    {
      title: 'Automated Udhaar & Statements',
      desc: 'Running balances update instantly with 1-tap WhatsApp reminders and downloadable PDF statements.',
    },
    {
      title: '100% Data Isolation',
      desc: 'Every business account operates in a completely isolated workspace with zero shared data leakage.',
    },
    {
      title: 'True Net Take-Home Profit',
      desc: 'Instantly view real profit after product cost, delivery freight, and business operating overheads.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>The Reality of Traditional Accounting</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight">
            Stop running your business on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-600 to-rose-700 animate-text-shimmer">
              paper slips, memory and spreadsheets.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            When your business data is scattered across registers, WhatsApp, and spreadsheets, mistakes are inevitable. SHAFAF HISAB unifies everything into one clean system.
          </p>
        </div>

        {/* Visual Transformation Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left: The Old Way (Red / Gray Chaotic) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-rose-200 shadow-lg shadow-rose-950/5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <span className="text-xs font-black uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                The Fragmented Old Way
              </span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                High Error Rate
              </span>
            </div>

            <div className="space-y-4 my-6">
              {oldProblems.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-rose-100 text-[11px] text-rose-600 font-semibold text-center">
              Result: Lost profits, forgotten customer debts & stress
            </div>
          </div>

          {/* Center Connector / Transition */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-4">
            <div className="w-12 h-12 rounded-full bg-[#0F766E] text-white flex items-center justify-center shadow-lg shadow-teal-900/30">
              <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
            </div>
            <span className="text-xs font-black uppercase text-[#0F766E] tracking-wider mt-2">
              Transform Into
            </span>
          </div>

          {/* Right: The SHAFAF HISAB Way (Teal / Navy Organized) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1F33] via-[#0E2841] to-[#0B1F33] text-white border border-teal-500/30 shadow-2xl shadow-teal-950/40 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SHAFAF HISAB
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                100% Organised
              </span>
            </div>

            <div className="space-y-4 my-6">
              {shafafSolutions.map((s, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{s.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Guaranteed Isolation
              </span>
              <span className="font-mono text-teal-300">Peace of Mind</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
