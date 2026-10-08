import React, { useState } from 'react';
import {
  TrendingUp,
  UserCheck,
  CreditCard,
  Receipt,
  DollarSign,
  FileText,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Download,
  Building,
} from 'lucide-react';

interface HowItWorksProps {
  onGetStarted: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onGetStarted }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const workflowSteps = [
    {
      id: 'step-1',
      num: '01',
      title: 'Record Sale',
      short: 'Sale Entry',
      icon: TrendingUp,
      desc: 'Enter line items with barcodes, quantities, and sale rates in seconds.',
      previewTitle: 'Counter Sale #TX-9021',
      previewDetail: 'Coca Cola 1.5L (x3) + Dalda Oil 5L (x1) = Rs. 3,460',
      tag: 'Step 1: Input',
    },
    {
      id: 'step-2',
      num: '02',
      title: 'Customer / Order',
      short: 'Assign Khata',
      icon: UserCheck,
      desc: 'Link to customer profile for instant ledger entry or dispatch order queue.',
      previewTitle: 'Customer: Ali Ahmed (0300-8451234)',
      previewDetail: 'Previous Balance: Rs. 700 → Added: Rs. 2,500 Udhaar',
      tag: 'Step 2: Scoped Ledger',
    },
    {
      id: 'step-3',
      num: '03',
      title: 'Payment',
      short: 'Cash & Digital',
      icon: CreditCard,
      desc: 'Settle via Cash, Bank, Easypaisa, JazzCash, or partial credit agreement.',
      previewTitle: 'Payment Received: Rs. 1,000 Cash',
      previewDetail: 'Remaining Balance: Rs. 2,200 · Instant WhatsApp receipt sent',
      tag: 'Step 3: Settlement',
    },
    {
      id: 'step-4',
      num: '04',
      title: 'Expense',
      short: 'Log Outflows',
      icon: Receipt,
      desc: 'Log rent, electricity, delivery freight, packaging, or ad campaign spend.',
      previewTitle: 'Daily Operating Outflow',
      previewDetail: 'Rickshaw Transport / Delivery = Rs. 650 logged under Logistics',
      tag: 'Step 4: Cost Ledger',
    },
    {
      id: 'step-5',
      num: '05',
      title: 'Profit',
      short: 'True Margin',
      icon: DollarSign,
      desc: 'System automatically deduces product cost and expenses from revenue.',
      previewTitle: 'Live Net Profit Calculation',
      previewDetail: 'Revenue (Rs. 3,460) - Cost (Rs. 2,600) - Expense (Rs. 650) = Rs. 210 Net',
      tag: 'Step 5: Intelligence',
    },
    {
      id: 'step-6',
      num: '06',
      title: 'Report',
      short: 'Download PDF',
      icon: FileText,
      desc: 'Generate audit-ready P&L statements, customer statements, and tax sheets in 1 tap.',
      previewTitle: 'Official PDF Export Generated',
      previewDetail: 'SHAFAF-HISAB-Financial-Summary-2026.pdf ready for download',
      tag: 'Step 6: Official Document',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#F8FAFC] border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#0F766E] animate-pulse" />
            <span>Automated 6-Step Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight">
            How Every Rupee Moves Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 animate-text-shimmer">
              SHAFAF HISAB.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Record Sale → Customer / Order → Payment → Expense → Profit → Report. Every step connects seamlessly without double data entry.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="mt-12">
          {/* Step Pill Buttons */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0F766E] text-white shadow-md shadow-teal-900/30 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {step.num}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Interactive Showcase Card */}
          <div className="mt-8 max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/60 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Description */}
              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-teal-100 text-[#0F766E] border border-teal-200">
                    {workflowSteps[activeStep].tag}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Step {workflowSteps[activeStep].num} of 06
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0B1F33]">
                  {workflowSteps[activeStep].title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {workflowSteps[activeStep].desc}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % workflowSteps.length)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onGetStarted}
                    className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    Try This Free
                  </button>
                </div>
              </div>

              {/* Right Column: Live Simulated UI Card */}
              <div className="md:col-span-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1F33] to-[#0E2841] text-white shadow-xl border border-slate-700">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                      Live Workflow State
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      Automated Linkage
                    </span>
                  </div>

                  <div className="my-5">
                    <div className="text-sm font-bold text-white">
                      {workflowSteps[activeStep].previewTitle}
                    </div>
                    <div className="text-xs font-mono text-slate-300 mt-2 bg-slate-900/80 p-3 rounded-xl border border-slate-700 leading-relaxed">
                      {workflowSteps[activeStep].previewDetail}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Zero Data Merging
                    </span>
                    <span>No Manual Math</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
