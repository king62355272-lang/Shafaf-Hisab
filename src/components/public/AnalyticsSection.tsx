import React, { useState } from 'react';
import {
  TrendingUp,
  Receipt,
  Wallet,
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';

export const AnalyticsSection: React.FC = () => {
  const [filter, setFilter] = useState<'today' | '7days' | 'month' | 'last_month' | 'custom'>('month');

  // Dynamic datasets based on filter
  const dataset = {
    today: {
      revenue: 84500,
      expenses: 18200,
      profit: 32850,
      orders: 126,
      aov: 670,
      returnRate: '1.2%',
      chartPoints: [
        { time: '10 AM', sales: 12000, exp: 2000 },
        { time: '1 PM', sales: 28000, exp: 6000 },
        { time: '4 PM', sales: 46000, exp: 9000 },
        { time: '7 PM', sales: 71000, exp: 14000 },
        { time: '10 PM', sales: 84500, exp: 18200 },
      ],
    },
    '7days': {
      revenue: 592000,
      expenses: 128000,
      profit: 245000,
      orders: 864,
      aov: 685,
      returnRate: '2.1%',
      chartPoints: [
        { time: 'Mon', sales: 74000, exp: 16000 },
        { time: 'Tue', sales: 81000, exp: 17000 },
        { time: 'Wed', sales: 79000, exp: 15500 },
        { time: 'Thu', sales: 88000, exp: 19000 },
        { time: 'Fri', sales: 94000, exp: 21000 },
        { time: 'Sat', sales: 102000, exp: 22500 },
        { time: 'Sun', sales: 74000, exp: 17000 },
      ],
    },
    month: {
      revenue: 2450000,
      expenses: 512000,
      profit: 1025000,
      orders: 3410,
      aov: 718,
      returnRate: '2.8%',
      chartPoints: [
        { time: 'Week 1', sales: 540000, exp: 110000 },
        { time: 'Week 2', sales: 620000, exp: 125000 },
        { time: 'Week 3', sales: 590000, exp: 130000 },
        { time: 'Week 4', sales: 700000, exp: 147000 },
      ],
    },
    last_month: {
      revenue: 2120000,
      expenses: 480000,
      profit: 890000,
      orders: 2980,
      aov: 711,
      returnRate: '3.1%',
      chartPoints: [
        { time: 'Week 1', sales: 490000, exp: 105000 },
        { time: 'Week 2', sales: 530000, exp: 118000 },
        { time: 'Week 3', sales: 510000, exp: 122000 },
        { time: 'Week 4', sales: 590000, exp: 135000 },
      ],
    },
    custom: {
      revenue: 1180000,
      expenses: 245000,
      profit: 498000,
      orders: 1640,
      aov: 720,
      returnRate: '2.4%',
      chartPoints: [
        { time: 'Period 1', sales: 280000, exp: 60000 },
        { time: 'Period 2', sales: 310000, exp: 62000 },
        { time: 'Period 3', sales: 290000, exp: 59000 },
        { time: 'Period 4', sales: 300000, exp: 64000 },
      ],
    },
  }[filter];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span>Complete Financial Visibility</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight [text-wrap:balance]">
              Your business numbers, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 animate-text-shimmer">
                explained clearly.
              </span>
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-xl">
              Track multi-dimensional metrics across any timeframe without confusing accounting jargon.
            </p>
          </div>

          {/* Interactive Date Range Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs self-start md:self-auto overflow-x-auto max-w-full">
            {(
              [
                { id: 'today', label: 'Today' },
                { id: '7days', label: '7 Days' },
                { id: 'month', label: 'This Month' },
                { id: 'last_month', label: 'Last Month' },
                { id: 'custom', label: 'Custom Date' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  filter === t.id
                    ? 'bg-[#0B1F33] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Metric KPI Cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Revenue</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-numbers text-[#0B1F33]">
              Rs. {dataset.revenue.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" /> Growth trend
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Expenses</span>
              <Receipt className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-numbers text-slate-900">
              Rs. {dataset.expenses.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Operating costs</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-2xs bg-emerald-50/20">
            <div className="flex items-center justify-between text-emerald-800 text-xs mb-1">
              <span>Net Profit</span>
              <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-numbers text-emerald-700">
              Rs. {dataset.profit.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              {Math.round((dataset.profit / dataset.revenue) * 100)}% Margin
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Total Orders</span>
              <ShoppingBag className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-numbers text-slate-900">
              {dataset.orders.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Transactions</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Avg Order Value</span>
              <CreditCard className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-numbers text-slate-900">
              Rs. {dataset.aov}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Per customer</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Return Rate</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono-numbers text-slate-900">
              {dataset.returnRate}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Low return rate</span>
          </div>
        </div>

        {/* Analytics Breakdown Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue vs Expense Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-sm font-bold text-[#0B1F33]">Revenue vs Expenses Comparison</h4>
                <p className="text-xs text-slate-500">Filtered timeframe performance</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[#0F766E]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#0F766E]" /> Revenue
                </span>
                <span className="flex items-center gap-1.5 text-rose-500">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-400" /> Expense
                </span>
              </div>
            </div>

            {/* Responsive Visual Bar Chart */}
            <div className="h-56 flex items-end justify-between gap-4 pt-6 px-2 border-b border-slate-200">
              {dataset.chartPoints.map((pt) => {
                const maxVal = Math.max(...dataset.chartPoints.map((p) => p.sales));
                const revHeight = Math.max(15, (pt.sales / maxVal) * 100);
                const expHeight = Math.max(10, (pt.exp / maxVal) * 100);

                return (
                  <div key={pt.time} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Revenue Bar */}
                      <div
                        style={{ height: `${revHeight}%` }}
                        className="w-1/2 max-w-[28px] bg-[#0F766E] rounded-t-sm transition-all duration-300 relative group-hover:bg-[#115E59]"
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-mono-numbers bg-slate-900 text-white px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
                          Rs. {pt.sales.toLocaleString()}
                        </span>
                      </div>
                      {/* Expense Bar */}
                      <div
                        style={{ height: `${expHeight}%` }}
                        className="w-1/2 max-w-[28px] bg-rose-400 rounded-t-sm transition-all duration-300 relative group-hover:bg-rose-500"
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-mono-numbers bg-slate-900 text-white px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
                          Rs. {pt.exp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono-numbers text-slate-500 mt-2 font-medium">
                      {pt.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Customers & Outstanding Balances */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-[#0B1F33]">Outstanding Receivables</h4>
                <span className="text-xs text-amber-600 font-semibold font-mono-numbers">Rs. 25,950 Due</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Bilal Butt Traders</span>
                    <span className="text-[11px] text-slate-500">Due 12 days ago</span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 font-mono-numbers">Rs. 7,450</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Ali Ahmed</span>
                    <span className="text-[11px] text-slate-500">Due 2 days ago</span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 font-mono-numbers">Rs. 3,200</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Tariq Mehmood</span>
                    <span className="text-[11px] text-slate-500">Narowal Branch</span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 font-mono-numbers">Rs. 1,100</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Payment Rails:</span>
                <span className="text-slate-800 font-medium">Cash (64%) · Bank (24%) · Wallets (12%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
