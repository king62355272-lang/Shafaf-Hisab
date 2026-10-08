import React from 'react';
import {
  Globe,
  Truck,
  Megaphone,
  Layers,
  ArrowUpRight,
  TrendingDown,
  ShoppingBag,
  Percent,
} from 'lucide-react';

export const EcommerceSection: React.FC = () => {
  const metrics = [
    { label: 'Total Orders', value: '128', sub: 'Daraz, Shopify & Instagram', icon: ShoppingBag, color: 'text-teal-400' },
    { label: 'Gross Revenue', value: 'Rs. 485,000', sub: 'Gross merchandise value', icon: Globe, color: 'text-emerald-400' },
    { label: 'Product Cost (COGS)', value: 'Rs. 275,000', sub: 'Direct manufacturing / supplier', icon: Layers, color: 'text-slate-400' },
    { label: 'Shipping / Courier', value: 'Rs. 32,000', sub: 'TCS, Trax & PostEx logistics', icon: Truck, color: 'text-indigo-400' },
    { label: 'Advertising (Meta / TikTok)', value: 'Rs. 41,000', sub: 'Paid ad acquisition cost', icon: Megaphone, color: 'text-amber-400' },
    { label: 'Packaging & Other Costs', value: 'Rs. 18,000', sub: 'Flyers, tape, payment gateways', icon: Layers, color: 'text-slate-400' },
  ];

  // Accurate math: Revenue (485,000) - Cost (275,000) - Shipping (32,000) - Ads (41,000) - Other (18,000) = Net Profit 119,000
  const netProfit = 485000 - 275000 - 32000 - 41000 - 18000; // 119,000!

  const topProducts = [
    { name: 'Classic Oxford Cotton Shirt', sold: 48, revenue: 117600, profit: 46200, margin: '39.2%' },
    { name: 'Urban Streetwear Joggers', sold: 34, revenue: 67966, profit: 24900, margin: '36.6%' },
    { name: 'Heavyweight Fleece Hoodie', sold: 26, revenue: 98800, profit: 34100, margin: '34.5%' },
    { name: 'Embroidered Casual Polo', sold: 20, revenue: 56000, profit: 13800, margin: '24.6%' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0B1F33] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#0F766E15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>E-Commerce & Digital Brands</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight [text-wrap:balance]">
            Selling Online? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 animate-text-shimmer">
              See Your Real Net Profit.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
            High gross sales mean nothing if courier charges, ad burn, and returns consume your margin. SHAFAF HISAB breaks down every single expense so you see actual take-home profit.
          </p>
        </div>

        {/* Master E-Commerce Breakdown Bento */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Profit Calculation Console */}
          <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs text-slate-400 font-medium">October 2026 E-Commerce Health</span>
                <h3 className="text-xl font-bold text-white mt-0.5">True Net Profit Architecture</h3>
              </div>
              <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-xl px-5 py-3">
                <span className="text-xs text-emerald-300 block font-medium">Actual Net Profit</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono-numbers">
                  Rs. {netProfit.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Financial Waterfall Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {metrics.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                    <div className="flex items-center justify-between text-slate-400 mb-1.5">
                      <span className="text-xs">{m.label}</span>
                      <Icon className={`w-4 h-4 ${m.color}`} />
                    </div>
                    <div className="text-lg font-bold font-mono-numbers text-white">{m.value}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{m.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Top Products & Profit By Product Table */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Profit Generated by Product
                </h4>
                <span className="text-xs text-emerald-400 font-medium">After direct product cost</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5">Product Title</th>
                      <th className="py-2.5 text-center">Units Sold</th>
                      <th className="py-2.5 text-right">Revenue</th>
                      <th className="py-2.5 text-right">Gross Profit</th>
                      <th className="py-2.5 text-right">Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono-numbers text-slate-200">
                    {topProducts.map((p) => (
                      <tr key={p.name} className="hover:bg-slate-800/30">
                        <td className="py-3 font-sans font-medium text-white">{p.name}</td>
                        <td className="py-3 text-center">{p.sold}</td>
                        <td className="py-3 text-right">Rs. {p.revenue.toLocaleString()}</td>
                        <td className="py-3 text-right text-emerald-400 font-bold">
                          Rs. {p.profit.toLocaleString()}
                        </td>
                        <td className="py-3 text-right text-teal-300">{p.margin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Supporting Sidebar: Returns & Pipeline */}
          <div className="lg:col-span-4 space-y-5">
            {/* Orders & Returns Widget */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-700/80">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Fulfillment Status
                </span>
                <span className="text-xs text-slate-400 font-mono-numbers">128 Orders Total</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Delivered Successfully</span>
                    <span className="font-mono-numbers text-emerald-400 font-bold">109 (85.1%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Pending / In Transit</span>
                    <span className="font-mono-numbers text-amber-400 font-bold">12 (9.4%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[10%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Returns (RTO)</span>
                    <span className="font-mono-numbers text-rose-400 font-bold">7 (5.5%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[5.5%]" />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <ArrowUpRight className="w-3.5 h-3.5" /> Return rate below 6% industry average
                </span>
              </div>
            </div>

            {/* Ad Spend vs Return Card */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-700/80">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                Ad Efficiency (ROAS)
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold font-mono-numbers text-white">11.8x ROAS</div>
                  <div className="text-xs text-slate-400 mt-0.5">Rs. 41k spent → Rs. 485k generated</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Percent className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
