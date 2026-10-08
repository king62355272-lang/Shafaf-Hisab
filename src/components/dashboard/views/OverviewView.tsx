import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Receipt,
  Wallet,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ArrowDownLeft,
  Briefcase,
  Boxes,
  Truck,
  PlusCircle,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Customer, Invoice } from '../../../types';

interface OverviewViewProps {
  onQuickAdd: (tab: any) => void;
  onOpenStatement: (cust: Customer) => void;
  onOpenInvoice: (inv: Invoice) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onQuickAdd,
  onOpenStatement,
  onOpenInvoice,
}) => {
  const {
    currentBusiness,
    customers,
    transactions,
    products,
    orders,
    expenses,
    invoices,
    insights,
    globalSearch,
    setActiveView,
  } = useApp();

  // Low stock products
  const lowStockItems = products.filter((p) => p.stockQuantity <= p.minStockThreshold);

  // Outstanding customers (with balance > 0)
  const outstandingCustomers = customers.filter((c) => c.currentBalance > 0);
  const totalCustomerDue = outstandingCustomers.reduce((acc, c) => acc + c.currentBalance, 0);

  // Business-specific KPI calculations
  const isEcommerce = currentBusiness.type === 'ecommerce';
  const isFreelancer = currentBusiness.type === 'freelancer';
  const isGarments = currentBusiness.type === 'garments';

  // Sample or calculated metrics
  const todaySales = isEcommerce ? 485000 : 84500;
  const todayOrders = isEcommerce ? 128 : 126;
  const todayExpenses = isEcommerce ? 91000 : 18200;
  const todayProfit = isEcommerce ? 119000 : 32850;

  // Filtered recent transactions if search query is active
  const filteredTransactions = transactions.filter((t) => {
    if (!globalSearch) return true;
    return (
      t.description.toLowerCase().includes(globalSearch.toLowerCase()) ||
      (t.customerName && t.customerName.toLowerCase().includes(globalSearch.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Welcome / Sector Priority Alert */}
      <div className="bg-gradient-to-r from-[#0B1F33] to-[#0F766E] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
            <span>{currentBusiness.type.toUpperCase()} WORKSPACE</span>
            <span>·</span>
            <span>{currentBusiness.branches.find((b) => b.id === currentBusiness.activeBranchId)?.name || 'Main Branch'}</span>
          </div>
          <h2 className="text-2xl font-bold mt-1 tracking-tight">
            Welcome back to {currentBusiness.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
            {isEcommerce
              ? 'Tracking order fulfillment, courier delivery rates, and net take-home profit after ad spend.'
              : isFreelancer
              ? 'Monitoring client retainers, active milestones, and pending project receivables.'
              : 'All sales counters, customer udhaar ledgers, and inventory levels are synchronized.'}
          </p>
        </div>

        {/* Quick Action Ribbon */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onQuickAdd('sale')}
            className="px-3.5 py-2 rounded-xl bg-white text-[#0B1F33] hover:bg-slate-100 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#0F766E]" />
            <span>+ New Sale</span>
          </button>
          <button
            onClick={() => onQuickAdd('payment')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Receive Payment</span>
          </button>
          <button
            onClick={() => onQuickAdd('expense')}
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            <span>+ Expense</span>
          </button>
        </div>
      </div>

      {/* Core 5 KPI Metric Cards (Section 11) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* 1. Today's Sales */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{isFreelancer ? 'Total Invoiced' : "Today's Sales"}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-[#0B1F33]">
            Rs. {todaySales.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.8% vs yesterday</span>
          </div>
        </div>

        {/* 2. Orders / Projects */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{isFreelancer ? 'Active Projects' : 'Total Orders'}</span>
            <ShoppingBag className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-slate-900">
            {todayOrders}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            <span>118 Completed · 8 In transit</span>
          </div>
        </div>

        {/* 3. Customer Due / Udhaar */}
        <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-2xs bg-amber-50/20">
          <div className="flex items-center justify-between text-xs text-amber-800 mb-1">
            <span>Customer Due (Udhaar)</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-amber-600">
            Rs. {totalCustomerDue.toLocaleString()}
          </div>
          <div className="mt-2 text-[11px] text-amber-700 font-semibold">
            <span>{outstandingCustomers.length} accounts with balance</span>
          </div>
        </div>

        {/* 4. Expenses */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Expenses</span>
            <Receipt className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-slate-900">
            Rs. {todayExpenses.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
            <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
            <span>Rent, Staff, Utilities</span>
          </div>
        </div>

        {/* 5. Net Profit */}
        <div className="col-span-2 sm:col-span-1 bg-white rounded-xl p-4 border border-emerald-300 shadow-2xs bg-emerald-50/20">
          <div className="flex items-center justify-between text-xs text-emerald-800 mb-1">
            <span>Calculated Net Profit</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-emerald-700">
            Rs. {todayProfit.toLocaleString()}
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-bold">
            <span>38.8% Profit Margin</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sales Chart + Outstanding Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Chart Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-[#0B1F33]">
                {isEcommerce ? 'E-Commerce Orders & Gross Revenue' : 'Sales Volume & Customer Inflow'}
              </h3>
              <p className="text-xs text-slate-500">Live transaction progression throughout today</p>
            </div>
            <span className="text-xs font-mono-numbers text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md self-start sm:self-auto font-semibold">
              Live Hourly Feed
            </span>
          </div>

          {/* SVG Trendline */}
          <div className="h-52 w-full pt-6 relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradApp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0F766E" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />

              <path
                d="M0 140 Q 60 120, 120 105 T 240 75 T 340 85 T 420 30 L 500 20 L 500 160 L 0 160 Z"
                fill="url(#chartGradApp)"
              />
              <path
                d="M0 140 Q 60 120, 120 105 T 240 75 T 340 85 T 420 30 L 500 20"
                fill="none"
                stroke="#0F766E"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="240" cy="75" r="4" fill="#0F766E" />
              <circle cx="420" cy="30" r="4" fill="#0F766E" />
              <circle cx="500" cy="20" r="4" fill="#0F766E" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-100 font-mono-numbers">
            <span>10:00 AM</span>
            <span>1:00 PM</span>
            <span>4:00 PM</span>
            <span>7:00 PM</span>
            <span>10:00 PM</span>
          </div>
        </div>

        {/* Right Side: Outstanding Udhaar Customers */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#0B1F33] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" />
                Outstanding Customers
              </h3>
              <button
                onClick={() => setActiveView('customers')}
                className="text-xs font-bold text-[#0F766E] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {outstandingCustomers.slice(0, 4).map((c) => (
                <div key={c.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{c.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono-numbers">{c.phone}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold font-mono-numbers text-amber-600 block">
                      Rs. {c.currentBalance.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onOpenStatement(c)}
                      className="text-[10px] text-[#0F766E] font-semibold hover:underline cursor-pointer"
                    >
                      Statement
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 bg-amber-50/50 p-2.5 rounded-lg flex items-center justify-between text-xs">
            <span className="font-medium text-amber-900">Total Uncollected:</span>
            <span className="font-extrabold text-amber-700 font-mono-numbers">
              Rs. {totalCustomerDue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Row: Recent Transactions + Low Stock Alerts + Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#0B1F33]">Recent Transactions</h3>
            <button
              onClick={() => setActiveView('sales')}
              className="text-xs font-bold text-[#0F766E] hover:underline cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {filteredTransactions.slice(0, 4).map((tx) => (
              <div key={tx.id} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      tx.type === 'sale'
                        ? 'bg-emerald-50 text-emerald-600'
                        : tx.type === 'payment'
                        ? 'bg-teal-50 text-[#0F766E]'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {tx.type === 'payment' ? (
                      <ArrowDownLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block truncate max-w-[150px]">
                      {tx.customerName || tx.description}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono-numbers">{tx.date}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-bold font-mono-numbers ${
                      tx.type === 'payment' ? 'text-emerald-700' : 'text-slate-900'
                    }`}
                  >
                    Rs. {tx.amount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block">{tx.paymentMethod}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-rose-700 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Low Stock Warnings
            </h3>
            <span className="text-[11px] font-semibold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200 font-mono-numbers">
              {lowStockItems.length} items
            </span>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {lowStockItems.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">All inventory levels are healthy.</p>
            ) : (
              lowStockItems.map((prod) => (
                <div key={prod.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{prod.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono-numbers">{prod.sku}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold font-mono-numbers text-rose-600 block">
                      {prod.stockQuantity} {prod.unit} left
                    </span>
                    <span className="text-[10px] text-slate-400">Min: {prod.minStockThreshold}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders Pipeline */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#0B1F33]">Recent Orders</h3>
            <button
              onClick={() => setActiveView('orders')}
              className="text-xs font-bold text-[#0F766E] hover:underline cursor-pointer"
            >
              Pipeline
            </button>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {orders.slice(0, 3).map((ord) => (
              <div key={ord.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">{ord.orderNumber}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      {ord.channel}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{ord.customerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold font-mono-numbers text-slate-900 block">
                    Rs. {ord.totalAmount.toLocaleString()}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase ${
                      ord.status === 'shipped'
                        ? 'text-teal-600'
                        : ord.status === 'processing'
                        ? 'text-amber-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
