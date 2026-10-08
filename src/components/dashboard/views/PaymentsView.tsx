import React, { useState } from 'react';
import { CreditCard, PlusCircle, ArrowDownLeft, Search } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface PaymentsViewProps {
  onReceivePayment: () => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({ onReceivePayment }) => {
  const { transactions } = useApp();
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const payments = transactions.filter((t) => t.type === 'payment');

  const filtered = payments.filter(
    (p) => methodFilter === 'all' || p.paymentMethod === methodFilter
  );

  const totalCollected = filtered.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Payments & Settlements</h2>
          <p className="text-xs text-slate-500">
            Omnichannel payment collections logged across Cash, Bank, Easypaisa, and JazzCash.
          </p>
        </div>

        <button
          onClick={onReceivePayment}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Receive Payment</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['all', 'Cash', 'Bank', 'Easypaisa', 'JazzCash'].map((m) => (
          <button
            key={m}
            onClick={() => setMethodFilter(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              methodFilter === m
                ? 'bg-[#0B1F33] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {m === 'all' ? 'All Payment Rails' : m}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700">Payment Inflows ({filtered.length})</span>
          <span className="font-bold text-emerald-700 font-mono-numbers">
            Total Settled: Rs. {totalCollected.toLocaleString()}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No payments recorded under this filter.
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ArrowDownLeft className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {p.customerName || 'Direct Payment'}
                    </h4>
                    <p className="text-[11px] text-slate-500">{p.description}</p>
                    <span className="text-[10px] text-slate-400 font-mono-numbers">{p.date}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-sm font-extrabold font-mono-numbers text-emerald-700 block">
                    +Rs. {p.amount.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 inline-block mt-0.5">
                    {p.paymentMethod}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
