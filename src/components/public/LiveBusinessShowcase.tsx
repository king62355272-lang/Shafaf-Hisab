import React, { useState } from 'react';
import {
  Store,
  Shirt,
  Globe,
  Briefcase,
  Sparkles,
  Smartphone,
  Truck,
  Wrench,
  PlusCircle,
  CheckCircle,
  MessageCircle,
  FileSpreadsheet,
  TrendingUp,
  Package,
  Users,
  Receipt,
  Wallet,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Layers,
  Megaphone,
  Clock,
  ExternalLink,
  ShieldAlert,
  Percent,
  Download,
  Printer,
  Sliders,
  Check,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { downloadCustomerStatementPDF, downloadInvoicePDF } from '../../utils/pdfGenerator';

interface LiveBusinessShowcaseProps {
  onOpenApp: (businessType: string) => void;
}

export type DemoSector =
  | 'kiryana'
  | 'garments'
  | 'ecommerce'
  | 'freelancer'
  | 'wholesale'
  | 'electronics'
  | 'cosmetics'
  | 'services';

export const LiveBusinessShowcase: React.FC<LiveBusinessShowcaseProps> = ({ onOpenApp }) => {
  const [selectedDemo, setSelectedDemo] = useState<DemoSector>('kiryana');
  const { showToast, currentBusiness } = useApp();

  // =========================================================================
  // 1. KIRYANA STATE (Customer Ahmed Udhaar Khata)
  // =========================================================================
  const [ahmedTxs, setAhmedTxs] = useState([
    { id: 'tx-1', date: '05 Oct', desc: 'Grocery (Atta 10kg, Dalda Oil, Sugar)', type: 'debit', amount: 1500, bal: 1500 },
    { id: 'tx-2', date: '07 Oct', desc: 'Cash Payment Received at Counter', type: 'credit', amount: 500, bal: 1000 },
    { id: 'tx-3', date: '09 Oct', desc: 'Household Items (Tapal Tea, Detergent)', type: 'debit', amount: 1450, bal: 2450 },
  ]);
  const [ahmedModal, setAhmedModal] = useState<'add' | 'pay' | 'whatsapp' | null>(null);
  const [ahmedInputAmount, setAhmedInputAmount] = useState<number>(500);
  const [ahmedInputDesc, setAhmedInputDesc] = useState<string>('Cold Drinks & Spices');

  const ahmedCurrentBalance = ahmedTxs.reduce(
    (acc, t) => (t.type === 'debit' ? acc + t.amount : acc - t.amount),
    0
  );

  const handleAhmedAddUdhaar = (e: React.FormEvent) => {
    e.preventDefault();
    if (ahmedInputAmount <= 0) return;
    const newBal = ahmedCurrentBalance + ahmedInputAmount;
    setAhmedTxs((prev) => [
      ...prev,
      {
        id: `tx-${Date.now()}`,
        date: 'Today',
        desc: ahmedInputDesc || 'Store Goods on Udhaar',
        type: 'debit',
        amount: ahmedInputAmount,
        bal: newBal,
      },
    ]);
    setAhmedModal(null);
    showToast(`Added Rs. ${ahmedInputAmount.toLocaleString()} Udhaar for Ahmed`);
    setAhmedInputAmount(500);
  };

  const handleAhmedPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (ahmedInputAmount <= 0) return;
    const newBal = Math.max(0, ahmedCurrentBalance - ahmedInputAmount);
    setAhmedTxs((prev) => [
      ...prev,
      {
        id: `tx-${Date.now()}`,
        date: 'Today',
        desc: 'Cash Wasool at Counter',
        type: 'credit',
        amount: ahmedInputAmount,
        bal: newBal,
      },
    ]);
    setAhmedModal(null);
    showToast(`Payment of Rs. ${ahmedInputAmount.toLocaleString()} recorded from Ahmed`);
    setAhmedInputAmount(500);
  };

  const handleAhmedPDFStatement = () => {
    try {
      showToast('Generating SHAFAF-HISAB-Ahmed-Statement.pdf...');
      const mockCustomer = {
        id: 'cust-ahmed',
        name: 'Ahmed',
        phone: '0300-8451234',
        city: 'Lahore',
        businessId: 'biz-1',
        branchId: 'b-main',
        currentBalance: ahmedCurrentBalance,
        creditLimit: 15000,
        lastTransactionDate: '09 Oct 2026',
      };
      const mockTxs = ahmedTxs.map((t) => ({
        id: t.id,
        businessId: 'biz-1',
        branchId: 'b-main',
        customerId: 'cust-ahmed',
        customerName: 'Ahmed',
        type: t.type === 'debit' ? ('udhaar' as const) : ('payment' as const),
        amount: t.amount,
        balanceAfter: t.bal,
        date: t.date,
        description: t.desc,
        paymentMethod: t.type === 'debit' ? ('Credit / Udhaar' as const) : ('Cash' as const),
      }));

      downloadCustomerStatementPDF(mockCustomer, mockTxs, currentBusiness);
      showToast('Downloaded SHAFAF-HISAB-Ahmed-Statement.pdf');
    } catch {
      showToast('Unable to generate PDF statement. Please try again.');
    }
  };

  const ahmedWhatsAppText = `Assalam-o-Alaikum Ahmed sahib! Your current balance with Al-Madina Kiryana & General Store is Rs. ${ahmedCurrentBalance.toLocaleString()} Due. Shukriya!`;

  // =========================================================================
  // 2. GARMENTS STATE (Apparel SKU Size & Color Matrix)
  // =========================================================================
  const [apparelMatrix, setApparelMatrix] = useState([
    { color: 'Jet Black', colorHex: '#0F172A', s: 8, m: 14, l: 12, xl: 2, xxl: 6 },
    { color: 'Pure White', colorHex: '#FFFFFF', s: 10, m: 18, l: 15, xl: 9, xxl: 7 },
    { color: 'Royal Navy', colorHex: '#1E3A8A', s: 6, m: 12, l: 3, xl: 8, xxl: 5 },
    { color: 'Heather Grey', colorHex: '#94A3B8', s: 5, m: 10, l: 11, xl: 7, xxl: 4 },
  ]);
  const [selectedCell, setSelectedCell] = useState<{ color: string; size: string; count: number } | null>({
    color: 'Jet Black',
    size: 'XL',
    count: 2,
  });

  const handleAdjustApparelStock = (delta: number) => {
    if (!selectedCell) return;
    setApparelMatrix((prev) =>
      prev.map((row) => {
        if (row.color === selectedCell.color) {
          const key = selectedCell.size.toLowerCase() as 's' | 'm' | 'l' | 'xl' | 'xxl';
          const newCount = Math.max(0, row[key] + delta);
          setSelectedCell({ ...selectedCell, count: newCount });
          return { ...row, [key]: newCount };
        }
        return row;
      })
    );
    showToast(`Stock updated for ${selectedCell.color} (${selectedCell.size})`);
  };

  // =========================================================================
  // 3. E-COMMERCE STATE (COD Reconciler & Profit Calculator)
  // =========================================================================
  const [ecomRevenue] = useState(485000);
  const [ecomCogs] = useState(275000);
  const [ecomShipping] = useState(32000);
  const [ecomAds] = useState(41000);
  const [ecomOther] = useState(18000);
  const ecomNetProfit = ecomRevenue - ecomCogs - ecomShipping - ecomAds - ecomOther;

  const [codOrders, setCodOrders] = useState([
    { id: 'TRX-9481', courier: 'Trax Logistics', cn: 'TRX-784910', city: 'Lahore', amount: 4850, status: 'Remitted to Bank' },
    { id: 'PEX-1024', courier: 'PostEx COD', cn: 'PEX-992144', city: 'Karachi', amount: 6200, status: 'Out for Delivery' },
    { id: 'TCS-8812', courier: 'TCS Express', cn: 'TCS-441299', city: 'Islamabad', amount: 3400, status: 'Remitted to Bank' },
    { id: 'TRX-9502', courier: 'Trax Logistics', cn: 'TRX-785002', city: 'Faisalabad', amount: 5100, status: 'RTO Returned' },
  ]);

  const handleVerifyRemittance = (id: string) => {
    setCodOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'Remitted to Bank' } : o))
    );
    showToast(`Payment reconciled & settled for ${id}`);
  };

  // =========================================================================
  // 4. FREELANCER STATE (Milestone Contract)
  // =========================================================================
  const [freelancerMilestones, setFreelancerMilestones] = useState([
    { id: 'm1', title: 'Brand Identity & UI Wireframes', amount: 35000, status: 'Paid', date: '01 Oct 2026' },
    { id: 'm2', title: 'Interactive Prototype & React Build', amount: 25000, status: 'Paid', date: '05 Oct 2026' },
    { id: 'm3', title: 'Production Deployment & Handoff', amount: 20000, status: 'Pending Review', date: 'Due 12 Oct' },
  ]);

  const handleReleaseMilestone = (id: string) => {
    setFreelancerMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'Paid', date: 'Today' } : m))
    );
    showToast('Milestone #3 approved and payment of Rs. 20,000 stamped as Received!');
  };

  // =========================================================================
  // 5. WHOLESALE STATE (Carton Tiers & Loading Chalan)
  // =========================================================================
  const [wholesaleProduct, setWholesaleProduct] = useState('Cooking Oil 16L Tin');
  const [wholesaleCartons, setWholesaleCartons] = useState(25);
  const getWholesaleUnitRate = (qty: number) => {
    if (qty >= 50) return 3850; // Super tier
    if (qty >= 20) return 4150; // Bulk tier
    return 4500; // Standard tier
  };
  const wholesaleRate = getWholesaleUnitRate(wholesaleCartons);
  const wholesaleTotal = wholesaleCartons * wholesaleRate;

  // =========================================================================
  // 6. ELECTRONICS STATE (IMEI Lookup & Trade-in)
  // =========================================================================
  const [selectedImei, setSelectedImei] = useState('354892019482711');
  const imeiDatabase: Record<string, { model: string; pta: string; warranty: string; color: string; storage: string }> = {
    '354892019482711': {
      model: 'Samsung Galaxy S24 Ultra',
      pta: 'PTA Approved (Official Tax Paid)',
      warranty: 'Official Samsung Warranty · Valid till Sep 2027',
      color: 'Titanium Gray',
      storage: '256GB / 12GB RAM',
    },
    'G6TX79QY8K': {
      model: 'Apple iPhone 15 Pro Max',
      pta: 'PTA Approved (Commercial SIM 1 & eSIM)',
      warranty: 'Mercantile Official Warranty · Valid till Nov 2027',
      color: 'Natural Titanium',
      storage: '256GB NVMe',
    },
  };

  // =========================================================================
  // 7. SERVICES STATE (Car Workshop Job Card)
  // =========================================================================
  const [jobTasks, setJobTasks] = useState([
    { id: 'j1', task: 'Fully Synthetic Oil & Filter Replacement', labor: 1000, parts: 7200, done: true },
    { id: 'j2', task: 'Front Ceramic Brake Pads Installation', labor: 1500, parts: 4800, done: true },
    { id: 'j3', task: 'AC Condenser Blower Clean & Gas Top-up', labor: 2200, parts: 1800, done: false },
  ]);

  const toggleTask = (id: string) => {
    setJobTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };
  const totalLabor = jobTasks.reduce((acc, t) => acc + t.labor, 0);
  const totalParts = jobTasks.reduce((acc, t) => acc + t.parts, 0);
  const totalJobCard = totalLabor + totalParts;

  return (
    <section id="demo" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-3 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Multi-Sector Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight [text-wrap:balance]">
            Experience Your Industry's Dedicated Console. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 animate-text-shimmer">
              Not A One-Size Generic Template.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed [text-wrap:balance]">
            SHAFAF HISAB is not a generic khata or a one-size-fits-all app. Each sector has completely different
            navigation, terminology, metrics, and workflows. Select any industry to test its live workspace.
          </p>
        </div>

        {/* Business Selector Tabs (8 Distinct Sectors) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 max-w-full">
          {[
            { id: 'kiryana', label: 'Kiryana / General Store', icon: Store },
            { id: 'garments', label: 'Garments & Apparel', icon: Shirt },
            { id: 'ecommerce', label: 'E-commerce Brand', icon: Globe },
            { id: 'freelancer', label: 'Freelancer / Services', icon: Briefcase },
            { id: 'wholesale', label: 'Wholesale & B2B', icon: Truck },
            { id: 'electronics', label: 'Electronics & Mobile', icon: Smartphone },
            { id: 'cosmetics', label: 'Cosmetics & Beauty', icon: Sparkles },
            { id: 'services', label: 'Service / AutoCare', icon: Wrench },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedDemo === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedDemo(tab.id as DemoSector)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B1F33] text-white shadow-md ring-2 ring-[#0F766E]'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-[#0F766E]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Demo Container */}
        <div className="mt-6 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Demo Context Bar */}
          <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {selectedDemo.toUpperCase()} SECTOR SIMULATION
                </span>
                <p className="text-xs text-slate-300">
                  {selectedDemo === 'kiryana' && 'Al-Madina Kiryana & General Store · Counter POS & Customer Udhaar'}
                  {selectedDemo === 'garments' && 'Gulberg Threads & Apparel · Size & Color Variant Matrix'}
                  {selectedDemo === 'ecommerce' && 'ABC Online Store · Real Take-Home Net Profit & Trax/PostEx COD'}
                  {selectedDemo === 'freelancer' && 'Ali Digital & Design Studio · Retainers, Milestones & Receivables'}
                  {selectedDemo === 'wholesale' && 'Khyber Bulk Trade & Distribution · Carton Tiers & Loading Chalan'}
                  {selectedDemo === 'electronics' && 'Apex Mobile & Electronics · Serial/IMEI Tracking & Warranty Logs'}
                  {selectedDemo === 'cosmetics' && 'Glow & Glam Beauty Store · Expiry Date Tracking & Brand Margins'}
                  {selectedDemo === 'services' && 'AutoCare Pro Workshop · Vehicle Job Cards & Labor/Parts Breakdown'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenApp(selectedDemo)}
              className="px-3.5 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-sm"
            >
              <span>Open in Full App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ========================================================= */}
          {/* 1. KIRYANA / GENERAL STORE DEMO */}
          {/* ========================================================= */}
          {selectedDemo === 'kiryana' && (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Specialized Kiryana Navigation Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                <span className="text-slate-400 uppercase text-[10px] font-bold">Kiryana Menu:</span>
                {['Overview', 'Counter POS', 'Customer Udhaar (Khata)', 'Purchases (Thok)', 'Stock', 'Expenses', 'Cash Drawer', 'Reports'].map(
                  (item, idx) => (
                    <span
                      key={item}
                      className={`px-2.5 py-1 rounded-md ${
                        idx === 0 ? 'bg-[#0B1F33] text-white' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

              {/* Kiryana Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Today's Sales</span>
                  <span className="text-xl font-bold font-mono-numbers text-[#0B1F33]">Rs. 68,400</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">+12% Counter Traffic</span>
                </div>
                <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                  <span className="text-[11px] text-amber-800 font-semibold block">Customer Due (Udhaar)</span>
                  <span className="text-xl font-bold font-mono-numbers text-amber-600">Rs. 34,250</span>
                  <span className="text-[10px] text-amber-700 block mt-1">14 Regular Accounts</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Payments Received</span>
                  <span className="text-xl font-bold font-mono-numbers text-emerald-700">Rs. 24,500</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Cash Wasool</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Daily Expenses</span>
                  <span className="text-xl font-bold font-mono-numbers text-rose-600">Rs. 8,200</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Tea, bags, utilities</span>
                </div>
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-300">
                  <span className="text-[11px] text-emerald-800 font-semibold block">Estimated Profit</span>
                  <span className="text-xl font-bold font-mono-numbers text-emerald-700">Rs. 18,650</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">27.2% Net Margin</span>
                </div>
                <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200">
                  <span className="text-[11px] text-rose-800 font-semibold block">Low Stock Staples</span>
                  <span className="text-xl font-bold font-mono-numbers text-rose-600">4 Items</span>
                  <span className="text-[10px] text-rose-700 block mt-1">Atta, Ghee, Cold Drinks</span>
                </div>
              </div>

              {/* Kiryana Two-Column Focus: Customer Ahmed Profile + Fast Moving Goods */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                        Customer Udhaar Khata
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">Ahmed</h3>
                      <p className="text-xs text-slate-400 font-mono-numbers">0300-8451234 · Mohallah Gulberg</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-medium block">Current Balance</span>
                      <span className="text-2xl font-extrabold font-mono-numbers text-amber-600">
                        Rs. {ahmedCurrentBalance.toLocaleString()} Due
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase">Transaction History:</span>
                    <div className="divide-y divide-slate-100 bg-slate-50/70 rounded-xl p-3 border border-slate-100">
                      {ahmedTxs.map((t) => (
                        <div key={t.id} className="py-2 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-slate-800 block">{t.desc}</span>
                            <span className="text-[11px] text-slate-400 font-mono-numbers">{t.date}</span>
                          </div>
                          <div className="text-right font-mono-numbers">
                            <span className={`font-bold ${t.type === 'debit' ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {t.type === 'debit' ? `+ Rs. ${t.amount.toLocaleString()}` : `- Rs. ${t.amount.toLocaleString()}`}
                            </span>
                            <span className="text-[10px] text-slate-400 block">Bal: Rs. {t.bal.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions for Ahmed */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    <button
                      onClick={() => setAhmedModal('add')}
                      className="py-2 px-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add Udhaar</span>
                    </button>
                    <button
                      onClick={() => setAhmedModal('pay')}
                      className="py-2 px-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Receive Pay</span>
                    </button>
                    <button
                      onClick={() => setAhmedModal('whatsapp')}
                      className="py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={handleAhmedPDFStatement}
                      className="py-2 px-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Statement PDF</span>
                    </button>
                  </div>
                </div>

                {/* Kiryana Products Catalog Preview */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      General Store & Kiryana Inventory
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono-numbers">12 Fast-Moving Staples</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { name: 'Coca Cola 1.5L', stock: '6 bottles', price: 170, low: true },
                      { name: 'Pepsi 1.5L', stock: '14 bottles', price: 170, low: false },
                      { name: 'Sooper Biscuits', stock: '48 packs', price: 60, low: false },
                      { name: 'Lays Chips Large', stock: '32 bags', price: 100, low: false },
                      { name: 'Dalda Cooking Oil 5L', stock: '5 cans', price: 2850, low: true },
                      { name: 'Super Basmati Rice 5kg', stock: '22 bags', price: 1950, low: false },
                      { name: 'Atta 10kg Bag', stock: '4 bags', price: 1450, low: true },
                      { name: 'Tapal Danedar Tea', stock: '24 pouches', price: 720, low: false },
                      { name: 'Lifebuoy Soap 130g', stock: '60 bars', price: 130, low: false },
                      { name: 'Surf Excel 1kg', stock: '18 packs', price: 580, low: false },
                      { name: 'Sunsilk Shampoo 350ml', stock: '12 bottles', price: 380, low: false },
                      { name: 'Sugar 5kg Bag', stock: '16 bags', price: 740, low: false },
                    ].map((p) => (
                      <div
                        key={p.name}
                        className={`p-2 rounded-lg border flex flex-col justify-between ${
                          p.low ? 'bg-rose-50/80 border-rose-200' : 'bg-slate-50 border-slate-200/80'
                        }`}
                      >
                        <span className="font-bold text-slate-900 truncate">{p.name}</span>
                        <div className="flex justify-between items-center text-[10px] mt-1 font-mono-numbers">
                          <span className={p.low ? 'text-rose-600 font-bold' : 'text-slate-500'}>{p.stock}</span>
                          <span className="font-bold text-emerald-700">Rs. {p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. GARMENTS & APPAREL DEMO */}
          {/* ========================================================= */}
          {selectedDemo === 'garments' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                <span className="text-slate-400 uppercase text-[10px] font-bold">Garments Menu:</span>
                {[
                  'Overview',
                  'SKU Matrix',
                  'Size & Color Variants',
                  'Fabric Stock',
                  'Collections',
                  'Sales',
                  'Fitting Orders',
                  'Reports',
                ].map((item, idx) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-md ${
                      idx === 0 ? 'bg-[#0B1F33] text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Garments Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Today's Sales</span>
                  <span className="text-xl font-bold font-mono-numbers text-[#0B1F33]">Rs. 142,500</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">+24% Weekend Traffic</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Active Designs</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-900">64 SKUs</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Fall '26 Line</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Variant Combos</span>
                  <span className="text-xl font-bold font-mono-numbers text-teal-700">210 Combos</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Size × Color Matrix</span>
                </div>
                <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200">
                  <span className="text-[11px] text-rose-800 font-semibold block">Low Stock Variants</span>
                  <span className="text-xl font-bold font-mono-numbers text-rose-600">3 Variants</span>
                  <span className="text-[10px] text-rose-700 block mt-1">Black (XL), Navy (L)</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Monthly Revenue</span>
                  <span className="text-xl font-bold font-mono-numbers text-[#0B1F33]">Rs. 890,000</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">October Season</span>
                </div>
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-300">
                  <span className="text-[11px] text-emerald-800 font-semibold block">Net Margin</span>
                  <span className="text-xl font-bold font-mono-numbers text-emerald-700">Rs. 320,000</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">36.0% Operating</span>
                </div>
              </div>

              {/* Garments Size & Color Variant Matrix Highlight */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">
                      Apparel SKU Matrix
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      Product: Premium Embroidered Cotton Kurta
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono-numbers">
                    <span>Purchase: <strong className="text-slate-900">Rs. 1,800</strong></span>
                    <span>Sale: <strong className="text-emerald-700 font-bold">Rs. 3,450</strong></span>
                    <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">Margin: 47.8%</span>
                  </div>
                </div>

                {/* Size / Color Grid */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold font-sans">
                        <th className="py-2.5 px-3">Color Variant</th>
                        <th className="py-2.5 px-3 text-center">Size S</th>
                        <th className="py-2.5 px-3 text-center">Size M</th>
                        <th className="py-2.5 px-3 text-center">Size L</th>
                        <th className="py-2.5 px-3 text-center">Size XL</th>
                        <th className="py-2.5 px-3 text-center">Size XXL</th>
                        <th className="py-2.5 px-3 text-right">Total In Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono-numbers text-slate-800">
                      {apparelMatrix.map((row) => (
                        <tr key={row.color}>
                          <td className="py-2.5 px-3 font-sans font-bold text-slate-900 flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full inline-block border border-slate-400"
                              style={{ backgroundColor: row.colorHex }}
                            />
                            <span>{row.color}</span>
                          </td>
                          {(['s', 'm', 'l', 'xl', 'xxl'] as const).map((sz) => {
                            const count = row[sz];
                            const isLow = count <= 3;
                            const isSelected = selectedCell?.color === row.color && selectedCell?.size === sz.toUpperCase();
                            return (
                              <td
                                key={sz}
                                onClick={() => setSelectedCell({ color: row.color, size: sz.toUpperCase(), count })}
                                className={`py-2.5 px-3 text-center cursor-pointer transition-colors ${
                                  isSelected
                                    ? 'bg-teal-100 ring-2 ring-teal-600 font-bold'
                                    : isLow
                                    ? 'bg-rose-50 text-rose-600 font-bold'
                                    : 'hover:bg-slate-100'
                                }`}
                              >
                                {count} pcs {isLow && <span className="text-[10px] block text-rose-600">(Low)</span>}
                              </td>
                            );
                          })}
                          <td className="py-2.5 px-3 text-right font-bold">
                            {row.s + row.m + row.l + row.xl + row.xxl} pcs
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Interactive Variant Adjustment Box */}
                {selectedCell && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-800">
                        Selected: {selectedCell.color} — Size {selectedCell.size}
                      </span>
                      <span className="text-slate-500 ml-2">Current On-Hand: {selectedCell.count} pcs</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAdjustApparelStock(-1)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-100 text-slate-700 cursor-pointer"
                      >
                        - Record 1 Sale
                      </button>
                      <button
                        onClick={() => handleAdjustApparelStock(5)}
                        className="px-3 py-1.5 rounded-lg bg-[#0F766E] font-bold text-white hover:bg-[#115E59] cursor-pointer"
                      >
                        + Restock 5 Pcs
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. E-COMMERCE BRAND DEMO */}
          {/* ========================================================= */}
          {selectedDemo === 'ecommerce' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                <span className="text-slate-400 uppercase text-[10px] font-bold">E-Commerce Menu:</span>
                {[
                  'Overview',
                  'Orders',
                  'Shipments & COD',
                  'Trax/PostEx Reconciler',
                  'RTO & Returns',
                  'Ad Spend ROAS',
                  'True Net Profit',
                  'Reports',
                ].map((item, idx) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-md ${
                      idx === 0 ? 'bg-[#0B1F33] text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Exact Formula: Revenue - COGS - Shipping - Ads - Overhead = Net Profit */}
              <div className="p-5 bg-gradient-to-r from-slate-900 to-[#0B1F33] text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Calculated Take-Home Net Profit Formula
                  </span>
                  <div className="text-sm font-mono-numbers text-slate-200 mt-1">
                    Revenue (Rs. {ecomRevenue.toLocaleString()}) − COGS (Rs. {ecomCogs.toLocaleString()}) − Shipping (Rs. {ecomShipping.toLocaleString()}) − Ads (Rs. {ecomAds.toLocaleString()}) − Overhead (Rs. {ecomOther.toLocaleString()})
                  </div>
                </div>
                <div className="bg-emerald-950 border border-emerald-500/40 px-5 py-3 rounded-xl text-right shrink-0">
                  <span className="text-[11px] text-emerald-300 font-semibold block">True Net Profit</span>
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono-numbers">
                    Rs. {ecomNetProfit.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* COD Logistics Reconciliation Tracker */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Live Courier COD Reconciliation (Trax, PostEx, TCS)
                  </h4>
                  <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
                    Auto Remittance Sync
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-bold">
                        <th className="p-2.5">Order ID</th>
                        <th className="p-2.5">Courier Rail</th>
                        <th className="p-2.5">Airway Bill / CN #</th>
                        <th className="p-2.5">Destination</th>
                        <th className="p-2.5 text-right">COD Value</th>
                        <th className="p-2.5 text-center">Payout Status</th>
                        <th className="p-2.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono-numbers text-slate-800">
                      {codOrders.map((o) => (
                        <tr key={o.id}>
                          <td className="p-2.5 font-bold font-sans">{o.id}</td>
                          <td className="p-2.5 font-sans">{o.courier}</td>
                          <td className="p-2.5 text-slate-500">{o.cn}</td>
                          <td className="p-2.5 font-sans">{o.city}</td>
                          <td className="p-2.5 text-right font-bold text-slate-900">Rs. {o.amount.toLocaleString()}</td>
                          <td className="p-2.5 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                o.status.includes('Remitted')
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : o.status.includes('RTO')
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="p-2.5 text-center">
                            {o.status !== 'Remitted to Bank' && !o.status.includes('RTO') ? (
                              <button
                                onClick={() => handleVerifyRemittance(o.id)}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-sans font-bold cursor-pointer"
                              >
                                Reconcile Payout
                              </button>
                            ) : (
                              <span className="text-slate-400 text-[10px] font-sans">Reconciled</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. FREELANCER & SERVICES DEMO */}
          {/* ========================================================= */}
          {selectedDemo === 'freelancer' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                <span className="text-slate-400 uppercase text-[10px] font-bold">Freelancer Menu:</span>
                {[
                  'Overview',
                  'Clients',
                  'Milestone Contracts',
                  'Retainers',
                  'Invoices',
                  'Payment Rails',
                  'Expenses',
                  'Receivables',
                  'Reports',
                ].map((item, idx) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-md ${
                      idx === 0 ? 'bg-[#0B1F33] text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Freelancer Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Active Clients</span>
                  <span className="text-lg font-bold font-mono-numbers text-slate-900">8 Clients</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Corporate & DTC</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Live Contracts</span>
                  <span className="text-lg font-bold font-mono-numbers text-slate-900">12 Projects</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Design & Code</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Total Invoiced</span>
                  <span className="text-lg font-bold font-mono-numbers text-slate-900">Rs. 455,000</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Milestones</span>
                </div>
                <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-300">
                  <span className="text-[11px] text-emerald-800 font-bold block">Received</span>
                  <span className="text-lg font-bold font-mono-numbers text-emerald-700">Rs. 340,000</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">74.7% Collected</span>
                </div>
                <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-300">
                  <span className="text-[11px] text-amber-800 font-bold block">Pending Due</span>
                  <span className="text-lg font-bold font-mono-numbers text-amber-600">Rs. 115,000</span>
                  <span className="text-[10px] text-amber-700 block mt-0.5">Receivables</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Tool Overhead</span>
                  <span className="text-lg font-bold font-mono-numbers text-rose-600">Rs. 32,000</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Figma, Vercel</span>
                </div>
                <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-300">
                  <span className="text-[11px] text-emerald-800 font-bold block">Take-Home</span>
                  <span className="text-lg font-bold font-mono-numbers text-emerald-700">Rs. 308,000</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">Net Profit</span>
                </div>
              </div>

              {/* Exact Milestone Progress Tracker */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">
                      Active Milestone Contract
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      Client: ABC Clothing · Project: Full Web Design & Mobile App
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Contract Value: Rs. 80,000
                  </span>
                </div>

                <div className="space-y-2">
                  {freelancerMilestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">{m.title}</span>
                        <span className="text-[11px] text-slate-400 font-mono-numbers">{m.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono-numbers font-bold text-sm text-slate-900">
                          Rs. {m.amount.toLocaleString()}
                        </span>
                        {m.status === 'Paid' ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Paid & Released
                          </span>
                        ) : (
                          <button
                            onClick={() => handleReleaseMilestone(m.id)}
                            className="px-3 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                          >
                            Release Milestone Payment
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. WHOLESALE & DISTRIBUTION DEMO */}
          {/* ========================================================= */}
          {selectedDemo === 'wholesale' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                <span className="text-slate-400 uppercase text-[10px] font-bold">Wholesale Menu:</span>
                {[
                  'Overview',
                  'Bulk Orders',
                  'Carton Tiers',
                  'Commercial Credit (Udhaar)',
                  'Loading Chalan',
                  'Van Routes',
                  'Distributor Margins',
                  'Reports',
                ].map((item, idx) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-md ${
                      idx === 0 ? 'bg-[#0B1F33] text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Wholesale Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Daily Billing</span>
                  <span className="text-xl font-bold font-mono-numbers text-[#0B1F33]">Rs. 920,000</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">High Volume</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Dispatched Cartons</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-900">340 Cartons</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Today's Fleet</span>
                </div>
                <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                  <span className="text-[11px] text-amber-800 font-semibold block">Commercial Udhaar</span>
                  <span className="text-xl font-bold font-mono-numbers text-amber-600">Rs. 640,000</span>
                  <span className="text-[10px] text-amber-700 block mt-1">30-Day Trade Credit</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Active Wholesalers</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-900">28 Dealers</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Regional Network</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Delivery Vans</span>
                  <span className="text-xl font-bold font-mono-numbers text-teal-700">6 Routes</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Active Gate Passes</span>
                </div>
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-300">
                  <span className="text-[11px] text-emerald-800 font-semibold block">Trading Spread</span>
                  <span className="text-xl font-bold font-mono-numbers text-emerald-700">14.5% Spread</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">Net Margin</span>
                </div>
              </div>

              {/* Tiered Bulk Pricing Calculator */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">
                      Wholesale Tier Pricing Engine
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      Bulk Order Calculator & Loading Chalan Issue
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-mono-numbers">MOQ: 10 Cartons</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Select Product</label>
                    <select
                      value={wholesaleProduct}
                      onChange={(e) => setWholesaleProduct(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                    >
                      <option>Cooking Oil 16L Tin</option>
                      <option>Super Kernel Basmati Rice 50kg Bora</option>
                      <option>Flour / Atta 20kg Mill Bag</option>
                      <option>White Refined Sugar 50kg Sack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Quantity: <strong className="font-mono-numbers">{wholesaleCartons} Cartons</strong>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={wholesaleCartons}
                      onChange={(e) => setWholesaleCartons(Number(e.target.value))}
                      className="w-full mt-2 accent-[#0F766E]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono-numbers mt-1">
                      <span>1-19: Rs. 4,500</span>
                      <span>20-49: Rs. 4,150</span>
                      <span>50+: Rs. 3,850</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Unit Rate / Carton</span>
                      <span className="text-base font-bold text-emerald-700 font-mono-numbers">
                        Rs. {wholesaleRate.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-800">Total Billed:</span>
                      <span className="text-base font-extrabold text-[#0B1F33] font-mono-numbers">
                        Rs. {wholesaleTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast(`Issued Delivery Gate Pass #GP-8491 for ${wholesaleCartons} Cartons`)}
                    className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Generate Loading Chalan / Gate Pass</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. ELECTRONICS & MOBILE DEMO */}
          {/* ========================================================= */}
          {selectedDemo === 'electronics' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                <span className="text-slate-400 uppercase text-[10px] font-bold">Electronics Menu:</span>
                {[
                  'Overview',
                  'Sales',
                  'IMEI / Serial Tracker',
                  'PTA & Warranty Logs',
                  'Installment Plans',
                  'Trade-in Exchange',
                  'Accessory Margins',
                  'Reports',
                ].map((item, idx) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-md ${
                      idx === 0 ? 'bg-[#0B1F33] text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Electronics Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Today's Sales</span>
                  <span className="text-lg font-bold font-mono-numbers text-slate-900">Rs. 580,000</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">High Ticket</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Hardware SKUs</span>
                  <span className="text-lg font-bold font-mono-numbers text-slate-900">42 SKUs</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Mobile & Tablets</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Inventory Value</span>
                  <span className="text-lg font-bold font-mono-numbers text-slate-900">Rs. 2.45M</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Verified IMEI</span>
                </div>
                <div className="bg-teal-50/60 p-3.5 rounded-xl border border-teal-300">
                  <span className="text-[11px] text-teal-800 font-bold block">Active Warranties</span>
                  <span className="text-lg font-bold font-mono-numbers text-teal-700">38 Registered</span>
                  <span className="text-[10px] text-teal-600 block mt-0.5">Official Mercantile</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Installment Accounts</span>
                  <span className="text-lg font-bold font-mono-numbers text-slate-900">14 Handsets</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Active EMI</span>
                </div>
                <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-300">
                  <span className="text-[11px] text-emerald-800 font-bold block">Net Profit</span>
                  <span className="text-lg font-bold font-mono-numbers text-emerald-700">Rs. 92,000</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">Hardware + Acc</span>
                </div>
              </div>

              {/* IMEI / Serial Lookup Tool */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">
                      Device Verification Engine
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      Live IMEI & PTA Warranty Verification
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedImei('354892019482711')}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold cursor-pointer ${
                        selectedImei === '354892019482711' ? 'bg-[#0B1F33] text-white' : 'bg-slate-100'
                      }`}
                    >
                      Galaxy S24 Ultra
                    </button>
                    <button
                      onClick={() => setSelectedImei('G6TX79QY8K')}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold cursor-pointer ${
                        selectedImei === 'G6TX79QY8K' ? 'bg-[#0B1F33] text-white' : 'bg-slate-100'
                      }`}
                    >
                      iPhone 15 Pro Max
                    </button>
                  </div>
                </div>

                {imeiDatabase[selectedImei] && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Device Model:</span>
                      <strong className="text-slate-900 text-sm">{imeiDatabase[selectedImei].model}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Serial / IMEI:</span>
                      <span className="font-mono-numbers font-bold text-teal-800">{selectedImei}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">PTA Compliance:</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        {imeiDatabase[selectedImei].pta}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Official Brand Warranty:</span>
                      <span className="font-semibold text-slate-800">{imeiDatabase[selectedImei].warranty}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. COSMETICS & BEAUTY DEMO */}
          {/* ========================================================= */}
          {selectedDemo === 'cosmetics' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                <span className="text-slate-400 uppercase text-[10px] font-bold">Cosmetics Menu:</span>
                {[
                  'Overview',
                  'Catalog',
                  'Batch & Expiry Tracker',
                  'Brand Margins',
                  'Routine Bundles',
                  'Supplier Bills',
                  'Customer History',
                  'Reports',
                ].map((item, idx) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-md ${
                      idx === 0 ? 'bg-[#0B1F33] text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Cosmetics Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Today's Sales</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-900">Rs. 94,000</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">Skincare & Makeup</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Inventory on Hand</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-900">280 Units</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Rs. 410,000 Valuation</span>
                </div>
                <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200">
                  <span className="text-[11px] text-rose-800 font-semibold block">Low Stock Alert</span>
                  <span className="text-xl font-bold font-mono-numbers text-rose-600">3 Items</span>
                  <span className="text-[10px] text-rose-700 block mt-1">Sunscreen, Cleanser</span>
                </div>
                <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                  <span className="text-[11px] text-amber-800 font-semibold block">Expiring Batches</span>
                  <span className="text-xl font-bold font-mono-numbers text-amber-600">2 Batches</span>
                  <span className="text-[10px] text-amber-700 block mt-1">&lt; 60 Days Clearance</span>
                </div>
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-300">
                  <span className="text-[11px] text-emerald-800 font-semibold block">Net Margin</span>
                  <span className="text-xl font-bold font-mono-numbers text-emerald-700">Rs. 42,500</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">45.2% Margin</span>
                </div>
              </div>

              {/* Expiry Tracking Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold font-sans">
                      <th className="py-2.5 px-3">Cosmetics Item</th>
                      <th className="py-2.5 px-3">Batch #</th>
                      <th className="py-2.5 px-3">Expiry Date</th>
                      <th className="py-2.5 px-3 text-right">Cost Price</th>
                      <th className="py-2.5 px-3 text-right">Sale Price</th>
                      <th className="py-2.5 px-3 text-center">Stock</th>
                      <th className="py-2.5 px-right text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono-numbers text-slate-800">
                    {[
                      { name: 'Ruby Rose Satin Lipstick', batch: 'RR-8812', exp: 'Dec 2026', cost: 650, sale: 1200, stock: '18 pcs', status: 'Expiring Soon' },
                      { name: 'Brightening Vitamin C Cleanser 150ml', batch: 'VC-4491', exp: 'Nov 2026', cost: 450, sale: 850, stock: '6 tubes', status: 'Near Expiry (Low)' },
                      { name: 'Hyaluronic Hydration Serum 30ml', batch: 'HH-1029', exp: 'Jun 2027', cost: 1100, sale: 2100, stock: '32 pcs', status: 'Healthy' },
                      { name: 'Ceramide Barrier Moisturizer 50g', batch: 'CB-9941', exp: 'Aug 2027', cost: 950, sale: 1850, stock: '28 jars', status: 'Healthy' },
                    ].map((row) => (
                      <tr key={row.name}>
                        <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{row.name}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{row.batch}</td>
                        <td className="py-2.5 px-3">{row.exp}</td>
                        <td className="py-2.5 px-3 text-right text-slate-500">Rs. {row.cost}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-700">Rs. {row.sale}</td>
                        <td className="py-2.5 px-3 text-center">{row.stock}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.status.includes('Near') || row.status.includes('Expiring')
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 8. SERVICE BUSINESSES / WORKSHOP DEMO */}
          {/* ========================================================= */}
          {selectedDemo === 'services' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                <span className="text-slate-400 uppercase text-[10px] font-bold">Services Menu:</span>
                {[
                  'Overview',
                  'Active Job Cards',
                  'Work Orders',
                  'Labor vs Parts Split',
                  'Technician Commissions',
                  'Vehicle History',
                  'Appointments',
                  'Reports',
                ].map((item, idx) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-md ${
                      idx === 0 ? 'bg-[#0B1F33] text-white' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Service Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Daily Billings</span>
                  <span className="text-xl font-bold font-mono-numbers text-[#0B1F33]">Rs. 86,000</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">9 Bay Tickets</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Pure Labor Fees</span>
                  <span className="text-xl font-bold font-mono-numbers text-emerald-700">Rs. 48,000</span>
                  <span className="text-[10px] text-slate-400 block mt-1">100% Margin Fee</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Spare Parts Installed</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-900">Rs. 38,000</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Parts & Fluids</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Staff Commissions</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-800">Rs. 19,200</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Technician Share</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Average Ticket</span>
                  <span className="text-xl font-bold font-mono-numbers text-teal-700">Rs. 9,550</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Per Vehicle</span>
                </div>
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-300">
                  <span className="text-[11px] text-emerald-800 font-semibold block">Net Workshop Profit</span>
                  <span className="text-xl font-bold font-mono-numbers text-emerald-700">Rs. 34,500</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">Take-Home</span>
                </div>
              </div>

              {/* Interactive Vehicle Job Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">
                      Active Work Order #JC-9842
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      Vehicle: Toyota Corolla Altis 1.6 (Reg: LEB-8491)
                    </h3>
                    <p className="text-xs text-slate-500">Customer: Tariq Mehmood · 0321-4455667</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Job Card Grand Total</span>
                    <span className="text-xl font-bold font-mono-numbers text-slate-900">
                      Rs. {totalJobCard.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {jobTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => toggleTask(t.id)}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={t.done}
                          onChange={() => {}}
                          className="rounded text-[#0F766E] focus:ring-[#0F766E]"
                        />
                        <span className={`font-semibold ${t.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {t.task}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 font-mono-numbers">
                        <span className="text-slate-500">Labor: Rs. {t.labor.toLocaleString()}</span>
                        <span className="text-slate-500">Parts: Rs. {t.parts.toLocaleString()}</span>
                        <span className="font-bold text-slate-900">
                          Total: Rs. {(t.labor + t.parts).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Job card #JC-9842 marked complete & receipt sent via WhatsApp!')}
                    className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Complete Job Card & Issue Receipt</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ahmed Interactive Simulator Modals */}
      {ahmedModal === 'add' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-[#0B1F33] mb-1">Add Customer Udhaar (Credit)</h3>
            <p className="text-xs text-slate-500 mb-4">Adding credit transaction for Ahmed (Al-Madina Store)</p>
            <form onSubmit={handleAhmedAddUdhaar} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (Rs.)</label>
                <input
                  type="number"
                  min="1"
                  value={ahmedInputAmount}
                  onChange={(e) => setAhmedInputAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono-numbers text-base font-semibold focus:outline-none focus:border-[#0F766E]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Item / Description</label>
                <input
                  type="text"
                  value={ahmedInputDesc}
                  onChange={(e) => setAhmedInputDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0F766E]"
                  required
                />
              </div>
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setAhmedModal(null)}
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

      {ahmedModal === 'pay' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-[#0B1F33] mb-1">Receive Payment from Ahmed</h3>
            <p className="text-xs text-slate-500 mb-4">Record cash payment to settle customer balance</p>
            <form onSubmit={handleAhmedPay} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Amount (Rs.)</label>
                <input
                  type="number"
                  min="1"
                  value={ahmedInputAmount}
                  onChange={(e) => setAhmedInputAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono-numbers text-base font-semibold focus:outline-none focus:border-[#0F766E]"
                  required
                />
              </div>
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setAhmedModal(null)}
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

      {ahmedModal === 'whatsapp' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-emerald-600">
              <MessageCircle className="w-5 h-5" />
              <h3 className="text-base font-bold">WhatsApp Balance Reminder</h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">Pre-formatted message ready to send to Ahmed:</p>
            <div className="bg-[#E7F8EE] p-4 rounded-xl border border-emerald-200 text-xs text-slate-800 leading-relaxed font-sans mb-4">
              {ahmedWhatsAppText}
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setAhmedModal(null)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                Close
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(ahmedWhatsAppText)}`}
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
    </section>
  );
};
