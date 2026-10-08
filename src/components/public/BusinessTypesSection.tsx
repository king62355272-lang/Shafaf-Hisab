import React, { useState } from 'react';
import {
  Store,
  ShoppingBag,
  Shirt,
  Footprints,
  Sparkles,
  Cpu,
  Smartphone,
  Truck,
  Globe,
  Briefcase,
  Wrench,
  Building2,
  MoreHorizontal,
  CheckCircle,
} from 'lucide-react';

export const BusinessTypesSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('retail');

  const businessTypes = [
    {
      id: 'retail',
      icon: Store,
      name: 'Retail Stores',
      description: 'Departmental stores, supermarkets, mini marts, and retail showrooms.',
      priorities: ['Counter Sales & Invoicing', 'Barcode Scanner Support', 'Customer Credit Ledger', 'Low Stock Warnings'],
    },
    {
      id: 'kiryana',
      icon: ShoppingBag,
      name: 'Kiryana & General Stores',
      description: 'Fast-moving consumer grocery, staple items, and neighbourhood supply stores.',
      priorities: ['Customer Udhaar (Credit)', 'Daily Cash Counter Closing', 'Supplier Bills & Payouts', 'WhatsApp Balance Alerts'],
    },
    {
      id: 'garments',
      icon: Shirt,
      name: 'Garments & Apparel',
      description: 'Clothing brands, fabric merchants, boutique outlets, and ready-to-wear.',
      priorities: ['Size & Color Matrix', 'Seasonal Stock Aging', 'Customer Exchange Tracking', 'Discount Campaigns'],
    },
    {
      id: 'shoes',
      icon: Footprints,
      name: 'Shoes & Footwear',
      description: 'Footwear retailers, multi-brand outlets, and distribution agencies.',
      priorities: ['Shoe Size Variant Control', 'Pair Inventory Tracking', 'Fast-Seller Analysis', 'Vendor Invoices'],
    },
    {
      id: 'cosmetics',
      icon: Sparkles,
      name: 'Cosmetics & Beauty',
      description: 'Beauty care boutiques, perfumes, skincare importers, and salon supply stores.',
      priorities: ['Batch & Expiry Reminders', 'Brand-wise Margins', 'Customer Purchase History', 'Loyalty Tracking'],
    },
    {
      id: 'electronics',
      icon: Cpu,
      name: 'Electronics & Appliances',
      description: 'Home appliances, cooling equipment, sound systems, and commercial electronics.',
      priorities: ['Serial Number & Warranty', 'Installment / Udhaar Plans', 'Technician Service Fees', 'High-Ticket Invoicing'],
    },
    {
      id: 'mobile',
      icon: Smartphone,
      name: 'Mobile & Accessories',
      description: 'Smartphone stores, repair centers, gadget shops, and accessory distribution.',
      priorities: ['IMEI Number Logging', 'Repair Job Sheets', 'Accessory Profit Margins', 'Easypaisa / JazzCash Cash-in'],
    },
    {
      id: 'wholesale',
      icon: Truck,
      name: 'Wholesale Businesses',
      description: 'Bulk trade distributors, grain dealers, and factory distributors.',
      priorities: ['Tiered Bulk Pricing', 'Major Outstanding Ledgers', 'Multi-Vehicle Dispatch', 'Freight & Transport Cost'],
    },
    {
      id: 'ecommerce',
      icon: Globe,
      name: 'E-Commerce Sellers',
      description: 'Online direct-to-consumer stores, Shopify brands, Daraz, and social sellers.',
      priorities: ['Courier COD Reconciliation', 'Net Profit after Ads & Shipping', 'Return Rate (RTO) Tracking', 'Multi-channel Orders'],
    },
    {
      id: 'freelancer',
      icon: Briefcase,
      name: 'Freelancers & Consultants',
      description: 'Independent software engineers, UI/UX designers, copywriters, and marketers.',
      priorities: ['Client Project Retainers', 'Milestone Invoicing', 'Pending Receivables', 'Tool & Asset Overhead'],
    },
    {
      id: 'services',
      icon: Wrench,
      name: 'Service Businesses',
      description: 'Catering, event planners, car detailing, maintenance, and logistics providers.',
      priorities: ['Labor & Contractor Payouts', 'Customer Job Orders', 'Advance Payment Booking', 'Operating Overhead'],
    },
    {
      id: 'small_business',
      icon: Building2,
      name: 'Growing Companies',
      description: 'Multi-branch regional operations, mid-sized firms, and supply networks.',
      priorities: ['Branch-wise Sales Comparison', 'Staff Permissions & Roles', 'Audited Financial Reports', 'Consolidated Cash Flow'],
    },
    {
      id: 'other',
      icon: MoreHorizontal,
      name: 'Specialized Enterprise',
      description: 'Custom enterprises with flexible ledger, billing, and stock configurations.',
      priorities: ['Custom Ledger Fields', 'Granular Role Access', 'Custom Report Builder', 'Automated Backups'],
    },
  ];

  const currentType = businessTypes.find((t) => t.id === selectedType) || businessTypes[0];

  return (
    <section id="businesses" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
            Tailored Industry Workflows
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight [text-wrap:balance]">
            Built for modern businesses of every scale.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed [text-wrap:balance]">
            SHAFAF HISAB automatically adapts its layout and priority tools to match the exact requirements of your sector.
          </p>
        </div>

        {/* Business Type Horizontal Selector Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {businessTypes.map((b) => {
            const Icon = b.icon;
            const isSelected = selectedType === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setSelectedType(b.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-md ring-2 ring-[#0F766E]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                    isSelected ? 'bg-white/10 text-emerald-300' : 'bg-slate-100 text-[#0F766E]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-snug">{b.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card for Selected Business Type */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E] uppercase">
                <span>Selected Sector Focus</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0B1F33] mt-1">{currentType.name}</h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">{currentType.description}</p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#0F766E] border border-emerald-200 text-xs font-semibold">
                Auto-Configured Dashboard Ready
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              What SHAFAF HISAB Prioritizes For This Business:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentType.priorities.map((item) => (
                <div key={item} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
