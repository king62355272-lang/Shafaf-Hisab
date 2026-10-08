import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Package,
  Boxes,
  Receipt,
  CreditCard,
  DollarSign,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const modules = [
    {
      id: 'mod-sales',
      title: 'Sales & Invoicing',
      icon: TrendingUp,
      desc: 'Rapid counter checkout, barcode scan support, custom discounts, and instant thermal receipts or PDF invoices.',
      metric: 'Fast POS Entry',
      tag: 'Core Cash Flow',
      example: 'Counter sale settled via Cash/Card in under 5 seconds',
    },
    {
      id: 'mod-customers',
      title: 'Customers & Udhaar Khata',
      icon: Users,
      desc: 'Track customer balances, credit limits, transaction histories, and send 1-tap WhatsApp reminder statements.',
      metric: 'Auto-Balanced',
      tag: 'Credit Protection',
      example: 'Ali Ahmed: Rs. 3,200 Due · Last Paid: 06 Oct',
    },
    {
      id: 'mod-orders',
      title: 'Orders & Dispatch Pipeline',
      icon: Package,
      desc: 'Full lifecycle states: Pending, Processing, Shipped, Delivered, and Returned with courier tracking integrations.',
      metric: 'End-to-End',
      tag: 'Fulfillment',
      example: 'ORD-9481 Shipped via Trax Logistics · Tracking live',
    },
    {
      id: 'mod-inventory',
      title: 'Inventory & Stock Alerts',
      icon: Boxes,
      desc: 'Multi-unit measurements (kg, pcs, boxes), cost vs selling prices, automated low-stock warnings, and reorder levels.',
      metric: 'Zero Outages',
      tag: 'Asset Control',
      example: 'Dalda 5L Tin: 18 left · Low threshold alert triggered',
    },
    {
      id: 'mod-expenses',
      title: 'Operating Expenses',
      icon: Receipt,
      desc: 'Categorize rent, staff wages, freight shipping, marketing ads, electricity, and maintenance to see true overheads.',
      metric: 'Full Audit Trail',
      tag: 'Cost Control',
      example: 'LESCO Electricity: Rs. 9,500 logged under Utilities',
    },
    {
      id: 'mod-payments',
      title: 'Omnichannel Payments',
      icon: CreditCard,
      desc: 'Accept and log Cash, Bank wire, Easypaisa, JazzCash, or split deposits with reference receipts and audit numbers.',
      metric: 'Multi-Rail',
      tag: 'Settlement',
      example: 'Bank Wire / JazzCash settled with auto-reconciliation',
    },
    {
      id: 'mod-profit',
      title: 'True Net Profit Calculation',
      icon: DollarSign,
      desc: 'Never confuse gross cash turnover with real profit. Automatically factors product cost, shipping fees, and overheads.',
      metric: 'Real Margin',
      tag: 'Financial Health',
      example: 'Gross Sales (Rs. 94k) - Cost & Expenses = Rs. 23.4k Net',
    },
    {
      id: 'mod-reports',
      title: 'Audit-Ready Reports & PDFs',
      icon: FileText,
      desc: 'Generate downloadable PDF statements: Sales, P&L, customer ledgers, inventory valuations, and expense audits.',
      metric: 'Instant PDF Export',
      tag: 'Official Records',
      example: 'Clean branded PDF reports downloaded directly in browser',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#0F766E] animate-pulse" />
            <span>Complete Business Ecosystem</span>
          </div>
          {/* User Exact Title: "Everything your business needs. In one place." */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight">
            Everything your business needs. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-500 animate-text-shimmer">
              In one clear place.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Eight interconnected modules working together in real time. Record a sale, and your inventory, customer khata, and profit update automatically.
          </p>
        </div>

        {/* 8 Product Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={m.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isHovered
                    ? 'border-[#0F766E] bg-teal-50/30 shadow-xl shadow-teal-900/5 -translate-y-1'
                    : 'border-slate-200 bg-[#F8FAFC] hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isHovered ? 'bg-[#0F766E] text-white shadow-md' : 'bg-white text-[#0F766E] border border-slate-200 shadow-2xs'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-200/60 text-slate-700">
                      {m.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B1F33] group-hover:text-[#0F766E] transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] font-mono text-slate-700 leading-tight">
                    {m.example}
                  </div>
                  <div className="flex items-center justify-between mt-2.5 text-[11px] font-bold text-[#0F766E]">
                    <span>{m.metric}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
