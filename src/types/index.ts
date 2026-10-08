export type BusinessType = 
  | 'retail'
  | 'kiryana'
  | 'garments'
  | 'shoes'
  | 'cosmetics'
  | 'electronics'
  | 'mobile'
  | 'wholesale'
  | 'ecommerce'
  | 'freelancer'
  | 'services'
  | 'small_business'
  | 'other';

export interface Branch {
  id: string;
  name: string;
  city: string;
  isMain: boolean;
}

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  tagline?: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  currency: string;
  branches: Branch[];
  activeBranchId: string;
}

export interface UserRole {
  role: 'owner' | 'manager' | 'cashier' | 'accountant' | 'sales_staff';
  title: string;
  permissions: {
    sales: boolean;
    orders: boolean;
    customers: boolean;
    inventory: boolean;
    expenses: boolean;
    reports: boolean;
    payments: boolean;
    settings: boolean;
    employees: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  activeBusinessId: string;
  role: UserRole['role'];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  businessId: string;
  branchId: string;
  currentBalance: number; // Positive = Due/Udhaar (they owe us), Negative = Advance credit
  creditLimit: number;
  lastTransactionDate: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  businessId: string;
  branchId: string;
  customerId?: string;
  customerName?: string;
  type: 'sale' | 'payment' | 'udhaar' | 'expense' | 'refund';
  amount: number;
  balanceAfter?: number;
  date: string;
  description: string;
  paymentMethod: 'Cash' | 'Bank' | 'Easypaisa' | 'JazzCash' | 'Credit / Udhaar';
  invoiceId?: string;
  category?: string;
}

export interface Product {
  id: string;
  businessId: string;
  branchId: string;
  name: string;
  sku: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  minStockThreshold: number;
  unit: string;
  size?: string;
  color?: string;
  barcode?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  warrantyPeriod?: string;
  expiryDate?: string;
  batchNumber?: string;
}

export interface Project {
  id: string;
  businessId: string;
  clientName: string;
  clientPhone?: string;
  projectName: string;
  projectValue: number;
  receivedAmount: number;
  remainingAmount: number;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
  dueDate: string;
  notes?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  costPrice: number;
  total: number;
}

export interface Order {
  id: string;
  businessId: string;
  branchId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  channel: 'In-Store' | 'Website' | 'WhatsApp' | 'Instagram' | 'Daraz';
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  adCost: number;
  packagingCost: number;
  productCost: number;
  discount: number;
  totalAmount: number;
  netProfit: number;
  status: OrderStatus;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  date: string;
}

export interface Expense {
  id: string;
  businessId: string;
  branchId: string;
  title: string;
  category: 'Rent' | 'Salaries' | 'Transport' | 'Advertising' | 'Electricity & Utilities' | 'Packaging' | 'Supplies' | 'Maintenance' | 'Other';
  amount: number;
  date: string;
  paidVia: 'Cash' | 'Bank' | 'Easypaisa' | 'JazzCash';
  receiptNote?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  businessId: string;
  branchId: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paidAmount: number;
  balanceDue: number;
  status: 'paid' | 'unpaid' | 'overdue' | 'partial';
  notes?: string;
}

export interface Employee {
  id: string;
  businessId: string;
  branchId: string;
  name: string;
  phone: string;
  email: string;
  role: 'Manager' | 'Cashier' | 'Sales Staff' | 'Accountant';
  active: boolean;
  permissions: {
    sales: boolean;
    customers: boolean;
    inventory: boolean;
    expenses: boolean;
    reports: boolean;
    payments: boolean;
    settings: boolean;
  };
}

export interface SmartInsight {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'alert' | 'info';
  metric?: string;
}
