import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: 'Starter Business',
      tagline: 'For single store counters, freelancers & early retailers',
      price: 'Free',
      period: '14-day full trial, then Rs. 1,499/mo',
      highlighted: false,
      features: [
        'Single branch & 2 staff accounts',
        'Sales, Orders & Customer Udhaar ledger',
        'Direct WhatsApp balance reminders',
        'Inventory tracking & low stock alerts',
        'Standard P&L, Sales & Expense reports',
        'Basic receipt printing',
      ],
      buttonText: 'Start 14-Day Free Trial',
    },
    {
      name: 'Growth Professional',
      tagline: 'For expanding retail, garments, shoes & e-commerce brands',
      price: 'Rs. 3,499',
      period: 'per month · Billed annually',
      highlighted: true,
      features: [
        'Up to 3 branches included',
        'Unlimited staff with role permissions',
        'E-commerce order pipeline & COD tracking',
        'Full Net Profit calculator (after ads & shipping)',
        'Size, color & variant inventory matrix',
        'All 10 downloadable PDF & CSV reports',
        'Priority WhatsApp & phone support',
      ],
      buttonText: 'Get Started with Growth',
    },
    {
      name: 'Multi-Branch Enterprise',
      tagline: 'For large showrooms, wholesalers & regional chains',
      price: 'Rs. 7,999',
      period: 'per month · Custom terms available',
      highlighted: false,
      features: [
        'Unlimited branch locations',
        'Branch-wise consolidated & isolated P&L',
        'Wholesale bulk pricing & tier limits',
        'Custom invoice layouts with brand watermarks',
        'Granular employee audit trail & logs',
        'Dedicated onboarding manager',
        'Automated cloud data backups',
      ],
      buttonText: 'Contact Enterprise Sales',
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span>Predictable Investment</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight [text-wrap:balance]">
            Transparent pricing for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 animate-text-shimmer">
              serious, growing businesses.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed [text-wrap:balance]">
            No surprise add-ons. No hidden commission on your turnover. Test every feature free for 14 days.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all ${
                p.highlighted
                  ? 'bg-[#0B1F33] text-white ring-2 ring-[#0F766E] shadow-xl relative'
                  : 'bg-[#F8FAFC] text-slate-900 border border-slate-200'
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0F766E] text-white text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div>
                <h3 className={`text-xl font-bold ${p.highlighted ? 'text-white' : 'text-[#0B1F33]'}`}>
                  {p.name}
                </h3>
                <p className={`text-xs mt-1 min-h-[32px] ${p.highlighted ? 'text-slate-300' : 'text-slate-500'}`}>
                  {p.tagline}
                </p>

                <div className="mt-6 mb-6 pb-6 border-b border-slate-200/20">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono-numbers">
                      {p.price}
                    </span>
                  </div>
                  <span className={`text-xs ${p.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                    {p.period}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className={`text-xs font-bold uppercase tracking-wider block ${p.highlighted ? 'text-emerald-400' : 'text-slate-400'}`}>
                    What is included:
                  </span>
                  {p.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.highlighted ? 'text-emerald-400' : 'text-[#0F766E]'}`} />
                      <span className={p.highlighted ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(p.name)}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  p.highlighted
                    ? 'bg-[#0F766E] hover:bg-[#115E59] text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-[#0B1F33] border border-slate-300'
                }`}
              >
                {p.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
