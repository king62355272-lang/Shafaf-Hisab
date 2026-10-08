import React, { useState } from 'react';
import { Package, PlusCircle, Search, Filter, CheckCircle2, Truck, RefreshCw, XCircle } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { OrderStatus } from '../../../types';

interface OrdersViewProps {
  onNewOrder: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ onNewOrder }) => {
  const { orders, updateOrderStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchChannel = channelFilter === 'all' || o.channel === channelFilter;
    return matchStatus && matchChannel;
  });

  const statuses: { id: OrderStatus | 'all'; label: string }[] = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'returned', label: 'Returned' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Orders & Fulfillment</h2>
          <p className="text-xs text-slate-500">
            Track multi-channel orders from placement to doorstep dispatch and return management.
          </p>
        </div>

        <button
          onClick={onNewOrder}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Order</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap gap-1.5">
        {statuses.map((st) => (
          <button
            key={st.id}
            onClick={() => setStatusFilter(st.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              statusFilter === st.id
                ? 'bg-[#0B1F33] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Orders Grid/Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700">Orders List ({filteredOrders.length})</span>
          <span className="text-slate-500 font-mono-numbers">Real-time Delivery Pipeline</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No orders found for this filter.
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div key={ord.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 font-mono-numbers">
                      {ord.orderNumber}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {ord.channel}
                    </span>
                    <span className="text-xs text-slate-400 font-mono-numbers">· {ord.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800">
                    {ord.customerName} <span className="text-slate-400 font-mono-numbers">({ord.customerPhone})</span>
                  </h4>
                  {ord.customerAddress && (
                    <p className="text-[11px] text-slate-500">{ord.customerAddress}</p>
                  )}
                  {ord.items && ord.items.length > 0 && (
                    <div className="text-[11px] text-slate-600 pt-1">
                      Items: {ord.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ')}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 self-start md:self-auto">
                  <div className="text-left sm:text-right font-mono-numbers">
                    <span className="text-sm font-bold text-slate-900 block">
                      Rs. {ord.totalAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block">
                      Est. Profit: Rs. {ord.netProfit.toLocaleString()}
                    </span>
                  </div>

                  {/* Status Dropdown Controller */}
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 uppercase font-bold">
                      Order Status
                    </label>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                      className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border border-slate-300 focus:outline-none ${
                        ord.status === 'delivered'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : ord.status === 'shipped'
                          ? 'bg-teal-50 text-teal-700 border-teal-300'
                          : ord.status === 'processing'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : ord.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-700 border-rose-300'
                          : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="returned">Returned</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
