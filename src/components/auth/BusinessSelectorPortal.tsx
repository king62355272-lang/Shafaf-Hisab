import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import {
  ArrowLeft,
  Building2,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Package,
  TrendingUp,
  Store,
  Globe,
  Briefcase,
  Shirt,
  Sparkles,
  Smartphone,
  Truck,
  Wrench,
  UtensilsCrossed,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Business } from '../../types';

interface BusinessSelectorPortalProps {
  onAddAnotherBusiness: () => void;
}

export const BusinessSelectorPortal: React.FC<BusinessSelectorPortalProps> = ({ onAddAnotherBusiness }) => {
  const { currentUser, userBusinesses, switchBusiness, logoutUser, customers, orders } = useApp();

  const getBusinessIcon = (type: string) => {
    switch (type) {
      case 'kiryana':
      case 'retail':
        return Store;
      case 'ecommerce':
        return Globe;
      case 'freelancer':
        return Briefcase;
      case 'garments':
        return Shirt;
      case 'cosmetics':
        return Sparkles;
      case 'electronics':
        return Smartphone;
      case 'wholesale':
        return Truck;
      case 'services':
        return Wrench;
      default:
        return Building2;
    }
  };

  const formatBusinessMetrics = (biz: Business) => {
    if (biz.type === 'kiryana' || biz.type === 'retail') {
      return 'Grocery • 128 customers';
    }
    if (biz.type === 'ecommerce') {
      return 'E-commerce • 46 orders';
    }
    if (biz.type === 'freelancer') {
      return 'Digital Studio • 14 retainers';
    }
    if (biz.type === 'garments') {
      return 'Fashion Apparel • 340 SKUs';
    }
    if (biz.type === 'wholesale') {
      return 'B2B Distribution • 18 bulk routes';
    }
    return `${biz.type.toUpperCase()} • Separate ledger`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <button
            onClick={logoutUser}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sign out</span>
          </button>
          <Logo size="md" variant="dark" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="text-center max-w-lg mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Multi-Tenant Partition Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
              Good morning{currentUser?.name ? `, ${currentUser.name.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-base sm:text-lg font-bold text-slate-700 mt-1">
              Which business are you working on?
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Data is strictly isolated. Switching workspaces opens a completely separate dashboard.
            </p>
          </div>

          {/* List of user businesses */}
          <div className="space-y-3">
            {userBusinesses.map((biz) => {
              const Icon = getBusinessIcon(biz.type);
              const metricsText = formatBusinessMetrics(biz);

              return (
                <div
                  key={biz.id}
                  onClick={() => switchBusiness(biz.id)}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-teal-500 bg-slate-50/70 hover:bg-teal-50/40 transition-all cursor-pointer group flex items-center justify-between gap-4 shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 group-hover:border-teal-300 text-[#0F766E] flex items-center justify-center shrink-0 shadow-xs">
                      <Icon className="w-6 h-6 text-[#0F766E]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-extrabold text-[#0B1F33] group-hover:text-[#0F766E] transition-colors truncate">
                        {biz.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-600">
                        <span className="font-semibold text-teal-700">{metricsText}</span>
                        <span>•</span>
                        <span className="text-slate-500">{biz.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-xs font-bold text-[#0F766E] group-hover:translate-x-0.5 transition-transform">
                      Open Dashboard
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 group-hover:bg-[#0F766E] group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add New Business button */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onAddAnotherBusiness}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-dashed border-teal-500/60 bg-teal-50/50 hover:bg-teal-50 text-[#0F766E] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Business</span>
            </button>

            <span className="text-[11px] text-slate-400 text-center sm:text-right">
              100% separate customers, inventory & sales
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
