import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  downloadSalesReportPDF,
  downloadProfitLossPDF,
  downloadExpenseReportPDF,
  downloadBusinessReportByType,
} from '../../utils/pdfGenerator';

export const ReportsShowcaseSection: React.FC = () => {
  const { currentBusiness, transactions, expenses, customers, products, orders, showToast } = useApp();
  const [selectedReport, setSelectedReport] = useState<string>('Sales Report');

  const reportList = [
    { name: 'Sales Report', desc: 'Granular log of all counter, web, and wholesale sales transactions with payment modes.' },
    { name: 'Profit & Loss (P&L)', desc: 'Official audited statement of gross revenue, COGS, operating expenses, and net profit.' },
    { name: 'Expense Report', desc: 'Categorized breakdown across rent, utility bills, salaries, advertising, and fuel.' },
    { name: 'Customer Report', desc: 'Customer lifetime values, purchase counts, credit limits, and interaction frequency.' },
    { name: 'Payment Report', desc: 'Reconciliation across Cash, Bank Transfers, Easypaisa, and JazzCash settlement.' },
    { name: 'Outstanding Report', desc: 'Comprehensive customer Udhaar aging analysis with overdue tags and contact numbers.' },
    { name: 'Product Report', desc: 'Fastest-moving items, dead stock analysis, profit margins per SKU, and sales velocity.' },
    { name: 'Inventory Report', desc: 'Current valuation of on-hand inventory, reorder triggers, and warehouse location.' },
    { name: 'Order Report', desc: 'E-commerce and phone order lifecycle breakdown from dispatch to final delivery.' },
    { name: 'Custom Report', desc: 'Tailor date ranges, specific branches, product categories, and sales channels.' },
  ];

  const handleExportCSV = (reportName: string) => {
    try {
      const csvContent = `data:text/csv;charset=utf-8,SHAFAF HISAB - ${reportName} Export\nDate,Description,Amount,Status\n2026-10-01,Sample Entry 1,14500,Completed\n2026-10-02,Sample Entry 2,28400,Completed\n2026-10-03,Sample Entry 3,19200,Completed`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${reportName.toLowerCase().replace(/[\s&()]/g, '_')}_2026.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Exported "${reportName}" to CSV successfully.`);
    } catch {
      showToast('Failed to export CSV. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = (reportName: string) => {
    try {
      showToast(`Generating high-resolution PDF for "${reportName}"...`);
      downloadBusinessReportByType(reportName, {
        business: currentBusiness,
        transactions,
        expenses,
        customers,
        products,
        orders,
        timeframe: 'October 2026',
      });
      showToast(`Downloaded official PDF for "${reportName}"`);
    } catch (err) {
      console.error(err);
      showToast('Unable to generate the PDF report. Please try again.');
    }
  };

  return (
    <section id="reports" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span>Executive Financial Reporting</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight [text-wrap:balance]">
            10 Ready-to-Export <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 animate-text-shimmer">
              Business Reports.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed [text-wrap:balance]">
            Instantly export clean, tax-compliant documentation for partners, banks, accountants, and internal leadership.
          </p>
        </div>

        {/* Reports Layout */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Report Selectors */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm divide-y divide-slate-100">
            {reportList.map((r) => {
              const isSelected = selectedReport === r.name;
              return (
                <button
                  key={r.name}
                  onClick={() => setSelectedReport(r.name)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#0B1F33] text-white shadow-xs'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-[#0F766E]'}`} />
                    <span className="text-sm font-semibold">{r.name}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Report Preview & Export Actions */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
              <div>
                <span className="text-xs font-semibold text-[#0F766E] uppercase">Official Ledger Export</span>
                <h3 className="text-2xl font-bold text-[#0B1F33] mt-0.5">{selectedReport}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Date Range: 01 Oct 2026 – Today · All Branches
                </p>
              </div>

              {/* Action Buttons: PDF, CSV, Print */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportCSV(selectedReport)}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Download CSV spreadsheet"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                  <span>CSV / Excel</span>
                </button>

                <button
                  onClick={() => handleDownloadPDF(selectedReport)}
                  className="px-3 py-2 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export official PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="Print Report"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description & Mock Table Preview */}
            <div className="mt-6">
              <p className="text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                {reportList.find((r) => r.name === selectedReport)?.desc}
              </p>

              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 text-left">Record ID</th>
                      <th className="py-2.5 px-3 text-left">Entity / Account</th>
                      <th className="py-2.5 px-3 text-left">Date</th>
                      <th className="py-2.5 px-3 text-right">Debit / Cost</th>
                      <th className="py-2.5 px-3 text-right">Credit / Revenue</th>
                      <th className="py-2.5 px-3 text-right">Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono-numbers text-slate-800">
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 text-slate-500 font-medium">#TX-9401</td>
                      <td className="py-2.5 px-3 font-sans font-medium text-slate-900">Al-Madina Store (Main Branch)</td>
                      <td className="py-2.5 px-3 text-slate-500">01 Oct 2026</td>
                      <td className="py-2.5 px-3 text-right text-rose-600">Rs. 45,000</td>
                      <td className="py-2.5 px-3 text-right text-emerald-600">Rs. 184,200</td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-700">+Rs. 139,200</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 text-slate-500 font-medium">#TX-9402</td>
                      <td className="py-2.5 px-3 font-sans font-medium text-slate-900">ABC Online (Daraz / Web)</td>
                      <td className="py-2.5 px-3 text-slate-500">03 Oct 2026</td>
                      <td className="py-2.5 px-3 text-right text-rose-600">Rs. 91,000</td>
                      <td className="py-2.5 px-3 text-right text-emerald-600">Rs. 142,500</td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-700">+Rs. 51,500</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 text-slate-500 font-medium">#TX-9403</td>
                      <td className="py-2.5 px-3 font-sans font-medium text-slate-900">Narowal City Branch</td>
                      <td className="py-2.5 px-3 text-slate-500">06 Oct 2026</td>
                      <td className="py-2.5 px-3 text-right text-rose-600">Rs. 14,200</td>
                      <td className="py-2.5 px-3 text-right text-emerald-600">Rs. 48,900</td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-700">+Rs. 34,700</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-mono-numbers">
                <span>Displaying 3 of 128 rows</span>
                <span className="font-bold text-[#0B1F33]">Consolidated Total: Rs. 225,400</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
