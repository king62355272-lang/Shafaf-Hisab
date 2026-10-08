import React, { useState } from 'react';
import {
  User,
  PlusCircle,
  CheckCircle,
  MessageCircle,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Sparkles,
  Download,
} from 'lucide-react';
import { downloadCustomerStatementPDF } from '../../utils/pdfGenerator';
import { useApp } from '../../context/AppContext';

export const CustomerCreditKhataDemo: React.FC = () => {
  const { currentBusiness, showToast } = useApp();
  // Ali Ahmed's initial transaction ledger matching the exact prompt request:
  const [transactions, setTransactions] = useState([
    {
      id: 'tx-1',
      date: '05 Oct',
      item: 'Grocery',
      type: 'debit',
      amount: 1200,
      balanceAfter: 1200,
    },
    {
      id: 'tx-2',
      date: '06 Oct',
      item: 'Payment',
      type: 'credit',
      amount: 500,
      balanceAfter: 700,
    },
    {
      id: 'tx-3',
      date: '07 Oct',
      item: 'Household Items',
      type: 'debit',
      amount: 2500,
      balanceAfter: 3200,
    },
  ]);

  const [activeModal, setActiveModal] = useState<'add' | 'pay' | 'whatsapp' | 'statement' | null>(null);
  const [inputAmount, setInputAmount] = useState<number>(500);
  const [inputDesc, setInputDesc] = useState<string>('Dairy & Spices');

  // Calculate current balance dynamically from ledger
  const currentBalance = transactions.reduce(
    (acc, t) => (t.type === 'debit' ? acc + t.amount : acc - t.amount),
    0
  );

  const handleAddUdhaar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAmount || inputAmount <= 0) return;
    const newBal = currentBalance + inputAmount;
    setTransactions((prev) => [
      ...prev,
      {
        id: `tx-${Date.now()}`,
        date: 'Today',
        item: inputDesc || 'Goods on Credit',
        type: 'debit',
        amount: inputAmount,
        balanceAfter: newBal,
      },
    ]);
    setActiveModal(null);
    setInputAmount(500);
  };

  const handleReceivePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAmount || inputAmount <= 0) return;
    const newBal = Math.max(0, currentBalance - inputAmount);
    setTransactions((prev) => [
      ...prev,
      {
        id: `tx-${Date.now()}`,
        date: 'Today',
        item: 'Cash Payment Received',
        type: 'credit',
        amount: inputAmount,
        balanceAfter: newBal,
      },
    ]);
    setActiveModal(null);
    setInputAmount(500);
  };

  const whatsappText = `Assalam-o-Alaikum Ali Ahmed sahib! Your current balance with Al-Madina Store is Rs. ${currentBalance.toLocaleString()} due. View detailed statement: https://shafafhisab.pk/stmt/c1`;

  return (
    <section id="khata-demo" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Explanatory Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Interactive Khata Simulator</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight [text-wrap:balance]">
              Customer Credit & Udhaar, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 animate-text-shimmer">
                perfectly automated.
              </span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              No manual math. Whenever a customer buys on credit or makes a payment, SHAFAF HISAB updates their running balance instantly and prepares formal WhatsApp reminders.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">1</span>
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Automatic Ledger:</strong> Every debit and payment adjusts the balance automatically.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">2</span>
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">One-Tap WhatsApp:</strong> Send transparent statements directly to customer phones.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">3</span>
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Zero Confusion:</strong> Date-stamped transaction trail with exact item descriptions.
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 italic">
              Try the interactive buttons on the customer card to test real-time calculations.
            </div>
          </div>

          {/* Right Live Interactive Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
              {/* Profile Card Header */}
              <div className="p-6 bg-[#0B1F33] text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-lg">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">Ali Ahmed</h3>
                        <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          Active Khata
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono-numbers">0300-8451234 · Lahore</p>
                    </div>
                  </div>

                  {/* Calculated Balance Box */}
                  <div className="bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 sm:text-right">
                    <span className="text-xs text-slate-400 block font-medium">Current Balance</span>
                    <span className="text-2xl font-extrabold text-amber-400 font-mono-numbers">
                      Rs. {currentBalance.toLocaleString()} Due
                    </span>
                  </div>
                </div>

                {/* 4 Primary Action Buttons */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => setActiveModal('add')}
                    className="px-3 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ Add Udhaar</span>
                  </button>

                  <button
                    onClick={() => setActiveModal('pay')}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Receive Payment</span>
                  </button>

                  <button
                    onClick={() => setActiveModal('whatsapp')}
                    className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setActiveModal('statement')}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Statement</span>
                  </button>
                </div>
              </div>

              {/* Transaction History Section */}
              <div className="p-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Transaction History
                  </h4>
                  <span className="text-xs text-slate-500 font-mono-numbers">
                    {transactions.length} recorded entries
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            tx.type === 'debit'
                              ? 'bg-amber-50 text-amber-600'
                              : 'bg-emerald-50 text-emerald-600'
                          }`}
                        >
                          {tx.type === 'debit' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownLeft className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{tx.item}</div>
                          <div className="text-xs text-slate-500 font-mono-numbers">{tx.date}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-sm font-bold font-mono-numbers ${
                            tx.type === 'debit' ? 'text-amber-600' : 'text-emerald-600'
                          }`}
                        >
                          {tx.type === 'debit' ? `+Rs. ${tx.amount.toLocaleString()}` : `-Rs. ${tx.amount.toLocaleString()}`}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono-numbers">
                          Bal: Rs. {tx.balanceAfter.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Running Balance Footer */}
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between bg-slate-50 p-3.5 rounded-xl">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Automatically Calculated Balance
                  </span>
                  <span className="text-base font-extrabold text-[#0B1F33] font-mono-numbers">
                    Rs. {currentBalance.toLocaleString()} Due
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Simulator for Add Udhaar */}
        {activeModal === 'add' && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-[#0B1F33] mb-1">Add Customer Udhaar (Credit)</h3>
              <p className="text-xs text-slate-500 mb-4">Adding credit item to Ali Ahmed's account</p>
              <form onSubmit={handleAddUdhaar} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (Rs.)</label>
                  <input
                    type="number"
                    min="1"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono-numbers text-base font-semibold focus:outline-none focus:border-[#0F766E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Item / Description</label>
                  <input
                    type="text"
                    value={inputDesc}
                    onChange={(e) => setInputDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0F766E]"
                    required
                  />
                </div>
                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg"
                  >
                    Confirm & Update Balance
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Simulator for Receive Payment */}
        {activeModal === 'pay' && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-[#0B1F33] mb-1">Receive Payment</h3>
              <p className="text-xs text-slate-500 mb-4">Record cash or bank payment received from Ali Ahmed</p>
              <form onSubmit={handleReceivePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Amount (Rs.)</label>
                  <input
                    type="number"
                    min="1"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono-numbers text-base font-semibold focus:outline-none focus:border-[#0F766E]"
                    required
                  />
                </div>
                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                  >
                    Record Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Simulator for WhatsApp */}
        {activeModal === 'whatsapp' && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-emerald-600">
                <MessageCircle className="w-5 h-5" />
                <h3 className="text-base font-bold">WhatsApp Reminder Preview</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Pre-formatted message ready to send with confirmation:
              </p>
              <div className="bg-[#E7F8EE] p-4 rounded-xl border border-emerald-200 text-xs text-slate-800 leading-relaxed font-sans mb-4">
                {whatsappText}
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 text-center text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                >
                  Open in WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal Simulator for Statement */}
        {activeModal === 'statement' && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-[#0B1F33]">Official Customer Statement</h3>
                  <p className="text-xs text-slate-500">Customer: Ali Ahmed · Al-Madina Store</p>
                </div>
                <span className="text-xs font-mono-numbers text-slate-600">OCT 2026</span>
              </div>

              <table className="w-full text-xs mt-4">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Description</th>
                    <th className="py-2 text-right">Debit</th>
                    <th className="py-2 text-right">Credit</th>
                    <th className="py-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono-numbers">
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td className="py-2.5 text-slate-500">{t.date}</td>
                      <td className="py-2.5 font-sans font-medium text-slate-800">{t.item}</td>
                      <td className="py-2.5 text-right text-amber-600">
                        {t.type === 'debit' ? t.amount.toLocaleString() : '-'}
                      </td>
                      <td className="py-2.5 text-right text-emerald-600">
                        {t.type === 'credit' ? t.amount.toLocaleString() : '-'}
                      </td>
                      <td className="py-2.5 text-right font-bold text-slate-900">
                        Rs. {t.balanceAfter.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs font-bold text-[#0B1F33]">
                <span>Total Outstanding Balance</span>
                <span className="text-amber-600 font-mono-numbers text-sm">
                  Rs. {currentBalance.toLocaleString()} Due
                </span>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    try {
                      showToast('Downloading statement PDF for Ali Ahmed...');
                      downloadCustomerStatementPDF(
                        {
                          id: 'cust-ali-ahmed',
                          name: 'Ali Ahmed',
                          phone: '0300-8451234',
                          city: 'Lahore',
                          businessId: 'biz-1',
                          branchId: 'b-main',
                          currentBalance,
                          creditLimit: 15000,
                          lastTransactionDate: '07 Oct 2026',
                        },
                        transactions.map((t) => ({
                          id: t.id,
                          businessId: 'biz-1',
                          branchId: 'b-main',
                          customerId: 'cust-ali-ahmed',
                          customerName: 'Ali Ahmed',
                          type: t.type === 'debit' ? 'udhaar' : 'payment',
                          amount: t.amount,
                          balanceAfter: t.balanceAfter,
                          date: t.date,
                          description: t.item,
                          paymentMethod: t.type === 'debit' ? 'Credit / Udhaar' : 'Cash',
                        })),
                        currentBusiness
                      );
                      showToast('Downloaded SHAFAF-HISAB-Ali-Ahmed-Statement.pdf');
                    } catch {
                      showToast('Unable to generate PDF. Please try again.');
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
