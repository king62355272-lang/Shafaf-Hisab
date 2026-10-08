import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  MessageCircle,
  FileSpreadsheet,
  PlusCircle,
  CheckCircle,
  Phone,
  AlertCircle,
  Eye,
  CreditCard,
  Send,
  User,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Customer } from '../../../types';

interface CustomersKhataViewProps {
  onAddCustomer: () => void;
  onOpenStatement: (cust: Customer) => void;
  onOpenCustomerProfile?: (cust: Customer) => void;
  onAddUdhaarQuick: (cust: Customer) => void;
  onReceivePaymentQuick: (cust: Customer) => void;
}

export const CustomersKhataView: React.FC<CustomersKhataViewProps> = ({
  onAddCustomer,
  onOpenStatement,
  onOpenCustomerProfile,
  onAddUdhaarQuick,
  onReceivePaymentQuick,
}) => {
  const { customers, currentBusiness } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDueOnly, setFilterDueOnly] = useState(false);

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.city && c.city.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchDue = filterDueOnly ? c.currentBalance > 0 : true;
    return matchSearch && matchDue;
  });

  const totalOutstanding = customers.reduce((acc, c) => acc + Math.max(0, c.currentBalance), 0);

  const handleWhatsApp = (cust: Customer, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const text = `Assalam-o-Alaikum ${cust.name} sahib! Your outstanding balance with ${currentBusiness.name} is Rs. ${cust.currentBalance.toLocaleString()} Due. Please contact us at ${currentBusiness.phone} for payment.`;
    window.open(`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCardClick = (cust: Customer) => {
    if (onOpenCustomerProfile) {
      onOpenCustomerProfile(cust);
    } else {
      onOpenStatement(cust);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Customer Khata &amp; Ledger Directory</h2>
          <p className="text-xs text-slate-500">
            Automated customer ledgers, credit limits, and transparent WhatsApp balance reminders for {currentBusiness.name}.
          </p>
        </div>

        <button
          onClick={onAddCustomer}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add Customer</span>
        </button>
      </div>

      {/* Obvious Workflow Navigation Banner (Section 8) */}
      <div className="bg-gradient-to-r from-[#0C2340] to-slate-800 p-3.5 rounded-2xl text-white shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-teal-300 font-bold uppercase tracking-wider text-[10px]">
            <span>AUTOMATED LEDGER WORKFLOW:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-200">
            <span className="font-semibold text-white">Customers</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-teal-200">Select Customer</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-emerald-300 font-bold">Profile &amp; Ledger</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-amber-300 font-bold">Total Credit</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-emerald-300 font-bold">Total Paid</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-white font-extrabold bg-teal-600 px-2 py-0.5 rounded-md">Remaining Balance</span>
          </div>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block">Total Customer Directory</span>
          <span className="text-2xl font-bold font-mono-numbers text-[#0B1F33]">
            {customers.length} Accounts
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            Belonging strictly to {currentBusiness.name}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-2xs">
          <span className="text-xs text-amber-800 font-semibold block">Total Outstanding Udhaar</span>
          <span className="text-2xl font-bold font-mono-numbers text-amber-600">
            Rs. {totalOutstanding.toLocaleString()} Due
          </span>
          <span className="text-[11px] text-amber-700 block mt-1">
            Active credit balance across customers
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block">Active Credit Accounts</span>
          <span className="text-2xl font-bold font-mono-numbers text-[#0B1F33]">
            {customers.filter((c) => c.currentBalance > 0).length} of {customers.length}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            {customers.filter((c) => c.currentBalance === 0).length} accounts fully settled
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search customer by name, phone or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F766E]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer self-start sm:self-auto">
          <input
            type="checkbox"
            checked={filterDueOnly}
            onChange={(e) => setFilterDueOnly(e.target.checked)}
            className="rounded text-[#0F766E] focus:ring-[#0F766E]"
          />
          <span>Show Outstanding Udhaar Only</span>
        </label>
      </div>

      {/* Customer Cards Grid / Responsive List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cust) => (
          <div
            key={cust.id}
            onClick={() => handleCardClick(cust)}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-teal-500/60 hover:shadow-md transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                      {cust.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono-numbers mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{cust.phone}</span>
                    {cust.city && <span className="truncate">· {cust.city}</span>}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-sm font-extrabold font-mono-numbers block ${
                      cust.currentBalance > 0 ? 'text-amber-600' : 'text-emerald-600'
                    }`}
                  >
                    {cust.currentBalance > 0
                      ? `Rs. ${cust.currentBalance.toLocaleString()} Due`
                      : 'Settled (Rs. 0)'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono-numbers">
                    Limit: Rs. {cust.creditLimit.toLocaleString()}
                  </span>
                </div>
              </div>

              {cust.notes && (
                <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3 line-clamp-2">
                  {cust.notes}
                </p>
              )}

              {/* Status indicator */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pb-3 border-b border-slate-100">
                <span>Last transaction: <strong>{cust.lastTransactionDate || 'Recent'}</strong></span>
                <span className="text-teal-700 font-semibold group-hover:underline flex items-center gap-0.5">
                  View Profile &amp; Khata →
                </span>
              </div>
            </div>

            {/* Clear Action Buttons matching Section 8 requirements */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(cust);
                }}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                title="View Customer Khata & Ledger"
              >
                <Eye className="w-3.5 h-3.5 text-slate-600" />
                <span>View Khata</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddUdhaarQuick(cust);
                }}
                className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                title="Add Credit / Udhaar"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>+ Credit</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReceivePaymentQuick(cust);
                }}
                className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                title="Add Payment"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>+ Payment</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleWhatsApp(cust, e)}
                className="py-1.5 px-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                title="Send Reminder on WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Reminder</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <p className="text-sm font-semibold">No customers found matching your criteria in {currentBusiness.name}.</p>
          <button
            onClick={onAddCustomer}
            className="mt-3 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add First Customer to {currentBusiness.name}</span>
          </button>
        </div>
      )}
    </div>
  );
};
