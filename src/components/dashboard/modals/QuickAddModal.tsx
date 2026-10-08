import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  Package,
  UserPlus,
  CreditCard,
  Receipt,
  Boxes,
  Plus,
  Check,
  Search,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Product } from '../../../types';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'sale' | 'order' | 'customer' | 'payment' | 'expense' | 'product';
  preSelectedCustomerId?: string;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'sale',
  preSelectedCustomerId,
}) => {
  const {
    customers,
    products,
    addSale,
    addCustomer,
    receivePayment,
    addExpense,
    addProduct,
    addOrder,
    currentBusiness,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'sale' | 'order' | 'customer' | 'payment' | 'expense' | 'product'>(initialTab);

  // Sale form states
  const [saleCustomerId, setSaleCustomerId] = useState(preSelectedCustomerId || '');
  const [saleCustomer, setSaleCustomer] = useState('');
  const [salePhone, setSalePhone] = useState('');
  
  // Selected line items for the sale
  const [saleItems, setSaleItems] = useState<{
    productId?: string;
    name: string;
    quantity: number;
    price: number;
    unit?: string;
  }[]>([]);

  // Product Selection Picker controls (Requirements 7: Clear product selection)
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [productSearchQuery, setProductSearchQuery] = useState<string>('');
  const [pickerQuantity, setPickerQuantity] = useState<number>(1);
  const [pickerPrice, setPickerPrice] = useState<number>(0);

  const [salePaid, setSalePaid] = useState<number>(0);
  const [salePaymentMethod, setSalePaymentMethod] = useState<'Cash' | 'Bank' | 'Easypaisa' | 'JazzCash' | 'Credit / Udhaar'>('Cash');

  // Customer form states
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustCity, setNewCustCity] = useState(currentBusiness.city);
  const [newCustLimit, setNewCustLimit] = useState(15000);
  const [newCustNotes, setNewCustNotes] = useState('');

  // Payment form states
  const [payCustId, setPayCustId] = useState(preSelectedCustomerId || customers[0]?.id || '');
  const [payAmount, setPayAmount] = useState<number>(1000);
  const [payMethod, setPayMethod] = useState<'Cash' | 'Bank' | 'Easypaisa' | 'JazzCash'>('Cash');
  const [payNote, setPayNote] = useState('');

  // Expense form states
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<'Rent' | 'Salaries' | 'Transport' | 'Advertising' | 'Electricity & Utilities' | 'Packaging' | 'Supplies' | 'Other'>('Supplies');
  const [expAmount, setExpAmount] = useState<number>(500);
  const [expPaidVia, setExpPaidVia] = useState<'Cash' | 'Bank' | 'Easypaisa' | 'JazzCash'>('Cash');

  // Product form states
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('General');
  const [prodCost, setProdCost] = useState<number>(100);
  const [prodSell, setProdSell] = useState<number>(150);
  const [prodStock, setProdStock] = useState<number>(20);
  const [prodMinStock, setProdMinStock] = useState<number>(5);
  const [prodUnit, setProdUnit] = useState('pcs');
  const [prodSize, setProdSize] = useState('');
  const [prodColor, setProdColor] = useState('');

  // Order form states
  const [orderCustName, setOrderCustName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderChannel, setOrderChannel] = useState<'In-Store' | 'Website' | 'WhatsApp' | 'Instagram' | 'Daraz'>('Website');
  const [orderTotal, setOrderTotal] = useState<number>(2500);

  if (!isOpen) return null;

  // Filter products by search query for Product Picker
  const availableProducts = products.filter(
    (p) =>
      !productSearchQuery ||
      p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearchQuery.toLowerCase())
  );

  // When a product is selected in dropdown, auto-fill price
  const handleProductSelectionChange = (productId: string) => {
    setSelectedProductId(productId);
    const chosen = products.find((p) => p.id === productId);
    if (chosen) {
      setPickerPrice(chosen.sellingPrice);
    }
  };

  // Add chosen product to transaction line items
  const handleAddProductToSale = () => {
    if (!selectedProductId) {
      showToast('Please select a product from the list first.');
      return;
    }
    const chosen = products.find((p) => p.id === selectedProductId);
    if (!chosen) return;

    if (pickerQuantity <= 0) {
      showToast('Quantity must be at least 1.');
      return;
    }

    // Check if already in items
    const existingIndex = saleItems.findIndex((i) => i.productId === chosen.id);
    if (existingIndex > -1) {
      const copy = [...saleItems];
      copy[existingIndex].quantity += pickerQuantity;
      copy[existingIndex].price = pickerPrice > 0 ? pickerPrice : chosen.sellingPrice;
      setSaleItems(copy);
    } else {
      setSaleItems([
        ...saleItems,
        {
          productId: chosen.id,
          name: chosen.name,
          quantity: pickerQuantity,
          price: pickerPrice > 0 ? pickerPrice : chosen.sellingPrice,
          unit: chosen.unit,
        },
      ]);
    }

    // Reset picker
    setSelectedProductId('');
    setPickerQuantity(1);
    setPickerPrice(0);
    showToast(`Added "${chosen.name}" to sale list.`);
  };

  // Add custom unlisted line item
  const handleAddManualLineItem = () => {
    setSaleItems([...saleItems, { name: '', quantity: 1, price: 0 }]);
  };

  // Calculate sale totals
  const saleSubtotal = saleItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const saleTotal = saleSubtotal;
  const balanceRemainingDue = Math.max(0, saleTotal - salePaid);

  const handleSaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (saleItems.length === 0) {
      showToast('Please add at least one product to the sale.');
      return;
    }
    if (saleTotal <= 0) {
      showToast('Please ensure total sale amount is greater than Rs. 0.');
      return;
    }

    let finalCustomerName = saleCustomer.trim();
    let finalPhone = salePhone.trim();

    if (saleCustomerId) {
      const matchingCust = customers.find((c) => c.id === saleCustomerId);
      if (matchingCust) {
        finalCustomerName = matchingCust.name;
        finalPhone = matchingCust.phone;
      }
    }

    if (!finalCustomerName) {
      finalCustomerName = 'Walk-in Counter Customer';
    }

    addSale({
      customerName: finalCustomerName,
      customerPhone: finalPhone,
      items: saleItems.filter((i) => i.name.trim() !== ''),
      total: saleTotal,
      paid: Number(salePaid),
      paymentMethod: salePaymentMethod,
    });
    onClose();
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim()) {
      showToast('Please enter customer name.');
      return;
    }
    addCustomer({
      name: newCustName.trim(),
      phone: newCustPhone.trim() || '0300-0000000',
      city: newCustCity.trim() || currentBusiness.city,
      creditLimit: Number(newCustLimit) || 15000,
      notes: newCustNotes.trim() || undefined,
    });
    onClose();
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payCustId) {
      showToast('Please select a customer.');
      return;
    }
    if (payAmount <= 0) {
      showToast('Please enter a valid payment amount.');
      return;
    }
    receivePayment(payCustId, Number(payAmount), payMethod, payNote);
    onClose();
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle || expAmount <= 0) {
      showToast('Please enter expense title and valid amount.');
      return;
    }
    addExpense({
      title: expTitle,
      category: expCategory,
      amount: Number(expAmount),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      paidVia: expPaidVia,
    });
    onClose();
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      showToast('Please enter product title.');
      return;
    }
    addProduct({
      name: prodName.trim(),
      sku: `SKU-${Date.now().toString().slice(-4)}`,
      category: prodCategory.trim() || 'General',
      costPrice: Number(prodCost) || 0,
      sellingPrice: Number(prodSell) || 0,
      stockQuantity: Number(prodStock) || 0,
      minStockThreshold: Number(prodMinStock) || 5,
      unit: prodUnit.trim() || 'pcs',
      size: prodSize.trim() || undefined,
      color: prodColor.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header with Tab Selectors */}
        <div className="p-4 sm:p-5 bg-[#0C2340] text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">SHAFAF HISAB Quick Operation</h3>
            <p className="text-xs text-slate-300">Workspace: {currentBusiness.name} ({currentBusiness.type.toUpperCase()})</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto p-1.5 gap-1">
          {[
            { id: 'sale', label: 'New Sale / Udhaar', icon: TrendingUp },
            { id: 'payment', label: 'Receive Payment', icon: CreditCard },
            { id: 'customer', label: 'Add Customer', icon: UserPlus },
            { id: 'product', label: 'Add Product', icon: Boxes },
            { id: 'expense', label: 'Add Expense', icon: Receipt },
            { id: 'order', label: 'New Order', icon: Package },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  isSel
                    ? 'bg-white text-[#0C2340] shadow-xs border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSel ? 'text-[#0F766E]' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {/* ================================================================= */}
          {/* 1. NEW SALE FORM (REQUIREMENT 7: CLEAR PRODUCT SELECTION)         */}
          {/* ================================================================= */}
          {activeTab === 'sale' && (
            <form onSubmit={handleSaleSubmit} className="space-y-5">
              {/* Customer Linkage */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Customer &amp; Khata Association
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Select Registered Customer (Optional)
                    </label>
                    <select
                      value={saleCustomerId}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSaleCustomerId(val);
                        if (val) {
                          const cust = customers.find((c) => c.id === val);
                          if (cust) {
                            setSaleCustomer(cust.name);
                            setSalePhone(cust.phone);
                          }
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#0F766E]"
                    >
                      <option value="">— Walk-in Customer / Enter Name Below —</option>
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.phone}) — Due: Rs. {c.currentBalance.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={saleCustomer}
                      onChange={(e) => setSaleCustomer(e.target.value)}
                      placeholder="e.g. Ali Ahmed or Walk-in"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#0F766E]"
                    />
                  </div>
                </div>
              </div>

              {/* Requirement 7: Clear Product Selection Module */}
              <div className="p-4 rounded-xl border-2 border-teal-600/30 bg-teal-50/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-[#0F766E]" />
                    <span className="text-xs font-bold text-[#0C2340] uppercase tracking-wider">
                      Product Selection (Clear Catalog Picker)
                    </span>
                  </div>
                  <span className="text-[11px] text-teal-700 font-semibold">
                    {products.length} products available in this store
                  </span>
                </div>

                {/* 1. Search Product Filter */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Select Product
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => handleProductSelectionChange(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:border-[#0F766E]"
                    >
                      <option value="">-- Choose a Product --</option>
                      {availableProducts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — Rs. {p.sellingPrice.toLocaleString()} (Stock: {p.stockQuantity} {p.unit})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Search Product
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Filter by name/SKU..."
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        className="w-full pl-7 pr-2 py-2 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:border-[#0F766E]"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 text-center">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={pickerQuantity}
                      onChange={(e) => setPickerQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full px-2 py-2 rounded-lg border border-slate-300 bg-white text-xs font-mono-numbers text-center font-bold focus:outline-none focus:border-[#0F766E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddProductToSale}
                      className="w-full py-2 px-3 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>

                {/* Sub-bar showing chosen product details if selected */}
                {selectedProductId && (
                  <div className="p-2.5 bg-white rounded-lg border border-teal-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        {products.find((p) => p.id === selectedProductId)?.name}
                      </span>
                      <span className="text-slate-500">
                        Price: Rs. {pickerPrice.toLocaleString()}
                      </span>
                      <span className="text-slate-500">
                        Subtotal: Rs. {(pickerQuantity * pickerPrice).toLocaleString()}
                      </span>
                    </div>
                    <span className="text-emerald-700 font-semibold text-[11px]">
                      Ready to Add ↓
                    </span>
                  </div>
                )}
              </div>

              {/* Requirement 7: Line items list with quantity change, removal, subtotal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Transaction Items ({saleItems.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddManualLineItem}
                    className="text-xs text-[#0F766E] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Custom Line Item
                  </button>
                </div>

                {saleItems.length === 0 ? (
                  <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                    No items added yet. Select a product above or click "Add Product".
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                    <div className="bg-slate-100 p-2.5 grid grid-cols-12 text-[10px] font-bold uppercase text-slate-600">
                      <div className="col-span-5">Product Name</div>
                      <div className="col-span-2 text-center">Quantity</div>
                      <div className="col-span-2 text-right">Unit Price</div>
                      <div className="col-span-2 text-right">Subtotal</div>
                      <div className="col-span-1 text-center">Action</div>
                    </div>

                    {saleItems.map((item, idx) => (
                      <div key={idx} className="p-2.5 grid grid-cols-12 gap-2 items-center text-xs">
                        <div className="col-span-5">
                          <input
                            type="text"
                            placeholder="Product Title"
                            value={item.name}
                            onChange={(e) => {
                              const copy = [...saleItems];
                              copy[idx].name = e.target.value;
                              setSaleItems(copy);
                            }}
                            className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs font-medium"
                            required
                          />
                        </div>

                        <div className="col-span-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const copy = [...saleItems];
                              copy[idx].quantity = Math.max(1, Number(e.target.value));
                              setSaleItems(copy);
                            }}
                            className="w-full px-1.5 py-1.5 rounded border border-slate-300 text-xs text-center font-mono-numbers font-bold"
                            required
                          />
                        </div>

                        <div className="col-span-2">
                          <input
                            type="number"
                            min="0"
                            value={item.price}
                            onChange={(e) => {
                              const copy = [...saleItems];
                              copy[idx].price = Number(e.target.value);
                              setSaleItems(copy);
                            }}
                            className="w-full px-1.5 py-1.5 rounded border border-slate-300 text-xs text-right font-mono-numbers"
                            required
                          />
                        </div>

                        <div className="col-span-2 text-right font-mono-numbers font-bold text-slate-900">
                          Rs. {(item.quantity * item.price).toLocaleString()}
                        </div>

                        <div className="col-span-1 text-center">
                          <button
                            type="button"
                            onClick={() => setSaleItems(saleItems.filter((_, i) => i !== idx))}
                            className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                            title="Remove product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Requirement 7: Totals & Subtotal & Settlement */}
              <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-200">
                <div className="flex justify-between items-center text-sm font-bold text-[#0C2340]">
                  <span>Subtotal Amount:</span>
                  <span className="font-mono-numbers text-base text-slate-900">
                    Rs. {saleSubtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-base font-extrabold text-[#0C2340] pt-2 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="font-mono-numbers text-xl text-emerald-700">
                    Rs. {saleTotal.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Amount Paid Now (Rs.)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={saleTotal}
                      value={salePaid}
                      onChange={(e) => setSalePaid(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono-numbers text-xs font-bold"
                    />
                    {balanceRemainingDue > 0 && (
                      <span className="text-[11px] text-amber-700 font-bold block mt-1">
                        Rs. {balanceRemainingDue.toLocaleString()} will be automatically recorded into Customer Udhaar
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method</label>
                    <select
                      value={salePaymentMethod}
                      onChange={(e) => setSalePaymentMethod(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                    >
                      <option value="Cash">Cash (Counter)</option>
                      <option value="Bank">Bank Transfer</option>
                      <option value="Easypaisa">Easypaisa</option>
                      <option value="JazzCash">JazzCash</option>
                      <option value="Credit / Udhaar">Full Credit / Udhaar (0 Paid)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Transaction &amp; Print Receipt</span>
              </button>
            </form>
          )}

          {/* ================================================================= */}
          {/* 2. RECEIVE PAYMENT FORM                                            */}
          {/* ================================================================= */}
          {activeTab === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Customer Account
                </label>
                <select
                  value={payCustId}
                  onChange={(e) => setPayCustId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                  required
                >
                  <option value="">-- Choose Customer --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone}) — Balance: Rs. {c.currentBalance.toLocaleString()} Due
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount Received (Rs.)
                </label>
                <input
                  type="number"
                  min="1"
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono-numbers text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="Cash">Cash (Counter)</option>
                  <option value="Bank">Bank Transfer</option>
                  <option value="Easypaisa">Easypaisa</option>
                  <option value="JazzCash">JazzCash</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  placeholder="e.g. Cleared October installment"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Record Payment &amp; Update Customer Khata
              </button>
            </form>
          )}

          {/* ================================================================= */}
          {/* 3. ADD CUSTOMER FORM                                               */}
          {/* ================================================================= */}
          {activeTab === 'customer' && (
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Full Name
                  </label>
                  <input
                    type="text"
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono-numbers"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Area
                  </label>
                  <input
                    type="text"
                    value={newCustCity}
                    onChange={(e) => setNewCustCity(e.target.value)}
                    placeholder="Lahore, Karachi, etc."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Credit Limit (Rs.)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newCustLimit}
                    onChange={(e) => setNewCustLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono-numbers text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={newCustNotes}
                  onChange={(e) => setNewCustNotes(e.target.value)}
                  placeholder="Notes on payment reliability, terms, etc."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Create Customer Account in {currentBusiness.name}
              </button>
            </form>
          )}

          {/* ================================================================= */}
          {/* 4. ADD PRODUCT FORM                                                */}
          {/* ================================================================= */}
          {activeTab === 'product' && (
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product / Item Title
                </label>
                <input
                  type="text"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. Surf Excel 500g, Dalda Cooking Oil, Cotton Shirt"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cost Price (Rs.)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={prodCost}
                    onChange={(e) => setProdCost(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono-numbers text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Selling Price (Rs.)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={prodSell}
                    onChange={(e) => setProdSell(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono-numbers text-xs font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Opening Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono-numbers text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Min Threshold
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={prodMinStock}
                    onChange={(e) => setProdMinStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono-numbers text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    placeholder="pcs, kg, bags"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Add Product to {currentBusiness.name} Inventory
              </button>
            </form>
          )}

          {/* ================================================================= */}
          {/* 5. ADD EXPENSE FORM                                                */}
          {/* ================================================================= */}
          {activeTab === 'expense' && (
            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expense Description
                </label>
                <input
                  type="text"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="e.g. Shop Electricity Bill, Staff Lunch, Packaging"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="Rent">Rent</option>
                    <option value="Salaries">Salaries</option>
                    <option value="Transport">Transport</option>
                    <option value="Advertising">Advertising</option>
                    <option value="Electricity & Utilities">Electricity & Utilities</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (Rs.)</label>
                  <input
                    type="number"
                    min="1"
                    value={expAmount}
                    onChange={(e) => setExpAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono-numbers text-xs font-bold"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Record Expense
              </button>
            </form>
          )}

          {/* ================================================================= */}
          {/* 6. NEW ORDER FORM                                                  */}
          {/* ================================================================= */}
          {activeTab === 'order' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={orderCustName}
                  onChange={(e) => setOrderCustName(e.target.value)}
                  placeholder="Customer Name"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  addOrder({ customerName: orderCustName || 'Counter Customer', totalAmount: orderTotal });
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold cursor-pointer"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
