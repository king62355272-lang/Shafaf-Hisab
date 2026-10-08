import React, { useState } from 'react';
import { Receipt, PlusCircle, Filter, PieChart } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface ExpensesViewProps {
  onAddExpense: () => void;
}

export const ExpensesView: React.FC<ExpensesViewProps> = ({ onAddExpense }) => {
  const { expenses } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Rent',
    'Salaries',
    'Transport',
    'Advertising',
    'Electricity & Utilities',
    'Packaging',
    'Supplies',
    'Other',
  ];

  const filtered = expenses.filter(
    (e) => selectedCategory === 'all' || e.category === selectedCategory
  );

  const totalExpense = filtered.reduce((acc, e) => acc + e.amount, 0);

  // Group by category for visual breakdown
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Operating Expenses</h2>
          <p className="text-xs text-slate-500">
            Log and audit all commercial expenditures to ensure 100% accurate net profit calculation.
          </p>
        </div>

        <button
          onClick={onAddExpense}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Log Expense</span>
        </button>
      </div>

      {/* Category Spending Waterfall */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Expense Category Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(categoryTotals).map(([cat, amt]) => (
            <div key={cat} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-500 block truncate">{cat}</span>
              <span className="text-base font-bold font-mono-numbers text-slate-900 mt-0.5 block">
                Rs. {amt.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === c
                ? 'bg-[#0B1F33] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c === 'all' ? 'All Categories' : c}
          </button>
        ))}
      </div>

      {/* Expense Entries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700">Expense Logs ({filtered.length})</span>
          <span className="font-bold text-rose-700 font-mono-numbers">
            Filtered Spending: Rs. {totalExpense.toLocaleString()}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{exp.title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {exp.category}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono-numbers mt-0.5 flex items-center gap-2">
                  <span>{exp.date}</span>
                  <span>· Paid via {exp.paidVia}</span>
                  {exp.receiptNote && <span>· {exp.receiptNote}</span>}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-sm font-bold font-mono-numbers text-rose-600 block">
                  Rs. {exp.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
