import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle2, Copy, User } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const WhatsAppHubView: React.FC = () => {
  const { customers, currentBusiness, showToast } = useApp();
  const [selectedCustId, setSelectedCustId] = useState<string>(customers[0]?.id || '');
  const [templateType, setTemplateType] = useState<'balance' | 'reminder' | 'statement' | 'receipt' | 'invoice'>('balance');

  const selectedCustomer = customers.find((c) => c.id === selectedCustId) || customers[0];

  const templates = {
    balance: `Assalam-o-Alaikum ${selectedCustomer?.name || 'Customer'} sahib! Your current balance with ${currentBusiness.name} is Rs. ${selectedCustomer?.currentBalance.toLocaleString() || '0'} Due. Thank you for your continued patronage.`,
    reminder: `Assalam-o-Alaikum ${selectedCustomer?.name || 'Customer'} sahib! Friendly reminder regarding your pending balance of Rs. ${selectedCustomer?.currentBalance.toLocaleString() || '0'} with ${currentBusiness.name}. Kindly clear via Cash, Bank Transfer, or JazzCash at your earliest convenience. Shukriya!`,
    statement: `Assalam-o-Alaikum ${selectedCustomer?.name || 'Customer'}! Here is your latest account statement summary from ${currentBusiness.name}:\n• Total Outstanding: Rs. ${selectedCustomer?.currentBalance.toLocaleString() || '0'}\n• Last Transaction: ${selectedCustomer?.lastTransactionDate || 'Recent'}\nFor questions, call ${currentBusiness.phone}.`,
    receipt: `Assalam-o-Alaikum ${selectedCustomer?.name || 'Customer'}! We have received your payment with gratitude. Your remaining balance with ${currentBusiness.name} is now updated on your digital khata ledger. Shukriya!`,
    invoice: `Assalam-o-Alaikum ${selectedCustomer?.name || 'Customer'}! Your recent purchase invoice from ${currentBusiness.name} has been processed. Thank you for shopping with us!`,
  };

  const messageBody = templates[templateType];

  const handleLaunchWhatsApp = () => {
    if (!selectedCustomer) return;
    const phone = selectedCustomer.phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(messageBody)}`;
    window.open(url, '_blank');
    showToast(`WhatsApp message opened for ${selectedCustomer.name}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messageBody);
    showToast('Message text copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">WhatsApp Communication Center</h2>
          <p className="text-xs text-slate-500">
            Send polite, verified balance reminders, invoices, and payment receipts with one click.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold self-start sm:self-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>User Confirmation Required Before Dispatch</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Customer & Template Selectors */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              1. Choose Recipient Customer
            </label>
            <select
              value={selectedCustId}
              onChange={(e) => setSelectedCustId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:border-[#0F766E]"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.phone} (Balance: Rs. {c.currentBalance.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Select Pre-Formatted Template
            </label>
            <div className="space-y-2">
              {[
                { id: 'balance', label: 'Send Balance Notification', desc: 'Inform customer of current due balance' },
                { id: 'reminder', label: 'Payment Overdue Reminder', desc: 'Courteous reminder with settlement channels' },
                { id: 'statement', label: 'Send Full Statement Summary', desc: 'Account overview with last active transaction' },
                { id: 'receipt', label: 'Payment Receipt Acknowledgment', desc: 'Confirm receipt of cash or bank transfer' },
                { id: 'invoice', label: 'Send Sale Invoice Notification', desc: 'Notify customer of new order/sale' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplateType(t.id as any)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    templateType === t.id
                      ? 'bg-emerald-50/80 border-emerald-500/50 shadow-2xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">{t.label}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live WhatsApp Chat Simulator & Dispatch */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-md p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  {selectedCustomer?.name?.charAt(0) || 'C'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedCustomer?.name}</h4>
                  <p className="text-xs text-slate-400 font-mono-numbers">{selectedCustomer?.phone}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-600 font-mono-numbers">
                Rs. {selectedCustomer?.currentBalance.toLocaleString()} Due
              </span>
            </div>

            {/* Message Chat Bubble */}
            <div className="mt-6 p-6 rounded-2xl bg-[#EFEAE2] min-h-[160px] flex items-end">
              <div className="bg-white rounded-2xl rounded-bl-xs p-4 shadow-xs max-w-lg text-xs text-slate-800 leading-relaxed font-sans relative border border-slate-200/60">
                <p className="whitespace-pre-line">{messageBody}</p>
                <div className="mt-2 text-[10px] text-slate-400 text-right flex items-center justify-end gap-1 font-mono-numbers">
                  <span>10:42 AM</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Message Text</span>
            </button>
            <button
              onClick={handleLaunchWhatsApp}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm & Open WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
