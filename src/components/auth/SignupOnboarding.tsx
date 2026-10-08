import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Search,
  Store,
  Shirt,
  Sparkles,
  Smartphone,
  Home,
  Pill,
  UtensilsCrossed,
  Wrench,
  BookOpen,
  Armchair,
  Gem,
  Footprints,
  Cake,
  Car,
  Wheat,
  Truck,
  Globe,
  Briefcase,
  Building2,
  Sliders,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessType } from '../../types';

interface SignupOnboardingProps {
  onBackToHome: () => void;
  onGoToLogin: () => void;
}

export interface BusinessCategoryItem {
  id: string;
  name: string;
  group: 'Popular' | 'Retail' | 'Food' | 'Services' | 'Wholesale & B2B' | 'Digital';
  icon: React.FC<{ className?: string }>;
  mappedType: BusinessType;
  defaultTagline: string;
}

export const ALL_BUSINESS_PRESETS: BusinessCategoryItem[] = [
  { id: 'kiryana', name: 'Grocery / Kiryana', group: 'Popular', icon: Store, mappedType: 'kiryana', defaultTagline: 'FMCG counter sales, customer udhaar khata & cash drawer' },
  { id: 'clothing', name: 'Clothing / Garments', group: 'Popular', icon: Shirt, mappedType: 'garments', defaultTagline: 'Variant sizes, colors, seasonal fabric & boutique counter' },
  { id: 'ecommerce', name: 'E-commerce / Online Store', group: 'Popular', icon: Globe, mappedType: 'ecommerce', defaultTagline: 'Trax / TCS COD parcels, Shopify orders & ad profit' },
  { id: 'services', name: 'Agency / Services', group: 'Popular', icon: Building2, mappedType: 'services', defaultTagline: 'Client milestones, retainer invoices & operational expenses' },
  { id: 'wholesale', name: 'Wholesale / Distribution', group: 'Popular', icon: Truck, mappedType: 'wholesale', defaultTagline: 'Bulk supply orders, loading chalan & ledger reconciliation' },
  { id: 'food', name: 'Food / Restaurant', group: 'Food', icon: UtensilsCrossed, mappedType: 'retail', defaultTagline: 'Dine-in, takeaway slips & fast daily kitchen supplies' },
  { id: 'cosmetics', name: 'Cosmetics / Beauty', group: 'Retail', icon: Sparkles, mappedType: 'cosmetics', defaultTagline: 'Beauty shades, cosmetic batches & supplier invoices' },
  { id: 'mobile', name: 'Mobile & Electronics', group: 'Retail', icon: Smartphone, mappedType: 'electronics', defaultTagline: 'IMEI / Serial numbers, PTA status & warranty tracking' },
  { id: 'household', name: 'Home & Household', group: 'Retail', icon: Home, mappedType: 'retail', defaultTagline: 'Kitchenware, home appliances & walk-in sales' },
  { id: 'pharmacy', name: 'Pharmacy', group: 'Retail', icon: Pill, mappedType: 'retail', defaultTagline: 'Medicine batch numbers, expiry dates & prescription billing' },
  { id: 'hardware', name: 'Hardware / Tools', group: 'Retail', icon: Wrench, mappedType: 'retail', defaultTagline: 'Sanitary fittings, tools, construction hardware & credit khata' },
  { id: 'stationery', name: 'Stationery / Books', group: 'Retail', icon: BookOpen, mappedType: 'retail', defaultTagline: 'School supplies, bulk paper books & office stationery' },
  { id: 'furniture', name: 'Furniture', group: 'Retail', icon: Armchair, mappedType: 'retail', defaultTagline: 'Custom woodwork, showroom pieces & client order deposits' },
  { id: 'jewelry', name: 'Jewelry / Accessories', group: 'Retail', icon: Gem, mappedType: 'retail', defaultTagline: 'Precious items, weight valuation & customer installments' },
  { id: 'shoes', name: 'Shoes / Footwear', group: 'Retail', icon: Footprints, mappedType: 'shoes', defaultTagline: 'Shoe sizing matrix, pairs stock & retail counter' },
  { id: 'bakery', name: 'Bakery / Sweets', group: 'Food', icon: Cake, mappedType: 'retail', defaultTagline: 'Fresh confectionary, mithai boxes & counter billing' },
  { id: 'auto', name: 'Auto Parts / Workshop', group: 'Services', icon: Car, mappedType: 'services', defaultTagline: 'Vehicle repair job cards, spare parts & labor charges' },
  { id: 'agriculture', name: 'Agriculture / Farm', group: 'Wholesale & B2B', icon: Wheat, mappedType: 'wholesale', defaultTagline: 'Seeds, fertilizer sales, crop produce & mandi accounts' },
  { id: 'freelancer', name: 'Freelancer', group: 'Digital', icon: Briefcase, mappedType: 'freelancer', defaultTagline: 'Remote clients, USD/PKR invoices & milestone tracking' },
  { id: 'general', name: 'General Retail', group: 'Retail', icon: Store, mappedType: 'retail', defaultTagline: 'Multi-category retail counter & customer credit register' },
  { id: 'other', name: 'Other / Custom Business', group: 'Services', icon: Sliders, mappedType: 'other', defaultTagline: 'Tailored business modules for unique commercial workflow' },
];

