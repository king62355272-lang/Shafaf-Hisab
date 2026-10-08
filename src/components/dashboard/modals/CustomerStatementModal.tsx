import React from 'react';
import { X, Printer, MessageCircle, Download } from 'lucide-react';
import { Customer } from '../../../types';
import { useApp } from '../../../context/AppContext';
import { Logo } from '../../brand/Logo';
import { downloadCustomerStatementPDF } from '../../../utils/pdfGenerator';

interface CustomerStatementModalProps {
  customer: Customer | null;
  onClose: () => void;
}

export const CustomerStatementModal: React.FC<CustomerStatementModalProps> = ({
  customer,
  onClose,
}) => {
  const { currentBusiness, transactions, showToast } = useApp();

  if (!customer) return null;

  // Filter transactions for this customer
  const customerTxs = transactions.filter((t) => t.customerId === customer.id || t.customerName === customer.name);

  const handlePrint = () => {
    window.print();
  };

  const whatsappText = `Assalam-o-Alaikum ${customer.name} sahib! Here is your latest statement from ${currentBusiness.name}. Current Balance: Rs. ${customer.currentBalance.toLocaleString()} Due. For any queries, please reach out to us at ${currentBusiness.phone}.`;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappText)}`, '_blank');
  };

  const handlePDF = () => {
    try {
      showToast(`Generating statement PDF for ${customer.name}...`);
      downloadCustomerStatementPDF(customer, transactions, currentBusiness);
      showToast(`Downloaded SHAFAF-HISAB-${customer.name.replace(/\s+/g, '-')}-Statement.pdf`);
    } catch (err) {
      showToast('Unable to generate the PDF statement. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Top Controls */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400">
              Customer Ledger Statement
            </span>
            <span className="text-xs text-slate-400">· {customer.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsApp}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Send WhatsApp</span>
            </button>
            <button
              onClick={handlePDF}
              className="px-2.5 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Statement Area */}
        <div id="printable-area" className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b-2 border-slate-900 gap-4">
            <div>
              <Logo size="md" variant="dark" />
              <h2 className="text-lg font-bold text-[#0B1F33] mt-2">{currentBusiness.name}</h2>
              <p className="text-xs text-slate-500">{currentBusiness.city} · {currentBusiness.phone}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xl font-black text-[#0B1F33] uppercase">CUSTOMER STATEMENT</span>
              <p className="text-xs text-slate-500 font-mono-numbers mt-1">Generated: {new Date().toLocaleDateString('en-GB')}</p>
            </div>
          </div>

          {/* Account Profile */}
          <div className="py-5 border-b border-slate-200 flex justify-between items-end">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Customer Information:</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{customer.name}</h3>
              <p className="text-xs text-slate-600 font-mono-numbers">{customer.phone} · {customer.city || 'Pakistan'}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block font-medium">Current Outstanding</span>
              <span className="text-xl font-extrabold text-amber-600 font-mono-numbers">
                Rs. {customer.currentBalance.toLocaleString()} Due
              </span>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="py-6">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-600 font-bold uppercase">
                  <th className="py-2.5 text-left">Date</th>
                  <th className="py-2.5 text-left">Description</th>
                  <th className="py-2.5 text-right w-24">Debit (Udhaar)</th>
                  <th className="py-2.5 text-right w-24">Credit (Paid)</th>
                  <th className="py-2.5 text-right w-28">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono-numbers text-slate-800">
                {customerTxs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400 font-sans">
                      No recorded transactions for this customer account.
                    </td>
                  </tr>
                ) : (
                  customerTxs.map((t) => (
                    <tr key={t.id}>
                      <td className="py-2.5 text-slate-500">{t.date}</td>
                      <td className="py-2.5 font-sans font-medium text-slate-900">{t.description}</td>
                      <td className="py-2.5 text-right text-amber-600">
                        {t.type === 'udhaar' || t.type === 'sale' ? `+Rs. ${t.amount.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-2.5 text-right text-emerald-600">
                        {t.type === 'payment' ? `-Rs. ${t.amount.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-2.5 text-right font-bold text-slate-900">
                        Rs. {(t.balanceAfter ?? customer.currentBalance).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Statement Balance Summary */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-[#0B1F33] block">Account Status: Active</span>
              <span className="text-slate-500">Credit Limit: Rs. {customer.creditLimit.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 text-[11px] block">Net Payable Balance</span>
              <span className="text-base font-extrabold text-[#0B1F33] font-mono-numbers">
                Rs. {customer.currentBalance.toLocaleString()} Due
              </span>
            </div>
          </div>

          <div className="mt-8 text-center text-[10px] text-slate-400">
            SHAFAF HISAB Automated Ledger System · All records audited & verified
          </div>
        </div>
      </div>
    </div>
  );
};
