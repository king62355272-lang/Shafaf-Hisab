import React, { useState } from 'react';
import { Boxes, PlusCircle, Search, AlertTriangle, ArrowUpDown, Plus, Minus } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface InventoryViewProps {
  onAddProduct: () => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ onAddProduct }) => {
  const { products, updateStock } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalInventoryValue = products.reduce((acc, p) => acc + p.stockQuantity * p.costPrice, 0);
  const totalRetailValue = products.reduce((acc, p) => acc + p.stockQuantity * p.sellingPrice, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Products & Inventory</h2>
          <p className="text-xs text-slate-500">
            Real-time stock valuation, minimum safety levels, and SKU tracking.
          </p>
        </div>

        <button
          onClick={onAddProduct}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add Product</span>
        </button>
      </div>

      {/* Financial Valuation Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block">Total Catalog Items</span>
          <span className="text-2xl font-bold font-mono-numbers text-[#0B1F33]">
            {products.length} SKUs
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block">Asset Value at Cost (COGS)</span>
          <span className="text-2xl font-bold font-mono-numbers text-slate-800">
            Rs. {totalInventoryValue.toLocaleString()}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
          <span className="text-xs text-emerald-800 font-semibold block">Potential Retail Realization</span>
          <span className="text-2xl font-bold font-mono-numbers text-emerald-700">
            Rs. {totalRetailValue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search SKU or product title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F766E]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                categoryFilter === c
                  ? 'bg-[#0B1F33] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c === 'all' ? 'All Categories' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold">
                <th className="py-3 px-4 text-left">SKU / Item Title</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Variants (Size / Color)</th>
                <th className="py-3 px-4 text-right">Cost Price</th>
                <th className="py-3 px-4 text-right">Selling Price</th>
                <th className="py-3 px-4 text-center">Stock Level</th>
                <th className="py-3 px-4 text-center">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono-numbers text-slate-800">
              {filtered.map((prod) => {
                const isLow = prod.stockQuantity <= prod.minStockThreshold;
                return (
                  <tr key={prod.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-bold text-slate-900">{prod.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono-numbers">{prod.sku}</div>
                    </td>
                    <td className="py-3.5 px-4 font-sans text-slate-600">{prod.category}</td>
                    <td className="py-3.5 px-4 font-sans text-slate-500">
                      {prod.size || prod.color ? (
                        <span>
                          {prod.size && `Size: ${prod.size}`} {prod.color && `· ${prod.color}`}
                        </span>
                      ) : (
                        <span className="text-slate-400">Standard</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-600">
                      Rs. {prod.costPrice.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-700">
                      Rs. {prod.sellingPrice.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          isLow
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {isLow && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                        <span>
                          {prod.stockQuantity} {prod.unit}
                        </span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                        <button
                          onClick={() => updateStock(prod.id, Math.max(0, prod.stockQuantity - 1))}
                          className="p-1 rounded hover:bg-white text-slate-600 cursor-pointer"
                          title="Decrease stock by 1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-bold text-slate-800">
                          {prod.stockQuantity}
                        </span>
                        <button
                          onClick={() => updateStock(prod.id, prod.stockQuantity + 1)}
                          className="p-1 rounded hover:bg-white text-slate-600 cursor-pointer"
                          title="Increase stock by 1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
