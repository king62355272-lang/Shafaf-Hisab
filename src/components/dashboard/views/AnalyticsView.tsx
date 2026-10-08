import React, { useState } from 'react';
import {
  TrendingUp,
  Receipt,
  Wallet,
  ShoppingBag,
  Percent,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { currentBusiness } = useApp();
  const [period, setPeriod] = useState<'today' | '7days' | 'month' | 'last_month' | 'custom'>('month');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Analytics & Performance</h2>
          <p className="text-xs text-slate-500">
            Comprehensive business performance insights, margins, and sales trends.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl shadow-2xs self-start sm:self-auto">
          {(['today', '7days', 'month', 'last_month', 'custom'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize cursor-pointer ${
                period === p
                  ? 'bg-[#0B1F33] text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {p === '7days' ? '7 Days' : p.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Primary 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Gross Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-[#0B1F33]">
            Rs. 2,450,000
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last period
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Operating Expenses</span>
            <Receipt className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-slate-900">
            Rs. 512,000
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            20.8% of Gross Revenue
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-300 bg-emerald-50/20 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-emerald-800 mb-1">
            <span>Calculated Net Profit</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-emerald-700">
            Rs. 839,300
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-bold">
            34.2% Net Margin
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Average Order Value</span>
            <CreditCard className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-slate-900">
            Rs. 718
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            3,410 customer purchases
          </div>
        </div>
      </div>

      {/* Visual Chart Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#0B1F33]">Weekly Revenue & Net Margin Trend</h3>
              <p className="text-xs text-slate-500">Comparison of weekly sales velocity and operational overhead</p>
            </div>
            <span className="text-xs text-emerald-700 font-semibold font-mono-numbers bg-emerald-50 px-2.5 py-1 rounded-md">
              Target: &gt;30% Margin
            </span>
          </div>

          <div className="h-60 w-full pt-4 relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
              <line x1="0" y1="45" x2="500" y2="45" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="135" x2="500" y2="135" stroke="#f1f5f9" strokeWidth="1" />

              {/* Weekly bar pairs */}
              {[
                { x: 50, rev: 140, exp: 40, label: 'Wk 1' },
                { x: 150, rev: 160, exp: 45, label: 'Wk 2' },
                { x: 250, rev: 135, exp: 42, label: 'Wk 3' },
                { x: 350, rev: 175, exp: 50, label: 'Wk 4' },
                { x: 450, rev: 155, exp: 44, label: 'Wk 5' },
              ].map((bar, i) => (
                <g key={i}>
                  <rect
                    x={bar.x - 24}
                    y={180 - bar.rev}
                    width={20}
                    height={bar.rev}
                    rx={3}
                    fill="#0F766E"
                  />
                  <rect
                    x={bar.x}
                    y={180 - bar.exp}
                    width={20}
                    height={bar.exp}
                    rx={3}
                    fill="#F43F5E"
                  />
                  <text
                    x={bar.x - 4}
                    y={175}
                    fontSize="11"
                    fontFamily="monospace"
                    fill="#94a3b8"
                    textAnchor="middle"
                  >
                    {bar.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#0F766E]" /> Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#F43F5E]" /> Overhead
              </span>
            </div>
            <span>Consolidated multi-branch overview</span>
          </div>
        </div>

        {/* Right Distribution Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold text-[#0B1F33]">Payment Rails Share</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Cash Drawer</span>
                <span className="font-mono-numbers font-bold text-slate-800">62% (Rs. 1,519k)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0F766E] h-full w-[62%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Direct Bank Transfer</span>
                <span className="font-mono-numbers font-bold text-slate-800">22% (Rs. 539k)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full w-[22%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Easypaisa & JazzCash</span>
                <span className="font-mono-numbers font-bold text-slate-800">16% (Rs. 392k)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[16%]" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[11px] font-bold text-slate-700 block mb-0.5">Customer Retention</span>
              <span className="text-xs text-slate-600 leading-tight block">
                74% of revenue this month was generated by repeat accounts.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