export interface ConfiguredBusinessEntry {
  id: string;
  name: string;
  categoryPresetId: string;
  customTypeName?: string;
  mappedType: BusinessType;
}

export const SignupOnboarding: React.FC<SignupOnboardingProps> = ({ onBackToHome, onGoToLogin }) => {
  const { addNewBusiness, showToast } = useApp();

  // Multi-business state: user can configure 1 or more businesses during signup!
  const [businessesList, setBusinessesList] = useState<ConfiguredBusinessEntry[]>([
    {
      id: 'biz-init-1',
      name: '',
      categoryPresetId: 'kiryana',
      mappedType: 'kiryana',
    },
  ]);

  const [activeEditingIndex, setActiveEditingIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('All');

  // Account Owner Details
  const [ownerName, setOwnerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lahore');
  const [password, setPassword] = useState('');

  // Handle adding another business entry
  const handleAddAnotherBusiness = () => {
    const nextIdx = businessesList.length + 1;
    const newEntry: ConfiguredBusinessEntry = {
      id: `biz-init-${Date.now()}`,
      name: '',
      categoryPresetId: nextIdx === 2 ? 'ecommerce' : 'services',
      mappedType: nextIdx === 2 ? 'ecommerce' : 'services',
    };
    setBusinessesList((prev) => [...prev, newEntry]);
    setActiveEditingIndex(businessesList.length);
  };

  const handleRemoveBusiness = (index: number) => {
    if (businessesList.length <= 1) return;
    setBusinessesList((prev) => prev.filter((_, i) => i !== index));
    if (activeEditingIndex >= index && activeEditingIndex > 0) {
      setActiveEditingIndex(activeEditingIndex - 1);
    }
  };

  const updateBusinessField = (index: number, updates: Partial<ConfiguredBusinessEntry>) => {
    setBusinessesList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  // Filtered business presets based on search query and category filter
  const filteredPresets = ALL_BUSINESS_PRESETS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.defaultTagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup =
      selectedGroupFilter === 'All' ||
      item.group === selectedGroupFilter ||
      (selectedGroupFilter === 'Popular' && item.group === 'Popular');
    return matchesSearch && matchesGroup;
  });

  const popularQuickPills = ['All', 'Popular', 'Retail', 'E-commerce', 'Services', 'Wholesale', 'Food'];

  const handleSelectPreset = (preset: BusinessCategoryItem) => {
    updateBusinessField(activeEditingIndex, {
      categoryPresetId: preset.id,
      mappedType: preset.mappedType,
      customTypeName: preset.id === 'other' ? (businessesList[activeEditingIndex].customTypeName || '') : undefined,
    });
  };

  const currentActiveBiz = businessesList[activeEditingIndex] || businessesList[0];
  const activePreset = ALL_BUSINESS_PRESETS.find((p) => p.id === currentActiveBiz.categoryPresetId) || ALL_BUSINESS_PRESETS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const invalidBiz = businessesList.find((b) => !b.name.trim());
    if (invalidBiz) {
      showToast('Please give a name to each business you added.');
      return;
    }

    if (!mobile.trim()) {
      showToast('Please provide your phone number to sign up.');
      return;
    }

    // Register all configured businesses under this single user account
    businessesList.forEach((biz, idx) => {
      const isCustomOther = biz.categoryPresetId === 'other';
      const cleanName = biz.name.trim();
      const presetInfo = ALL_BUSINESS_PRESETS.find((p) => p.id === biz.categoryPresetId);

      addNewBusiness({
        name: cleanName,
        type: biz.mappedType,
        tagline: isCustomOther && biz.customTypeName ? biz.customTypeName : presetInfo?.defaultTagline,
        phone: mobile.trim(),
        email: email.trim() || undefined,
        city: city.trim() || 'Lahore',
      });
    });

    showToast(`Account created with ${businessesList.length} isolated businesses!`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Website</span>
          </button>
          <Logo size="md" variant="dark" />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Multi-Business · Complete Data Isolation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
              Set Up Your Business
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Run retail, wholesale, e-commerce, services, or any custom business on one account. Your data never gets mixed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business List Tabs / Management */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Your Businesses ({businessesList.length})
                </label>
                <button
                  type="button"
                  onClick={handleAddAnotherBusiness}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0F766E] hover:text-[#0D9488] bg-teal-50 hover:bg-teal-100 rounded-xl border border-teal-200 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Another Business</span>
                </button>
              </div>

              {/* Tabs for Multiple Businesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-5">
                {businessesList.map((b, idx) => {
                  const isActive = activeEditingIndex === idx;
                  const itemPreset = ALL_BUSINESS_PRESETS.find((p) => p.id === b.categoryPresetId) || ALL_BUSINESS_PRESETS[0];
                  const Icon = itemPreset.icon;

                  return (
                    <div
                      key={b.id}
                      onClick={() => setActiveEditingIndex(idx)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all relative ${
                        isActive
                          ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-md ring-2 ring-teal-500/50'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/10 text-emerald-300' : 'bg-white text-[#0F766E] border border-slate-200'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold block">Business {idx + 1}</span>
                            <span className="text-xs font-extrabold block truncate max-w-[130px]">
                              {b.name || 'Untitled Business'}
                            </span>
                          </div>
                        </div>

                        {businessesList.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveBusiness(idx);
                            }}
                            className={`p-1 rounded-md hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors ${isActive ? 'hover:text-rose-200' : 'hover:text-rose-600'}`}
                            title="Remove this business"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className={`mt-2 text-[10px] truncate ${isActive ? 'text-teal-200' : 'text-slate-500'}`}>
                        {itemPreset.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Business Setup Panel */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700">
                    Configuring: <strong className="text-[#0B1F33]">Business {activeEditingIndex + 1}</strong>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Type: <strong className="text-[#0F766E]">{activePreset.name}</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentActiveBiz.name}
                    onChange={(e) => updateBusinessField(activeEditingIndex, { name: e.target.value })}
                    placeholder={
                      activeEditingIndex === 0
                        ? 'e.g. Al-Rehman Kiryana'
                        : activeEditingIndex === 1
                        ? 'e.g. AR Online Store'
                        : 'e.g. Gulberg Garments'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                  />
                </div>

                {/* SEARCHABLE + CATEGORIZED BUSINESS SELECTOR */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700">
                      What kind of business do you run?
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Selected: <strong className="text-[#0F766E]">{activePreset.name}</strong>
                    </span>
                  </div>

                  {/* Search Input */}
                  <div className="relative mb-2.5">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="🔍 Type to search business types (e.g. Pharmacy, Bakery, Clothing...)"
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  </div>

                  {/* Popular Category Quick Filter Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[11px]">
                    <span className="text-slate-400 font-bold text-[10px] uppercase mr-1">Filter:</span>
                    {popularQuickPills.map((pill) => (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => setSelectedGroupFilter(pill === 'E-commerce' ? 'Digital' : pill)}
                        className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                          (selectedGroupFilter === pill || (selectedGroupFilter === 'Digital' && pill === 'E-commerce'))
                            ? 'bg-[#0B1F33] text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>

                  {/* Business Presets Grid */}
                  <div className="max-h-52 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {filteredPresets.map((preset) => {
                      const Icon = preset.icon;
                      const isSelected = currentActiveBiz.categoryPresetId === preset.id;

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-sm ring-1 ring-teal-400'
                              : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center ${isSelected ? 'bg-white/10 text-emerald-300' : 'bg-slate-100 text-[#0F766E]'}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold truncate block">{preset.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Other / Custom Business input if Other is selected */}
                  {currentActiveBiz.categoryPresetId === 'other' && (
                    <div className="mt-3 p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 animate-in fade-in space-y-2">
                      <label className="block text-xs font-bold text-[#0F766E]">
                        Custom Business Type Name
                      </label>
                      <input
                        type="text"
                        value={currentActiveBiz.customTypeName || ''}
                        onChange={(e) => updateBusinessField(activeEditingIndex, { customTypeName: e.target.value })}
                        placeholder="e.g. Printing & Stationery, Solar Installation, Gym & Fitness..."
                        className="w-full px-3 py-2 rounded-lg bg-white border border-teal-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                      />
                      <p className="text-[11px] text-teal-800">
                        Shafaf Hisab provides full generic business modules for custom business types: Customers, Products/Services, Sales, Purchases, Expenses, Payments, Invoices, and Reports.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* CRITICAL DATA ISOLATION REASSURANCE BANNER */}
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <strong className="font-extrabold text-emerald-800 block">
                    ✓ Both businesses will have separate data
                  </strong>
                  <span className="text-slate-700 leading-relaxed block mt-0.5">
                    Each business has its own customers, products, sales, expenses, inventory and reports. Your data never gets mixed.
                  </span>
                </div>
              </div>
            </div>

            {/* Account Details Form */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Account Owner Credentials
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Owner Name *</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Mohammad Bilal"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone (Login ID) *</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="bilal@business.pk"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lahore, Karachi, Rawalpindi..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create secure password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-base font-bold shadow-lg shadow-teal-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Complete Registration & Launch ({businessesList.length} Businesses)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already registered?{' '}
            <button
              onClick={onGoToLogin}
              className="font-bold text-[#0F766E] hover:underline cursor-pointer"
            >
              Login to existing account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
