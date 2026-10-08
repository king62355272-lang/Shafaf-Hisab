import React from 'react';
import { X, Printer, Download, MessageCircle, Share2, CheckCircle2 } from 'lucide-react';
import { Invoice } from '../../../types';
import { useApp } from '../../../context/AppContext';
import { Logo } from '../../brand/Logo';
import { downloadInvoicePDF } from '../../../utils/pdfGenerator';

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  const { currentBusiness, showToast } = useApp();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    try {
      showToast(`Generating official PDF for #${invoice.invoiceNumber}...`);
      downloadInvoicePDF(invoice, currentBusiness);
      showToast(`Downloaded SHAFAF-HISAB-Invoice-${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      showToast('Unable to generate the PDF right now. Please try again.');
    }
  };

  const whatsappText = `Assalam-o-Alaikum! Invoice #${invoice.invoiceNumber} from ${currentBusiness.name} has been issued. Total: Rs. ${invoice.total.toLocaleString()}, Paid: Rs. ${invoice.paidAmount.toLocaleString()}, Balance Due: Rs. ${invoice.balanceDue.toLocaleString()}. Thank you!`;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Invoice ${invoice.invoiceNumber}`,
        text: whatsappText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(whatsappText);
      showToast('Invoice summary copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400 font-mono-numbers">
              {invoice.invoiceNumber}
            </span>
            <span className="text-xs text-slate-400">· Official Tax Invoice</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsApp}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-2.5 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document Body */}
        <div id="printable-area" className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900">
          {/* Branded Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-8 border-b-2 border-slate-900 gap-6">
            <div>
              <Logo size="md" variant="dark" />
              <h2 className="text-xl font-bold text-[#0B1F33] mt-3">{currentBusiness.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{currentBusiness.city} · Phone: {currentBusiness.phone}</p>
              {currentBusiness.email && <p className="text-xs text-slate-500">{currentBusiness.email}</p>}
            </div>

            <div className="sm:text-right">
              <span className="text-2xl font-black text-[#0B1F33] uppercase tracking-wider block">INVOICE</span>
              <div className="mt-2 text-xs font-mono-numbers space-y-1 text-slate-600">
                <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
                <p><strong>Date:</strong> {invoice.date}</p>
                <p><strong>Due Date:</strong> {invoice.dueDate}</p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="py-6 border-b border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Bill To Customer:</span>
            <h3 className="text-base font-bold text-slate-900">{invoice.customerName}</h3>
            {invoice.customerPhone && (
              <p className="text-xs text-slate-600 font-mono-numbers mt-0.5">Phone: {invoice.customerPhone}</p>
            )}
            {invoice.customerAddress && (
              <p className="text-xs text-slate-500 mt-0.5">{invoice.customerAddress}</p>
            )}
          </div>

          {/* Line Items Table */}
          <div className="py-6">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-600 font-bold uppercase">
                  <th className="py-2.5 text-left">Description</th>
                  <th className="py-2.5 text-center w-16">Qty</th>
                  <th className="py-2.5 text-right w-24">Rate</th>
                  <th className="py-2.5 text-right w-28">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono-numbers text-slate-800">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-sans font-medium text-slate-900">{item.description}</td>
                    <td className="py-3 text-center">{item.quantity}</td>
                    <td className="py-3 text-right">Rs. {item.unitPrice.toLocaleString()}</td>
                    <td className="py-3 text-right font-bold">Rs. {item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation Totals */}
          <div className="pt-4 border-t-2 border-slate-900 flex flex-col sm:flex-row justify-between gap-6">
            <div className="text-xs text-slate-500 max-w-xs space-y-2">
              <p className="font-semibold text-slate-800">Terms & Notes:</p>
              <p>{invoice.notes || 'Payment due as stated. Unpaid balances are tracked on customer ledger.'}</p>
              <div className="pt-2 flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified SHAFAF HISAB Business Record</span>
              </div>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs font-mono-numbers">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>Rs. {invoice.subtotal.toLocaleString()}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount:</span>
                  <span>-Rs. {invoice.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span className="font-sans">Grand Total:</span>
                <span>Rs. {invoice.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-700 pt-1">
                <span>Amount Paid:</span>
                <span>Rs. {invoice.paidAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-amber-600 pt-1 border-t border-slate-200">
                <span className="font-sans">Remaining Due:</span>
                <span>Rs. {invoice.balanceDue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Watermark */}
          <div className="mt-12 pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400">
            Powered by SHAFAF HISAB · “Manage Better. Grow Smarter.” · System Generated Document
          </div>
        </div>
      </div>
    </div>
  );
};
