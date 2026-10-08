import React from 'react';
import {
  TrendingUp,
  AlertCircle,
  Package,
  Award,
  DollarSign,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const SmartInsightsSection: React.FC = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Sales Momentum',
      quote: '“Your sales increased 18% this month.”',
      detail: 'Consistent demand uptick during evening hours. Weekend traffic generated 42% of monthly revenue.',
      type: 'positive',
      tag: '+18% MoM',
      color: 'emerald',
    },
    {
      icon: AlertCircle,
      title: 'Customer Receivables',
      quote: '“5 customers have overdue balances.”',
      detail: 'Automated polite WhatsApp reminders are queued and ready to be dispatched with 1 click.',
      type: 'warning',
      tag: '5 Accounts',
      color: 'amber',
    },
    {
      icon: Package,
      title: 'Inventory Alert',
      quote: '“7 products are below your stock limit.”',
      detail: 'Items like Coca Cola 1.5L and cooking oils will hit zero within 48 hours at current sales velocity.',
      type: 'critical',
      tag: 'Restock Action',
      color: 'rose',
    },
    {
      icon: Award,
      title: 'Fast-Mover Product',
      quote: '“Your best-selling product this month is Coca Cola 1.5L.”',
      detail: 'Delivered Rs. 14,200 in gross margin alone. Consider bundling with snack items for higher basket size.',
      type: 'positive',
      tag: 'Best Seller',
      color: 'teal',
    },
    {
      icon: DollarSign,
      title: 'Expense Audit',
      quote: '“Advertising expenses increased 12%.”',
      detail: 'Meta campaigns drove higher top-of-funnel traffic, but customer acquisition cost rose slightly by Rs. 40.',
      type: 'info',
      tag: '+12% Ad Spend',
      color: 'indigo',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-[#0F766E] border border-emerald-500/20 text-xs font-bold uppercase tracking-wider shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Proactive Business Intelligence</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight [text-wrap:balance]">
            Smart Insights that tell you <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 animate-text-shimmer">
              exactly what to do next.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed [text-wrap:balance]">
            Instead of forcing you to hunt through complex charts, SHAFAF HISAB detects patterns and explains your financial health in plain, actionable language.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        item.color === 'emerald'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.color === 'amber'
                          ? 'bg-amber-100 text-amber-700'
                          : item.color === 'rose'
                          ? 'bg-rose-100 text-rose-700'
                          : item.color === 'teal'
                          ? 'bg-teal-100 text-[#0F766E]'
                          : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold font-mono-numbers text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-500 mb-1">{item.title}</h3>
                  <div className="text-base sm:text-lg font-bold text-[#0B1F33] mb-2 leading-snug">
                    {item.quote}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-[#0F766E]">
                  <span>Actionable Guidance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
