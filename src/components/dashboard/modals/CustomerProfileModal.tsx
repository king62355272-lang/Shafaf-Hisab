import React from 'react';
import {
  X,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  PlusCircle,
  CheckCircle,
  MessageCircle,
  FileSpreadsheet,
  Download,
  Printer,
  History,
  TrendingUp,
  AlertCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Customer, Transaction } from '../../../types';
import { useApp } from '../../../context/AppContext';
import { downloadCustomerStatementPDF } from '../../../utils/pdfGenerator';

interface CustomerProfileModalProps {
  customer: Customer | null;
  onClose: () => void;
  onAddCredit: (cust: Customer) => void;
  onAddPayment: (cust: Customer) => void;
  onOpenStatementPDF: (cust: Customer) => void;
}

export const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({
  customer,
  onClose,
  onAddCredit,
  onAddPayment,
  onOpenStatementPDF,
}) => {
  const { currentBusiness, transactions, showToast } = useApp();

  if (!customer) return null;

  // STRICT DATA ISOLATION: Filter transactions matching both customer ID and businessId
  const customerTxs = transactions.filter(
    (t) =>
      t.businessId === currentBusiness.id &&
      (t.customerId === customer.id || t.customerName === customer.name)
  );

  // Precise calculations
  const totalCreditGiven = customerTxs
    .filter((t) => t.type === 'udhaar' || t.type === 'sale')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalPaid = customerTxs
    .filter((t) => t.type === 'payment')
    .reduce((acc, t) => acc + t.amount, 0);

  const remainingBalance = customer.currentBalance;

  const handleWhatsApp = () => {
    const text = `Assalam-o-Alaikum ${customer.name} sahib!\n\nYour khata summary with ${currentBusiness.name}:\n• Total Credit Purchased: Rs. ${totalCreditGiven.toLocaleString()}\n• Total Amount Paid: Rs. ${totalPaid.toLocaleString()}\n• Remaining Balance Due: Rs. ${remainingBalance.toLocaleString()}\n\nFor payment queries, please reach us at ${currentBusiness.phone}. Shukriya!`;
    const cleanPhone = customer.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
    showToast(`WhatsApp reminder prepared for ${customer.name}`);
  };

  const handleDownloadPDF = () => {
    try {
      showToast(`Generating statement PDF for ${customer.name}...`);
      downloadCustomerStatementPDF(customer, transactions, currentBusiness);
      showToast(`Downloaded statement PDF for ${customer.name}`);
    } catch {
      showToast('Error generating PDF statement. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0C2340] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-base">
              {customer.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">{customer.name}</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    remainingBalance > 0
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {remainingBalance > 0 ? 'Khata Active · Balance Due' : 'Account Settled'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Customer Profile &amp; Isolated Ledger · {currentBusiness.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onAddCredit(customer)}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add Credit / Udhaar</span>
            </button>

            <button
              onClick={() => onAddPayment(customer)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>+ Receive Payment</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Send WhatsApp Reminder</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-teal-700" />
              <span>Download PDF Statement</span>
            </button>
          </div>
        </div>

        {/* Modal Interior Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Top Customer Info & Credit Limit Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Contact &amp; Location
              </span>
              <div className="mt-1 flex items-center gap-2 text-xs font-bold text-slate-800 font-mono-numbers">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{customer.phone}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{customer.city || currentBusiness.city || 'Pakistan'}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Credit Limit Allocated
              </span>
              <span className="text-base font-bold font-mono-numbers text-slate-800 block mt-1">
                Rs. {customer.creditLimit.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 block">
                Available credit:{' '}
                <strong className="text-emerald-700 font-mono-numbers">
                  Rs. {Math.max(0, customer.creditLimit - remainingBalance).toLocaleString()}
                </strong>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Last Activity
              </span>
              <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{customer.lastTransactionDate || 'Recent'}</span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Workspace ID: {customer.businessId}
              </span>
            </div>
          </div>

          {/* Workflow Stats Strip matching Section 8: Total Credit -> Total Paid -> Remaining Balance */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0C2340] text-white shadow-sm">
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-3">
              KHATA WORKFLOW &amp; LEDGER RECONCILIATION
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-xs text-slate-300 block">1. Total Credit Taken</span>
                <span className="text-xl sm:text-2xl font-black font-mono-numbers text-amber-400 mt-0.5 block">
                  Rs. {totalCreditGiven.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Sum of all goods bought on credit
                </span>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-xs text-slate-300 block">2. Total Paid / Settled</span>
                <span className="text-xl sm:text-2xl font-black font-mono-numbers text-emerald-400 mt-0.5 block">
                  Rs. {totalPaid.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Cash, bank &amp; mobile wasool
                </span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-teal-500/40">
                <span className="text-xs text-teal-300 block font-bold">3. Remaining Balance</span>
                <span
                  className={`text-xl sm:text-2xl font-black font-mono-numbers mt-0.5 block ${
                    remainingBalance > 0 ? 'text-amber-400' : 'text-emerald-300'
                  }`}
                >
                  Rs. {remainingBalance.toLocaleString()} {remainingBalance > 0 ? 'Due' : 'Clear'}
                </span>
                <span className="text-[10px] text-teal-200 block mt-0.5">
                  Net receivable balance
                </span>
              </div>
            </div>
          </div>

          {/* Customer Internal Notes if any */}
          {customer.notes && (
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Customer Notes:</strong> {customer.notes}
              </div>
            </div>
          )}

          {/* Ledger Transactions Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#0F766E]" />
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Transaction Ledger History ({customerTxs.length})
                </h4>
              </div>
              <span className="text-[11px] text-slate-500">
                Isolated Workspace: {currentBusiness.name}
              </span>
            </div>

            {customerTxs.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No ledger transactions recorded yet for this customer in {currentBusiness.name}.
                <div className="mt-2">
                  <button
                    onClick={() => onAddCredit(customer)}
                    className="text-xs text-[#0F766E] font-bold hover:underline"
                  >
                    + Record First Credit Entry
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3">Payment Rail</th>
                      <th className="py-2.5 px-3 text-right">Debit (+Credit)</th>
                      <th className="py-2.5 px-3 text-right">Credit (-Paid)</th>
                      <th className="py-2.5 px-3 text-right">Running Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono-numbers">
                    {customerTxs.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-slate-500 font-sans whitespace-nowrap">
                          {tx.date}
                        </td>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                          {tx.description}
                        </td>
                        <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">
                          {tx.paymentMethod}
                        </td>
                        <td className="py-2.5 px-3 text-right text-amber-600 font-bold whitespace-nowrap">
                          {tx.type === 'udhaar' || tx.type === 'sale'
                            ? `+Rs. ${tx.amount.toLocaleString()}`
                            : '—'}
                        </td>
                        <td className="py-2.5 px-3 text-right text-emerald-600 font-bold whitespace-nowrap">
                          {tx.type === 'payment'
                            ? `-Rs. ${tx.amount.toLocaleString()}`
                            : '—'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-slate-900 whitespace-nowrap">
                          Rs. {(tx.balanceAfter ?? remainingBalance).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Audited SHAFAF HISAB Customer Ledger Engine</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
