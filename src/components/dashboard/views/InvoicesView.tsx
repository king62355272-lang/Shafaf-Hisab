import React, { useState } from 'react';
import { FileText, PlusCircle, Printer, MessageCircle, Eye } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Invoice } from '../../../types';

interface InvoicesViewProps {
  onNewSale: () => void;
  onOpenInvoice: (inv: Invoice) => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({ onNewSale, onOpenInvoice }) => {
  const { invoices } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = invoices.filter(
    (inv) => statusFilter === 'all' || inv.status === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Invoices & Receipts</h2>
          <p className="text-xs text-slate-500">
            Professional branded bills and customer payment receipts with SHAFAF HISAB watermarks.
          </p>
        </div>

        <button
          onClick={onNewSale}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Generate Invoice</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['all', 'paid', 'partial', 'unpaid', 'overdue'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer uppercase transition-colors ${
              statusFilter === st
                ? 'bg-[#0B1F33] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {st === 'all' ? 'All Invoices' : st}
          </button>
        ))}
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((inv) => (
            <div
              key={inv.id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 font-mono-numbers">
                      {inv.invoiceNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        inv.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inv.status === 'partial'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-700 mt-1">{inv.customerName}</h4>
                  <div className="text-[11px] text-slate-400 font-mono-numbers mt-0.5">
                    Issued: {inv.date} · Due: {inv.dueDate}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="text-left sm:text-right font-mono-numbers">
                  <span className="text-sm font-bold text-slate-900 block">
                    Rs. {inv.total.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Paid: Rs. {inv.paidAmount.toLocaleString()} · Due: Rs. {inv.balanceDue.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onOpenInvoice(inv)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-[#0F766E] hover:text-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View & Print</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
