import React, { useState } from 'react';
import {
  X,
  Store,
  Globe,
  Shirt,
  Briefcase,
  Truck,
  Smartphone,
  Sparkles,
  Wrench,
  Building2,
  Check,
  Search,
  Plus,
  ShieldCheck,
  MapPin,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { BusinessType } from '../../../types';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SectorPreset {
  id: BusinessType;
  label: string;
  category: 'Retail & Shops' | 'Digital & Online' | 'Wholesale & B2B' | 'Services';
  popular: boolean;
  tagline: string;
  icon: React.FC<{ className?: string }>;
}

const BUSINESS_SECTOR_PRESETS: SectorPreset[] = [
  { id: 'kiryana', label: 'Kiryana / General Store', category: 'Retail & Shops', popular: true, tagline: 'FMCG counter sales, customer udhaar khata & quick cash drawer', icon: Store },
  { id: 'retail', label: 'Retail Shop & Mart', category: 'Retail & Shops', popular: true, tagline: 'Barcode scanning, POS counter & customer register', icon: Store },
  { id: 'garments', label: 'Garments & Fashion Pret', category: 'Retail & Shops', popular: true, tagline: 'Color & size variant matrix, seasonal stock & walk-in sales', icon: Shirt },
  { id: 'electronics', label: 'Mobile & Electronics', category: 'Retail & Shops', popular: false, tagline: 'IMEI / Serial numbers, PTA status & warranty tracking', icon: Smartphone },
  { id: 'cosmetics', label: 'Cosmetics & Beauty Store', category: 'Retail & Shops', popular: false, tagline: 'Shade variations, batch expiry dates & beauty sales', icon: Sparkles },
  { id: 'ecommerce', label: 'E-commerce Store', category: 'Digital & Online', popular: true, tagline: 'Trax/PostEx/TCS COD remittance & Meta ad spend ROAS profit', icon: Globe },
  { id: 'freelancer', label: 'Freelancer / Consultant', category: 'Digital & Online', popular: true, tagline: 'Milestone invoicing, international client retainers & project tracking', icon: Briefcase },
  { id: 'services', label: 'Service & Maintenance Workshop', category: 'Services', popular: false, tagline: 'Vehicle job cards, labor hours & replacement parts separation', icon: Wrench },
  { id: 'wholesale', label: 'Wholesale & B2B Distributor', category: 'Wholesale & B2B', popular: true, tagline: 'Carton quantity pricing tiers, loading chalan & bulk ledger', icon: Truck },
  { id: 'other', label: 'Custom Enterprise / Other', category: 'Services', popular: false, tagline: 'Flexible multi-branch workflow tailored to custom operations', icon: Building2 },
];

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({ isOpen, onClose }) => {
  const { addNewBusiness, currentUser, showToast } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<SectorPreset>(BUSINESS_SECTOR_PRESETS[0]);

  // Form Fields
  const [name, setName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [phone, setPhone] = useState(currentUser?.phone || '0300-1111111');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const filteredPresets = BUSINESS_SECTOR_PRESETS.filter((p) => {
    const matchesSearch =
      p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Retail & Shops', 'Digital & Online', 'Wholesale & B2B', 'Services'];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter a business name.');
      return;
    }

    addNewBusiness({
      name: name.trim(),
      type: selectedSector.id,
      city: city.trim() || 'Lahore',
      phone: phone.trim() || (currentUser ? currentUser.phone : '0300-1111111'),
      address: address.trim() || undefined,
    });

    onClose();
    // Reset state
    setStep(1);
    setName('');
    setAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B1F33] to-[#0F766E] p-6 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Multi-Business Architecture
              </span>
              <span className="text-xs text-slate-300">Same Phone: {currentUser?.phone || '0300-1111111'}</span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              Add New Isolated Business
            </h2>
            <p className="text-xs text-slate-200 mt-0.5">
              100% separate customers, products, sales, expenses and statements. Zero data mixing.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {step === 1 ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0B1F33]">
                    Step 1: Choose Business Sector
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pre-configures industry terminology, metrics, and workflows.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search type..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0B1F33] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                {filteredPresets.map((preset) => {
                  const Icon = preset.icon;
                  const isSelected = selectedSector.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedSector(preset)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-teal-50/80 border-teal-600 ring-2 ring-teal-500/40 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#0F766E] text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900 block truncate">
                            {preset.label}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#0F766E] shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                          {preset.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Next Step Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-600">
                  Selected:{' '}
                  <span className="font-bold text-[#0B1F33]">{selectedSector.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0B1F33]">
                    Step 2: Business Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sector: <strong className="text-teal-700">{selectedSector.label}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-teal-700 hover:underline font-bold cursor-pointer"
                >
                  ← Change Sector
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business / Store Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`e.g. ${
                    selectedSector.id === 'kiryana'
                      ? 'Madina Super Store'
                      : selectedSector.id === 'ecommerce'
                      ? 'TrendWave Online Store'
                      : selectedSector.id === 'garments'
                      ? 'Gulberg Pret Boutique'
                      : selectedSector.id === 'freelancer'
                      ? 'Apex Design Studio'
                      : 'My New Enterprise'
                  }`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lahore, Karachi, Islamabad..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1111111"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Physical / Warehouse Address (Optional)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Shop # / Plaza / Street address for invoices"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Strict Isolation Guarantee:</strong>
                  <span>
                    This business will receive its own isolated ledger container under your phone ({currentUser?.phone || 'account'}). Customers, products, sales, and khata from your existing businesses will NEVER appear here.
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create & Launch Workspace</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
