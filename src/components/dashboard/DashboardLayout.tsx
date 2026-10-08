import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Users,
  Boxes,
  Receipt,
  CreditCard,
  FileText,
  BarChart3,
  LineChart,
  MessageSquare,
  Settings,
  UserCheck,
  Search,
  Bell,
  Plus,
  ChevronDown,
  LogOut,
  Building2,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuickAddModal } from './modals/QuickAddModal';
import { InvoiceModal } from './modals/InvoiceModal';
import { CustomerStatementModal } from './modals/CustomerStatementModal';
import { CustomerProfileModal } from './modals/CustomerProfileModal';
import { DataIsolationTestModal } from './modals/DataIsolationTestModal';
import { AddBusinessModal } from './modals/AddBusinessModal';
import { OverviewView } from './views/OverviewView';
import { SalesView } from './views/SalesView';
import { OrdersView } from './views/OrdersView';
import { CustomersKhataView } from './views/CustomersKhataView';
import { InventoryView } from './views/InventoryView';
import { ExpensesView } from './views/ExpensesView';
import { PaymentsView } from './views/PaymentsView';
import { InvoicesView } from './views/InvoicesView';
import { ReportsView } from './views/ReportsView';
import { AnalyticsView } from './views/AnalyticsView';
import { WhatsAppHubView } from './views/WhatsAppHubView';
import { EmployeesView } from './views/EmployeesView';
import { SettingsView } from './views/SettingsView';
import { Customer, Invoice } from '../../types';

