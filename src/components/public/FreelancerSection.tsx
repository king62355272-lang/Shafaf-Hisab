import React from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const FreelancerSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Explanatory */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#0F766E] animate-pulse" />
              <span>Agencies, Consultants & Services</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight [text-wrap:balance]">
              Not selling products? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 animate-text-shimmer">
                We've got you covered.
              </span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed [text-wrap:balance]">
              Service agencies, software developers, architects, marketing consultants, and graphic designers don't carry physical inventory — but they do have client retainers, milestone payments, pending receivables, and software overhead.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0" />
                <span>Track client projects, milestones & deliverable contracts</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0" />
                <span>Record partial advance retainers and pending completion amounts</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0" />
                <span>Calculate net project profit after contractor payouts & software subscriptions</span>
              </div>
            </div>
          </div>

          {/* Right Service Dashboard Preview - Example: ABC Clothing Project */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
              {/* Top Service Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-xs text-slate-500 block">Active Clients</span>
                  <span className="text-xl font-bold font-mono-numbers text-[#0B1F33]">14</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-xs text-slate-500 block">Live Projects</span>
                  <span className="text-xl font-bold font-mono-numbers text-[#0B1F33]">19</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-xs text-slate-500 block">Total Invoiced</span>
                  <span className="text-xl font-bold font-mono-numbers text-emerald-700">Rs. 640k</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-xs text-slate-500 block">Pending Balance</span>
                  <span className="text-xl font-bold font-mono-numbers text-amber-600">Rs. 185k</span>
                </div>
              </div>

              {/* Exact Example Project Card requested in prompt */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0F766E]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Website Design & Development</h4>
                      <p className="text-xs text-slate-500">Client: <span className="font-semibold text-slate-800">ABC Clothing</span></p>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Milestone 2 In Progress
                  </span>
                </div>

                {/* Financial breakdown */}
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-[11px] text-slate-500 block font-medium">Project Value</span>
                    <span className="text-base sm:text-lg font-bold font-mono-numbers text-slate-900">
                      Rs. 80,000
                    </span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <span className="text-[11px] text-emerald-700 block font-medium">Received (Paid)</span>
                    <span className="text-base sm:text-lg font-bold font-mono-numbers text-emerald-700">
                      Rs. 50,000
                    </span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <span className="text-[11px] text-amber-800 block font-medium">Remaining Due</span>
                    <span className="text-base sm:text-lg font-bold font-mono-numbers text-amber-700">
                      Rs. 30,000
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Payment Collection Status</span>
                    <span className="font-mono-numbers font-semibold text-slate-800">62.5% Received</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#0F766E] h-full w-[62.5%]" />
                  </div>
                </div>

                {/* Project Expenses & Net Profit */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                  <span>Project Expenses: <strong className="font-mono-numbers text-slate-800">Rs. 8,500</strong> (Hosting, Domain, Assets)</span>
                  <span className="text-[#0F766E] font-bold font-mono-numbers flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> Projected Net Profit: Rs. 71,500
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
