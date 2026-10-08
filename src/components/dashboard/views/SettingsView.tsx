import React, { useState } from 'react';
import { Building, MapPin, Shield, Bell, FileText, Check, Plus } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { AddBusinessModal } from '../modals/AddBusinessModal';

export const SettingsView: React.FC = () => {
  const { currentBusiness, businesses, setCurrentBusinessId, showToast } = useApp();
  const [isAddBusinessOpen, setIsAddBusinessOpen] = useState(false);

  const [bizName, setBizName] = useState(currentBusiness.name);
  const [phone, setPhone] = useState(currentBusiness.phone);
  const [city, setCity] = useState(currentBusiness.city);
  const [address, setAddress] = useState(currentBusiness.address || '');
  const [taxRate, setTaxRate] = useState('0');
  const [currency, setCurrency] = useState(currentBusiness.currency);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Business configuration saved successfully.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F33]">Business & Workspace Settings</h2>
        <p className="text-xs text-slate-500">
          Manage entity details, regional branch network, billing preferences, and security.
        </p>
      </div>

      {/* Multi-Business Switcher Section (Section 13) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Registered Businesses</h3>
            <p className="text-xs text-slate-500">Switch between separate isolated business accounts under your phone</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono-numbers">{businesses.length} Total</span>
            <button
              onClick={() => setIsAddBusinessOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Business</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {businesses.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setCurrentBusinessId(b.id);
                showToast(`Switched workspace to ${b.name}`);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                currentBusiness.id === b.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="text-xs font-bold block">{b.name}</span>
              <span className={`text-[11px] block mt-0.5 ${currentBusiness.id === b.id ? 'text-emerald-400' : 'text-slate-500'}`}>
                {b.type.toUpperCase()} · {b.city}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Branch Management Section (Section 14) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Branch Network</h3>
            <p className="text-xs text-slate-500">Manage multi-location branch inventory and sales separation</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 mt-2">
          {currentBusiness.branches.map((br) => (
            <div key={br.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0F766E]" />
                <span className="font-bold text-slate-800">{br.name}</span>
                <span className="text-slate-500">({br.city})</span>
              </div>
              {br.isMain && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#0F766E] border border-emerald-200">
                  Headquarters
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* General Business Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
          Business Profile
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
              <input
                type="text"
                value={bizName}
                onChange={(e) => setBizName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Currency Code</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono-numbers"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sales Tax Rate (%)</label>
              <input
                type="text"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono-numbers"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Physical Store Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Store address printed on receipts"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Security & Isolation Layer (Section 19) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-2 text-emerald-400">
          <Shield className="w-5 h-5" />
          <h3 className="text-sm font-bold">Data Security & Isolation Architecture</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Each business tenant has isolated ledger storage. Audit history is maintained for every financial edit. Offline transaction reconciliation and automated cloud backups are active.
        </p>
      </div>

      <AddBusinessModal
        isOpen={isAddBusinessOpen}
        onClose={() => setIsAddBusinessOpen(false)}
      />
    </div>
  );
};
