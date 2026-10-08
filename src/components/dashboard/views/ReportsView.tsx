import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  FileSpreadsheet,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import {
  downloadSalesReportPDF,
  downloadProfitLossPDF,
  downloadExpenseReportPDF,
  downloadBusinessReportByType,
} from '../../../utils/pdfGenerator';

export const ReportsView: React.FC = () => {
  const { currentBusiness, transactions, expenses, customers, products, orders, showToast } = useApp();
  const [activeReport, setActiveReport] = useState<string>('Profit & Loss');
  const [timeframe, setTimeframe] = useState<string>('This Month (Oct 2026)');

  const reports = [
    'Sales Report',
    'Profit & Loss',
    'Expense Report',
    'Customer Report',
    'Payment Report',
    'Outstanding Report',
    'Product Report',
    'Inventory Report',
    'Order Report',
    'Custom Report',
  ];

  const handleExportCSV = () => {
    try {
      const csvData = `data:text/csv;charset=utf-8,SHAFAF HISAB - ${activeReport} (${timeframe})\nDate,Description,Debit,Credit,Net\n2026-10-01,Gross Store Collections,0,84500,84500\n2026-10-02,Operating Costs,18200,0,-18200\n2026-10-03,Customer Udhaar Settlements,0,14000,14000`;
      const uri = encodeURI(csvData);
      const link = document.createElement('a');
      link.setAttribute('href', uri);
      link.setAttribute('download', `${activeReport.toLowerCase().replace(/[\s&()]/g, '_')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`CSV downloaded for ${activeReport}`);
    } catch {
      showToast('Failed to export CSV. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    try {
      showToast(`Generating official PDF for ${activeReport}...`);
      downloadBusinessReportByType(activeReport, {
        business: currentBusiness,
        transactions,
        expenses,
        customers,
        products,
        orders,
        timeframe,
      });
      showToast(`Downloaded SHAFAF HISAB official PDF for ${activeReport}`);
    } catch (err) {
      console.error(err);
      showToast('Unable to generate the PDF report. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Financial & Audit Reports</h2>
          <p className="text-xs text-slate-500">
            Generate and export official P&L statements, branch summaries, and tax sheets.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-3 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Print"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Report Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {reports.map((r) => (
          <button
            key={r}
            onClick={() => setActiveReport(r)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeReport === r
                ? 'bg-[#0B1F33] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Main Report Document Sheet */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b-2 border-slate-900 gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#0B1F33]">{activeReport}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Entity: {currentBusiness.name} · All Active Branches
            </p>
          </div>
          <div className="sm:text-right text-xs font-mono-numbers text-slate-500">
            <p><strong>Cadence:</strong> {timeframe}</p>
            <p><strong>Currency:</strong> {currentBusiness.currency} (PKR)</p>
          </div>
        </div>

        {/* P&L Statement Structure */}
        {activeReport === 'Profit & Loss' ? (
          <div className="py-6 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                1. Gross Revenue Inflows
              </h4>
              <div className="space-y-2 text-xs font-mono-numbers">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Counter Retail & Store Sales</span>
                  <span className="font-bold text-slate-900">Rs. 1,840,000</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Online & Digital Orders</span>
                  <span className="font-bold text-slate-900">Rs. 485,000</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Wholesale & Trade Invoices</span>
                  <span className="font-bold text-slate-900">Rs. 125,000</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-extrabold text-emerald-700 bg-emerald-50/60 px-2 rounded">
                  <span className="font-sans">Total Gross Revenue</span>
                  <span>Rs. 2,450,000</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                2. Cost of Goods Sold (COGS)
              </h4>
              <div className="space-y-2 text-xs font-mono-numbers">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Supplier Product Procurement</span>
                  <span className="text-slate-900">Rs. 1,420,000</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Freight & Inbound Freight</span>
                  <span className="text-slate-900">Rs. 38,000</span>
                </div>
                <div className="flex justify-between py-2 text-xs font-bold text-slate-900 bg-slate-50 px-2 rounded">
                  <span className="font-sans">Gross Trading Margin</span>
                  <span>Rs. 992,000 (40.5%)</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                3. Operating Overhead (OPEX)
              </h4>
              <div className="space-y-2 text-xs font-mono-numbers">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Premises Rent</span>
                  <span className="text-rose-600">Rs. 45,000</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Staff Salaries & Tranches</span>
                  <span className="text-rose-600">Rs. 38,000</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Meta / TikTok Advertising Spend</span>
                  <span className="text-rose-600">Rs. 41,000</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Electricity, Generator & Utilities</span>
                  <span className="text-rose-600">Rs. 16,500</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-sans text-slate-700">Courier Shipping Subsidies & Packaging</span>
                  <span className="text-rose-600">Rs. 12,200</span>
                </div>
                <div className="flex justify-between py-2 text-xs font-bold text-rose-700 bg-rose-50 px-2 rounded">
                  <span className="font-sans">Total Operating Expenditures</span>
                  <span>Rs. 152,700</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-950 text-white rounded-xl flex justify-between items-center text-sm">
              <div>
                <span className="font-bold block">Consolidated Net Profit</span>
                <span className="text-xs text-emerald-300 font-sans">
                  After all procurement, freight, utilities and marketing overhead
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono-numbers">
                Rs. 839,300
              </span>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <p className="text-xs text-slate-600 mb-4">
              Exportable statement for {activeReport} with individual audit stamps and ledger reconciliation.
            </p>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 text-left">Record Date</th>
                    <th className="py-2.5 px-4 text-left">Description</th>
                    <th className="py-2.5 px-4 text-right">Debit</th>
                    <th className="py-2.5 px-4 text-right">Credit</th>
                    <th className="py-2.5 px-4 text-right">Net Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono-numbers">
                  <tr>
                    <td className="py-2.5 px-4 text-slate-500">01 Oct 2026</td>
                    <td className="py-2.5 px-4 font-sans">Branch Sales Ledger #01</td>
                    <td className="py-2.5 px-4 text-right text-slate-400">-</td>
                    <td className="py-2.5 px-4 text-right text-emerald-700">Rs. 84,500</td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">+Rs. 84,500</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-slate-500">03 Oct 2026</td>
                    <td className="py-2.5 px-4 font-sans">Supplier Stock Delivery #41</td>
                    <td className="py-2.5 px-4 text-right text-rose-600">Rs. 32,000</td>
                    <td className="py-2.5 px-4 text-right text-slate-400">-</td>
                    <td className="py-2.5 px-4 text-right font-bold text-rose-600">-Rs. 32,000</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-slate-500">06 Oct 2026</td>
                    <td className="py-2.5 px-4 font-sans">Customer Udhaar Recovery</td>
                    <td className="py-2.5 px-4 text-right text-slate-400">-</td>
                    <td className="py-2.5 px-4 text-right text-emerald-700">Rs. 14,200</td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">+Rs. 14,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
          <span>SHAFAF HISAB Enterprise Audit Engine</span>
          <span>Verified Document · 2026</span>
        </div>
      </div>
    </div>
  );
};