export const DashboardLayout: React.FC = () => {
  const {
    currentUser,
    currentBusiness,
    businesses,
    setCurrentBusinessId,
    currentBranchId,
    setCurrentBranchId,
    activeView,
    setActiveView,
    setViewMode,
    setIsAuthenticated,
    logoutUser,
    globalSearch,
    setGlobalSearch,
    toastMessage,
    showToast,
    customers,
    invoices,
    isIsolationTestModalOpen,
    setIsIsolationTestModalOpen,
  } = useApp();

  // Modals & Popovers
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [quickAddTab, setQuickAddTab] = useState<any>('sale');
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);
  const [activeCustomerStatement, setActiveCustomerStatement] = useState<Customer | null>(null);
  const [activeCustomerProfile, setActiveCustomerProfile] = useState<Customer | null>(null);
  const [preSelectedCustomerForModal, setPreSelectedCustomerForModal] = useState<string | undefined>(undefined);

  const [bizDropdownOpen, setBizDropdownOpen] = useState(false);
  const [addBusinessModalOpen, setAddBusinessModalOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Quick Add handler
  const handleOpenQuickAdd = (tab: any = 'sale') => {
    setQuickAddTab(tab);
    setQuickAddOpen(true);
  };

  // Nav items matching Section 11: Desktop sidebar
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'sales', label: 'Sales', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'employees', label: 'Team Roles', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logoutUser();
  };

  // Quick helper for customer operations from khata view
  const handleAddUdhaarQuick = (cust: Customer) => {
    setPreSelectedCustomerForModal(cust.id);
    handleOpenQuickAdd('sale');
  };

  const handleReceivePaymentQuick = (cust: Customer) => {
    setPreSelectedCustomerForModal(cust.id);
    handleOpenQuickAdd('payment');
  };

  const currentBranch = currentBusiness.branches.find((b) => b.id === currentBranchId) || currentBusiness.branches[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased text-slate-800">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#0B1F33] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-emerald-500/40 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (Section 11) */}
        <aside
          className={`hidden md:flex flex-col bg-[#0B1F33] text-white shrink-0 border-r border-slate-800 transition-all duration-200 z-30 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Brand Logo Lockup */}
          <div className="p-4.5 border-b border-slate-800 flex items-center justify-between">
            {!sidebarCollapsed ? (
              <Logo size="md" variant="light" />
            ) : (
              <Logo size="sm" variant="light" markOnly={true} />
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-xs hidden lg:block cursor-pointer"
              title="Toggle sidebar size"
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Business Switcher Box (Section 13) */}
          {!sidebarCollapsed && (
            <div className="p-3 border-b border-slate-800/80">
              <div className="relative">
                <button
                  onClick={() => setBizDropdownOpen(!bizDropdownOpen)}
                  className="w-full p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/70 text-left flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Active Business
                    </span>
                    <span className="text-xs font-bold text-white truncate block">
                      {currentBusiness.name}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                </button>

                {bizDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-40">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-800">
                      Switch Business Account:
                    </div>
                    {businesses.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          setCurrentBusinessId(b.id);
                          setBizDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 ${
                          b.id === currentBusiness.id ? 'text-emerald-400 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <span className="truncate">{b.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase">{b.type}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setBizDropdownOpen(false);
                        setAddBusinessModalOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-emerald-400 hover:bg-slate-800 border-t border-slate-800 font-semibold cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Business</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Branch Selector (Section 14) */}
              <div className="relative mt-2">
                <button
                  onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-left flex items-center justify-between text-xs text-slate-300 border border-slate-800 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{currentBranch?.name || 'Main Branch'}</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {branchDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-40">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-800">
                      Select Branch Location:
                    </div>
                    {currentBusiness.branches.map((br) => (
                      <button
                        key={br.id}
                        onClick={() => {
                          setCurrentBranchId(br.id);
                          setBranchDropdownOpen(false);
                          showToast(`Switched to ${br.name}`);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 ${
                          br.id === currentBranchId ? 'text-emerald-400 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <span>{br.name}</span>
                        <span className="text-[10px] text-slate-500">{br.city}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0F766E] text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-slate-800 space-y-1">
            <button
              onClick={() => setViewMode('landing')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>View Public Site</span>}
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar (Section 11) */}
          <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-20">
            {/* Left: Mobile Brand & Search */}
            <div className="flex items-center gap-3 flex-1 max-w-lg">
              <div className="md:hidden">
                <Logo size="sm" variant="dark" markOnly={true} />
              </div>

              {/* Global Search Bar */}
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search sales, customers, SKUs, invoices..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0F766E] transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Right: Isolation Test + Quick Add + Notifications + User */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mandatory Data Isolation Test Button */}
              <button
                onClick={() => setIsIsolationTestModalOpen(true)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap"
                title="Open Data Isolation & Multi-Account QA Suite"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="hidden md:inline">Isolation Test</span>
                <span className="md:hidden">QA</span>
              </button>

              {/* Quick Add Dropdown Button (Section 11) */}
              <div className="relative">
                <button
                  onClick={() => handleOpenQuickAdd('sale')}
                  className="px-3 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">+ Quick Add</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-800">Notifications</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">2 New</span>
                    </div>
                    <div className="space-y-2 py-2">
                      <div className="text-xs p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                        <strong className="block text-[11px]">Udhaar Reminder:</strong>
                        Customer balances active in {currentBusiness.name}.
                      </div>
                      <div className="text-xs p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                        <strong className="block text-[11px]">Data Partitioning:</strong>
                        All records strictly scoped to {currentBusiness.name}.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Pill */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-[#0B1F33] text-emerald-400 font-bold text-xs flex items-center justify-center">
                  {currentUser ? currentUser.name.charAt(0) : 'M'}
                </div>
                <div className="hidden lg:block text-left leading-tight">
                  <span className="text-xs font-bold text-slate-800 block truncate max-w-[120px]">
                    {currentUser ? currentUser.name : 'Merchant'}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {currentUser ? currentUser.phone : '0300-1111111'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Scrollable Viewport */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
            {activeView === 'overview' && (
              <OverviewView
                onQuickAdd={handleOpenQuickAdd}
                onOpenStatement={(cust) => setActiveCustomerStatement(cust)}
                onOpenInvoice={(inv) => setActiveInvoice(inv)}
              />
            )}
            {activeView === 'sales' && (
              <SalesView
                onNewSale={() => handleOpenQuickAdd('sale')}
                onOpenInvoice={(inv) => setActiveInvoice(inv)}
              />
            )}
            {activeView === 'orders' && (
              <OrdersView onNewOrder={() => handleOpenQuickAdd('order')} />
            )}
            {activeView === 'customers' && (
              <CustomersKhataView
                onAddCustomer={() => {
                  setPreSelectedCustomerForModal(undefined);
                  handleOpenQuickAdd('customer');
                }}
                onOpenStatement={(cust) => setActiveCustomerStatement(cust)}
                onOpenCustomerProfile={(cust) => setActiveCustomerProfile(cust)}
                onAddUdhaarQuick={handleAddUdhaarQuick}
                onReceivePaymentQuick={handleReceivePaymentQuick}
              />
            )}
            {activeView === 'inventory' && (
              <InventoryView onAddProduct={() => handleOpenQuickAdd('product')} />
            )}
            {activeView === 'expenses' && (
              <ExpensesView onAddExpense={() => handleOpenQuickAdd('expense')} />
            )}
            {activeView === 'payments' && (
              <PaymentsView onReceivePayment={() => handleOpenQuickAdd('payment')} />
            )}
            {activeView === 'invoices' && (
              <InvoicesView
                onNewSale={() => handleOpenQuickAdd('sale')}
                onOpenInvoice={(inv) => setActiveInvoice(inv)}
              />
            )}
            {activeView === 'reports' && <ReportsView />}
            {activeView === 'analytics' && <AnalyticsView />}
            {activeView === 'whatsapp' && <WhatsAppHubView />}
            {activeView === 'employees' && <EmployeesView />}
            {activeView === 'settings' && <SettingsView />}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Section 20) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveView('overview')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold cursor-pointer ${
            activeView === 'overview' ? 'text-[#0F766E]' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveView('sales')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold cursor-pointer ${
            activeView === 'sales' ? 'text-[#0F766E]' : 'text-slate-500'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span>Sales</span>
        </button>

        {/* Center Primary (+) Action Button */}
        <button
          onClick={() => handleOpenQuickAdd('sale')}
          className="w-12 h-12 -mt-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center shadow-lg shadow-teal-900/30 cursor-pointer"
          title="Quick Add Action"
        >
          <Plus className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveView('customers')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold cursor-pointer ${
            activeView === 'customers' ? 'text-[#0F766E]' : 'text-slate-500'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Customers</span>
        </button>

        <button
          onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold cursor-pointer ${
            mobileMoreOpen ? 'text-[#0F766E]' : 'text-slate-500'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile "More" Drawer */}
      {mobileMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">All Modules & Settings</span>
              <button
                onClick={() => setMobileMoreOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { id: 'orders', label: 'Orders', icon: Package },
                { id: 'inventory', label: 'Inventory', icon: Boxes },
                { id: 'expenses', label: 'Expenses', icon: Receipt },
                { id: 'payments', label: 'Payments', icon: CreditCard },
                { id: 'invoices', label: 'Invoices', icon: FileText },
                { id: 'reports', label: 'Reports', icon: BarChart3 },
                { id: 'analytics', label: 'Analytics', icon: LineChart },
                { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                { id: 'employees', label: 'Team', icon: UserCheck },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveView(m.id);
                      setMobileMoreOpen(false);
                    }}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 flex flex-col items-center text-center cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-[#0F766E] mb-1" />
                    <span className="text-[11px] font-semibold text-slate-800">{m.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setMobileMoreOpen(false);
                  setViewMode('landing');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700"
              >
                Public Website
              </button>
              <button
                onClick={() => {
                  setMobileMoreOpen(false);
                  handleLogout();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-50 text-xs font-semibold text-rose-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <QuickAddModal
        isOpen={quickAddOpen}
        onClose={() => {
          setQuickAddOpen(false);
          setPreSelectedCustomerForModal(undefined);
        }}
        initialTab={quickAddTab}
        preSelectedCustomerId={preSelectedCustomerForModal}
      />

      <CustomerProfileModal
        customer={activeCustomerProfile}
        onClose={() => setActiveCustomerProfile(null)}
        onAddCredit={(cust) => {
          setActiveCustomerProfile(null);
          handleAddUdhaarQuick(cust);
        }}
        onAddPayment={(cust) => {
          setActiveCustomerProfile(null);
          handleReceivePaymentQuick(cust);
        }}
        onOpenStatementPDF={(cust) => {
          setActiveCustomerStatement(cust);
        }}
      />

      <InvoiceModal
        invoice={activeInvoice}
        onClose={() => setActiveInvoice(null)}
      />

      <CustomerStatementModal
        customer={activeCustomerStatement}
        onClose={() => setActiveCustomerStatement(null)}
      />

      <DataIsolationTestModal
        isOpen={isIsolationTestModalOpen}
        onClose={() => setIsIsolationTestModalOpen(false)}
      />

      <AddBusinessModal
        isOpen={addBusinessModalOpen}
        onClose={() => setAddBusinessModalOpen(false)}
      />
    </div>
  );
};
