import React, { useState } from 'react';
import { PlusCircle, Search, Filter, Printer, FileText, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Invoice } from '../../../types';

interface SalesViewProps {
  onNewSale: () => void;
  onOpenInvoice: (inv: Invoice) => void;
}

export const SalesView: React.FC<SalesViewProps> = ({ onNewSale, onOpenInvoice }) => {
  const { transactions, invoices, currentBusiness } = useApp();
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const sales = transactions.filter((t) => t.type === 'sale' || t.type === 'udhaar');

  const filtered = sales.filter((s) => {
    const matchesMethod = methodFilter === 'all' || s.paymentMethod === methodFilter;
    const matchesSearch =
      !searchTerm ||
      (s.customerName && s.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMethod && matchesSearch;
  });

  const totalSalesVolume = filtered.reduce((acc, s) => acc + s.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Sales & Invoicing</h2>
          <p className="text-xs text-slate-500">Record sales, counter transactions, and generate customer receipts.</p>
        </div>

        <button
          onClick={onNewSale}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Record New Sale</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search sales or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F766E]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Payment Rail:</span>
          {['all', 'Cash', 'Bank', 'Easypaisa', 'JazzCash', 'Credit / Udhaar'].map((m) => (
            <button
              key={m}
              onClick={() => setMethodFilter(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                methodFilter === m
                  ? 'bg-[#0B1F33] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m === 'all' ? 'All Rails' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Sales Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700">Recorded Sales Transactions ({filtered.length})</span>
          <span className="font-bold text-[#0B1F33] font-mono-numbers">
            Total Filtered Volume: Rs. {totalSalesVolume.toLocaleString()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/50">
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Customer / Reference</th>
                <th className="py-3 px-4 text-left">Items / Description</th>
                <th className="py-3 px-4 text-left">Payment Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono-numbers text-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-sans">
                    No sales matching the filter.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => {
                  const inv = invoices.find((i) => i.id === s.invoiceId) || invoices[0];
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{s.date}</td>
                      <td className="py-3 px-4 font-sans font-bold text-slate-900 whitespace-nowrap">
                        {s.customerName || 'Walk-in Counter'}
                      </td>
                      <td className="py-3 px-4 font-sans text-slate-600 max-w-xs truncate">
                        {s.description}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap ${
                            s.paymentMethod === 'Credit / Udhaar'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {s.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 whitespace-nowrap">
                        Rs. {s.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onOpenInvoice(inv)}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-[#0F766E] hover:text-white text-slate-700 text-[11px] font-sans font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          <span>View Invoice</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
