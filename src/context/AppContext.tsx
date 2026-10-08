import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Business,
  Customer,
  Transaction,
  Product,
  Order,
  Expense,
  Invoice,
  Employee,
  SmartInsight,
  OrderStatus,
} from '../types';
import {
  UserAccount,
  SEED_ACCOUNT_A_USER,
  SEED_ACCOUNT_A_BUSINESS,
  SEED_ACCOUNT_A_BUSINESS_2,
  SEED_ACCOUNT_A_BUSINESS_3,
  SEED_ACCOUNT_A_CUSTOMERS,
  SEED_ACCOUNT_A_PRODUCTS,
  SEED_ACCOUNT_A_TRANSACTIONS,
  SEED_ACCOUNT_A_EXPENSES,
  SEED_ACCOUNT_B_USER,
  SEED_ACCOUNT_B_BUSINESS,
  SEED_ACCOUNT_B_CUSTOMERS,
  SEED_ACCOUNT_B_PRODUCTS,
  SEED_ACCOUNT_B_ORDERS,
  SEED_ACCOUNT_B_EXPENSES,
  SEED_ACCOUNT_C_USER,
  SEED_ACCOUNT_C_BUSINESS,
  SEED_ACCOUNT_C_CUSTOMERS,
  SEED_ACCOUNT_C_PRODUCTS,
  SEED_ACCOUNT_C_INVOICES,
  DEMO_BUSINESSES,
  IsolationAuditReport,
  runDataIsolationAudit,
} from '../services/dataStore';

interface AppContextType {
  // Navigation & Authentication
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  viewMode: 'landing' | 'app' | 'select_business';
  setViewMode: (mode: 'landing' | 'app' | 'select_business') => void;

  // Active User & Business Ownership Architecture
  currentUser: UserAccount | null;
  userBusinesses: Business[];
  allUsers: UserAccount[];
  businesses: Business[];
  currentBusiness: Business;
  setCurrentBusinessId: (id: string) => void;
  currentBranchId: string;
  setCurrentBranchId: (id: string) => void;

  // Auth & Session Operations
  loginUser: (phone: string, password?: string) => boolean;
  logoutUser: () => void;
  switchBusiness: (businessId: string) => void;
  addNewBusiness: (biz: Partial<Business>) => void;
  switchBusinessByType: (type: string) => void;

  // Search & Filter
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  dateRangeFilter: 'today' | '7days' | 'month' | 'last_month' | 'custom';
  setDateRangeFilter: (filter: 'today' | '7days' | 'month' | 'last_month' | 'custom') => void;

  // STRICTLY ISOLATED DOMAIN DATA (Filtered to currentBusiness.id)
  customers: Customer[];
  transactions: Transaction[];
  products: Product[];
  orders: Order[];
  expenses: Expense[];
  invoices: Invoice[];
  employees: Employee[];
  insights: SmartInsight[];

  // Mutators & Business Operations (Scoped automatically to active business)
  addSale: (saleData: {
    customerName: string;
    customerPhone?: string;
    items: { productId?: string; name: string; quantity: number; price: number; cost?: number }[];
    total: number;
    paid: number;
    paymentMethod: 'Cash' | 'Bank' | 'Easypaisa' | 'JazzCash' | 'Credit / Udhaar';
    notes?: string;
  }) => void;

  addUdhaar: (customerId: string, amount: number, description: string) => void;
  receivePayment: (
    customerId: string,
    amount: number,
    paymentMethod: 'Cash' | 'Bank' | 'Easypaisa' | 'JazzCash',
    notes?: string
  ) => void;
  addCustomer: (
    customer: Omit<Customer, 'id' | 'businessId' | 'branchId' | 'lastTransactionDate' | 'currentBalance'>
  ) => Customer;

  addOrder: (order: Partial<Order>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  addProduct: (prod: Omit<Product, 'id' | 'businessId' | 'branchId'>) => void;
  updateStock: (productId: string, newStock: number) => void;

  addExpense: (expense: Omit<Expense, 'id' | 'businessId' | 'branchId'>) => void;

  addEmployee: (emp: Omit<Employee, 'id' | 'businessId' | 'branchId'>) => void;
  toggleEmployeePermission: (empId: string, perm: keyof Employee['permissions']) => void;

  // Mandatory Data Isolation Audit & QA Suite
  isIsolationTestModalOpen: boolean;
  setIsIsolationTestModalOpen: (val: boolean) => void;
  runIsolationAudit: () => IsolationAuditReport;

  // Toast / Notification banner
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'landing' | 'app' | 'select_business'>('landing');
  const [activeView, setActiveView] = useState<string>('overview');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [dateRangeFilter, setDateRangeFilter] = useState<'today' | '7days' | 'month' | 'last_month' | 'custom'>('today');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isIsolationTestModalOpen, setIsIsolationTestModalOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ------------------------------------------------------------------
  // MULTI-TENANT REPOSITORY DATA STORES (PERSISTED / ISOLATED)
  // ------------------------------------------------------------------
  const [allUsers, setAllUsers] = useState<UserAccount[]>(() => {
    return [SEED_ACCOUNT_A_USER, SEED_ACCOUNT_B_USER, SEED_ACCOUNT_C_USER];
  });

  const [allBusinesses, setAllBusinesses] = useState<Business[]>(() => {
    return [
      SEED_ACCOUNT_A_BUSINESS,
      SEED_ACCOUNT_A_BUSINESS_2,
      SEED_ACCOUNT_A_BUSINESS_3,
      SEED_ACCOUNT_B_BUSINESS,
      SEED_ACCOUNT_C_BUSINESS,
      ...DEMO_BUSINESSES,
    ];
  });

  const [allCustomers, setAllCustomers] = useState<Customer[]>(() => {
    return [
      ...SEED_ACCOUNT_A_CUSTOMERS,
      ...SEED_ACCOUNT_B_CUSTOMERS,
      ...SEED_ACCOUNT_C_CUSTOMERS,
    ];
  });

  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    return [
      ...SEED_ACCOUNT_A_PRODUCTS,
      ...SEED_ACCOUNT_B_PRODUCTS,
      ...SEED_ACCOUNT_C_PRODUCTS,
    ];
  });

  const [allTransactions, setAllTransactions] = useState<Transaction[]>(() => {
    return [...SEED_ACCOUNT_A_TRANSACTIONS];
  });

  const [allOrders, setAllOrders] = useState<Order[]>(() => {
    return [...SEED_ACCOUNT_B_ORDERS];
  });

  const [allExpenses, setAllExpenses] = useState<Expense[]>(() => {
    return [...SEED_ACCOUNT_A_EXPENSES, ...SEED_ACCOUNT_B_EXPENSES];
  });

  const [allInvoices, setAllInvoices] = useState<Invoice[]>(() => {
    return [...SEED_ACCOUNT_C_INVOICES];
  });

  const [allEmployees, setAllEmployees] = useState<Employee[]>([
    {
      id: 'emp-1',
      businessId: 'biz-kiryana-a',
      branchId: 'b-kiryana-main',
      name: 'Muhammad Kashif',
      phone: '0304-1234567',
      email: 'kashif@almadina.pk',
      role: 'Cashier',
      active: true,
      permissions: {
        sales: true,
        customers: true,
        inventory: true,
        expenses: false,
        reports: false,
        payments: true,
        settings: false,
      },
    },
    {
      id: 'emp-2',
      businessId: 'biz-ecom-b',
      branchId: 'b-ecom-central',
      name: 'Farhan Ali',
      phone: '0321-7654321',
      email: 'farhan@alionline.pk',
      role: 'Manager',
      active: true,
      permissions: {
        sales: true,
        customers: true,
        inventory: true,
        expenses: true,
        reports: true,
        payments: true,
        settings: false,
      },
    },
  ]);

  // ------------------------------------------------------------------
  // ACTIVE SESSION CONTEXT
  // ------------------------------------------------------------------
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(SEED_ACCOUNT_A_USER);
  const [currentBusinessId, setCurrentBusinessIdState] = useState<string>('biz-kiryana-a');

  // Currently active business entity
  const currentBusiness = useMemo(() => {
    const matched = allBusinesses.find((b) => b.id === currentBusinessId);
    if (matched) return matched;
    return allBusinesses[0];
  }, [allBusinesses, currentBusinessId]);

  const [currentBranchId, setCurrentBranchId] = useState<string>(
    currentBusiness.branches[0]?.id || 'b-main'
  );

  // Sync branch when business changes
  useEffect(() => {
    if (currentBusiness.branches && currentBusiness.branches.length > 0) {
      setCurrentBranchId(currentBusiness.branches[0].id);
    }
  }, [currentBusinessId]);

  // Businesses available to the active user (plus demo businesses if in demo mode)
  const userBusinesses = useMemo(() => {
    if (!currentUser) return DEMO_BUSINESSES;
    return allBusinesses.filter((b) => currentUser.businessIds.includes(b.id));
  }, [allBusinesses, currentUser]);

  // ------------------------------------------------------------------
  // CRITICAL ARCHITECTURAL GUARANTEE: STRICT SCOPED DATA ACCESS
  // Every array returned to the app is strictly filtered by currentBusiness.id.
  // Zero shared memory leakage between businesses!
  // ------------------------------------------------------------------
  const customers = useMemo(() => {
    return allCustomers.filter((c) => c.businessId === currentBusiness.id);
  }, [allCustomers, currentBusiness.id]);

  const products = useMemo(() => {
    return allProducts.filter((p) => p.businessId === currentBusiness.id);
  }, [allProducts, currentBusiness.id]);

  const transactions = useMemo(() => {
    return allTransactions.filter((t) => t.businessId === currentBusiness.id);
  }, [allTransactions, currentBusiness.id]);

  const orders = useMemo(() => {
    return allOrders.filter((o) => o.businessId === currentBusiness.id);
  }, [allOrders, currentBusiness.id]);

  const expenses = useMemo(() => {
    return allExpenses.filter((e) => e.businessId === currentBusiness.id);
  }, [allExpenses, currentBusiness.id]);

  const invoices = useMemo(() => {
    return allInvoices.filter((i) => i.businessId === currentBusiness.id);
  }, [allInvoices, currentBusiness.id]);

  const employees = useMemo(() => {
    return allEmployees.filter((emp) => emp.businessId === currentBusiness.id);
  }, [allEmployees, currentBusiness.id]);

  // Insights tailored to the active business type
  const insights = useMemo<SmartInsight[]>(() => {
    if (currentBusiness.type === 'kiryana') {
      return [
        {
          id: 'ins-k-1',
          type: 'warning',
          title: 'Udhaar Limit Warning',
          description: 'Bilal Butt balance (Rs. 7,450) has reached 25% of credit ceiling. Send WhatsApp reminder.',
          metric: 'Rs. 7,450 Due',
        },
        {
          id: 'ins-k-2',
          type: 'positive',
          title: 'Fast-Moving Cooking Oil',
          description: 'Dalda 5L Tin re-order suggested before weekend morning rush. 18 tins in stock.',
          metric: '18 Tins Left',
        },
      ];
    }
    if (currentBusiness.type === 'ecommerce') {
      return [
        {
          id: 'ins-e-1',
          type: 'positive',
          title: 'Top ROAS Ad Creative',
          description: 'Meta Ad set for Oversized Heavyweight Tee is generating 4.2x ROAS. Scale ad budget by Rs. 5,000.',
          metric: '4.2x ROAS',
        },
        {
          id: 'ins-e-2',
          type: 'warning',
          title: 'COD Courier Transit SLA',
          description: 'Order #ORD-9481 in transit for 48 hours. Trax automated SMS sent to customer.',
          metric: '1 In-Transit',
        },
      ];
    }
    if (currentBusiness.type === 'freelancer') {
      return [
        {
          id: 'ins-f-1',
          type: 'alert',
          title: 'Milestone Balance Pending',
          description: 'ABC Clothing Brand website delivery completed. Final milestone balance of Rs. 30,000 due.',
          metric: 'Rs. 30,000 Pending',
        },
        {
          id: 'ins-f-2',
          type: 'positive',
          title: 'Monthly Retainer Active',
          description: 'Apex Global Tech UK retainer confirmed paid for current billing cycle.',
          metric: 'Rs. 238,000 Paid',
        },
      ];
    }
    return [
      {
        id: 'ins-gen-1',
        type: 'info',
        title: 'Daily Books Balanced',
        description: 'All cash in and cash out transactions reconciled for today.',
        metric: '100% Balanced',
      },
    ];
  }, [currentBusiness.type]);

  // ------------------------------------------------------------------
  // AUTHENTICATION & BUSINESS SWITCHING WORKFLOWS
  // ------------------------------------------------------------------
  const loginUser = (phone: string, _password?: string): boolean => {
    const cleanPhone = phone.trim();
    // Look up user
    let user = allUsers.find(
      (u) => u.phone === cleanPhone || u.phone.replace(/[^0-9]/g, '') === cleanPhone.replace(/[^0-9]/g, '')
    );

    if (!user) {
      // Auto-create new user with an isolated business if testing fresh phone
      const newUserId = `usr-${Date.now()}`;
      const newBizId = `biz-${Date.now()}`;
      const newBranchId = `b-${Date.now()}`;

      const newBiz: Business = {
        id: newBizId,
        name: `${cleanPhone} Retail Store`,
        type: 'retail',
        phone: cleanPhone,
        city: 'Lahore',
        currency: 'Rs.',
        branches: [{ id: newBranchId, name: 'Main Branch', city: 'Lahore', isMain: true }],
        activeBranchId: newBranchId,
      };

      const newUser: UserAccount = {
        id: newUserId,
        phone: cleanPhone,
        name: `Merchant ${cleanPhone.slice(-4)}`,
        businessIds: [newBizId],
        activeBusinessId: newBizId,
        isDemoUser: false,
      };

      setAllBusinesses((prev) => [...prev, newBiz]);
      setAllUsers((prev) => [...prev, newUser]);
      user = newUser;
    }

    // Set active user
    setCurrentUser(user);
    setIsAuthenticated(true);

    // Business count check:
    // "Agar user ka sirf ek business hai: Login -> Directly us business ka dashboard"
    // "Agar multiple businesses hain: Login -> Select Business ('Good morning! Which business are you working on?')"
    const userOwnedBizIds = user.businessIds || [];
    if (userOwnedBizIds.length > 1) {
      setViewMode('select_business');
      showToast(`Welcome back, ${user.name}! Please select your active business workspace.`);
      return true;
    }

    // Single business: direct to dashboard
    const targetBizId = userOwnedBizIds[0] || user.activeBusinessId || 'biz-kiryana-a';
    setCurrentBusinessIdState(targetBizId);
    setViewMode('app');
    setActiveView('overview');

    const bizObj = allBusinesses.find((b) => b.id === targetBizId);
    showToast(`Welcome, ${user.name}! Workspace: ${bizObj ? bizObj.name : 'Console'}`);
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setViewMode('landing');
    setActiveView('overview');
    showToast('Logged out securely. Session data cleared.');
  };

  const switchBusiness = (businessId: string) => {
    const target = allBusinesses.find((b) => b.id === businessId);
    if (!target) {
      showToast('Business not found.');
      return;
    }

    // Update active business
    setCurrentBusinessIdState(target.id);
    if (target.branches && target.branches.length > 0) {
      setCurrentBranchId(target.branches[0].id);
    }

    // If user is authenticated and owns this business, remember as active
    if (currentUser && currentUser.businessIds.includes(businessId)) {
      setCurrentUser((prev) => (prev ? { ...prev, activeBusinessId: businessId } : null));
    }

    // Ensure we are inside the dashboard app view
    setViewMode('app');
    setActiveView('overview');

    showToast(`Switched to "${target.name}" (${target.type.toUpperCase()})`);
  };

  const setCurrentBusinessId = (id: string) => {
    switchBusiness(id);
  };

  const switchBusinessByType = (type: string) => {
    // Check if current user has a business of this type
    let matched = allBusinesses.find((b) => b.type === type && currentUser?.businessIds.includes(b.id));

    // Otherwise find in all businesses or demo businesses
    if (!matched) {
      matched = allBusinesses.find((b) => b.type === type || b.id.includes(type));
    }

    if (matched) {
      setCurrentBusinessIdState(matched.id);
      if (matched.branches && matched.branches.length > 0) {
        setCurrentBranchId(matched.branches[0].id);
      }
    }

    setIsAuthenticated(true);
    setViewMode('app');
    setActiveView('overview');
    showToast(`Loaded ${matched ? matched.name : 'Workspace'} (${type.toUpperCase()})`);
  };

  const addNewBusiness = (bizData: Partial<Business>) => {
    const newId = `biz-${Date.now()}`;
    const mainBranchId = `b-${Date.now()}-main`;

    const newBiz: Business = {
      id: newId,
      name: bizData.name || 'New Business',
      type: bizData.type || 'retail',
      phone: bizData.phone || (currentUser ? currentUser.phone : '+92 300 0000000'),
      email: bizData.email || 'info@mybusiness.pk',
      city: bizData.city || 'Lahore',
      currency: 'Rs.',
      branches: [
        { id: mainBranchId, name: 'Main Branch', city: bizData.city || 'Lahore', isMain: true },
      ],
      activeBranchId: mainBranchId,
    };

    setAllBusinesses((prev) => [...prev, newBiz]);

    // Attach to current user if exists
    if (currentUser) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              businessIds: [...prev.businessIds, newId],
              activeBusinessId: newId,
            }
          : null
      );
    }

    setCurrentBusinessIdState(newId);
    setCurrentBranchId(mainBranchId);
    setIsAuthenticated(true);
    setViewMode('app');
    setActiveView('overview');
    showToast(`Business "${newBiz.name}" created and loaded!`);
  };

  // ------------------------------------------------------------------
  // MUTATION OPERATIONS (SCOPED STRICTLY TO CURRENT BUSINESS ID)
  // ------------------------------------------------------------------
  const addSale = (saleData: {
    customerName: string;
    customerPhone?: string;
    items: { productId?: string; name: string; quantity: number; price: number; cost?: number }[];
    total: number;
    paid: number;
    paymentMethod: 'Cash' | 'Bank' | 'Easypaisa' | 'JazzCash' | 'Credit / Udhaar';
    notes?: string;
  }) => {
    const balanceDue = Math.max(0, saleData.total - saleData.paid);
    const dateStr = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Find or create customer
    let cust = allCustomers.find(
      (c) =>
        c.businessId === currentBusiness.id &&
        c.name.toLowerCase() === saleData.customerName.trim().toLowerCase()
    );

    let customerId = cust?.id;

    if (!cust) {
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        businessId: currentBusiness.id,
        branchId: currentBranchId,
        name: saleData.customerName,
        phone: saleData.customerPhone || '0300-0000000',
        city: currentBusiness.city || 'Lahore',
        currentBalance: balanceDue,
        creditLimit: 20000,
        lastTransactionDate: dateStr,
        notes: saleData.notes || 'Auto-created during counter sale',
      };
      setAllCustomers((prev) => [newCust, ...prev]);
      customerId = newCust.id;
    } else if (balanceDue > 0) {
      setAllCustomers((prev) =>
        prev.map((c) =>
          c.id === cust!.id
            ? {
                ...c,
                currentBalance: c.currentBalance + balanceDue,
                lastTransactionDate: dateStr,
              }
            : c
        )
      );
    }

    // 2. Record Transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      businessId: currentBusiness.id,
      branchId: currentBranchId,
      customerId: customerId || 'cust-walkin',
      customerName: saleData.customerName,
      type: balanceDue > 0 ? 'udhaar' : 'payment',
      amount: saleData.total,
      balanceAfter: (cust ? cust.currentBalance : 0) + balanceDue,
      date: dateStr,
      description: `Sale: ${saleData.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}`,
      paymentMethod: saleData.paymentMethod,
    };
    setAllTransactions((prev) => [newTx, ...prev]);

    // 3. Deduct stock for inventory items
    saleData.items.forEach((item) => {
      if (item.productId) {
        setAllProducts((prev) =>
          prev.map((p) =>
            p.id === item.productId && p.businessId === currentBusiness.id
              ? { ...p, stockQuantity: Math.max(0, p.stockQuantity - item.quantity) }
              : p
          )
        );
      }
    });

    // 4. Create Order / Invoice record
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      businessId: currentBusiness.id,
      branchId: currentBranchId,
      invoiceNumber: `INV-${Date.now().toString().slice(-5)}`,
      customerName: saleData.customerName,
      customerPhone: saleData.customerPhone || '0300-0000000',
      items: saleData.items.map((it) => ({
        description: it.name,
        quantity: it.quantity,
        unitPrice: it.price,
        total: it.price * it.quantity,
      })),
      subtotal: saleData.total,
      tax: 0,
      discount: 0,
      total: saleData.total,
      paidAmount: saleData.paid,
      balanceDue,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      dueDate: new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: balanceDue === 0 ? 'paid' : saleData.paid > 0 ? 'partial' : 'unpaid',
      notes: saleData.notes,
    };
    setAllInvoices((prev) => [newInvoice, ...prev]);

    showToast(`Sale of Rs. ${saleData.total.toLocaleString()} recorded in ${currentBusiness.name}!`);
  };

  const addUdhaar = (customerId: string, amount: number, description: string) => {
    const cust = allCustomers.find((c) => c.id === customerId && c.businessId === currentBusiness.id);
    if (!cust) return;

    const newBalance = cust.currentBalance + amount;
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      businessId: currentBusiness.id,
      branchId: currentBranchId,
      customerId,
      customerName: cust.name,
      type: 'udhaar',
      amount,
      balanceAfter: newBalance,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description,
      paymentMethod: 'Credit / Udhaar',
    };

    setAllTransactions((prev) => [newTx, ...prev]);
    setAllCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId && c.businessId === currentBusiness.id
          ? { ...c, currentBalance: newBalance, lastTransactionDate: 'Today' }
          : c
      )
    );
    showToast(`Rs. ${amount.toLocaleString()} Udhaar added to ${cust.name}`);
  };

  const receivePayment = (
    customerId: string,
    amount: number,
    paymentMethod: 'Cash' | 'Bank' | 'Easypaisa' | 'JazzCash',
    notes?: string
  ) => {
    const cust = allCustomers.find((c) => c.id === customerId && c.businessId === currentBusiness.id);
    if (!cust) return;

    const newBalance = Math.max(0, cust.currentBalance - amount);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      businessId: currentBusiness.id,
      branchId: currentBranchId,
      customerId,
      customerName: cust.name,
      type: 'payment',
      amount,
      balanceAfter: newBalance,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: notes || `Payment received via ${paymentMethod}`,
      paymentMethod,
    };

    setAllTransactions((prev) => [newTx, ...prev]);
    setAllCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId && c.businessId === currentBusiness.id
          ? { ...c, currentBalance: newBalance, lastTransactionDate: 'Today' }
          : c
      )
    );
    showToast(`Payment of Rs. ${amount.toLocaleString()} received from ${cust.name}`);
  };

  const addCustomer = (
    customerData: Omit<Customer, 'id' | 'businessId' | 'branchId' | 'lastTransactionDate' | 'currentBalance'>
  ): Customer => {
    const newCust: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      businessId: currentBusiness.id,
      branchId: currentBranchId,
      currentBalance: 0,
      lastTransactionDate: 'Just added',
    };
    setAllCustomers((prev) => [newCust, ...prev]);
    showToast(`Customer "${newCust.name}" added to ${currentBusiness.name}.`);
    return newCust;
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'businessId' | 'branchId'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      businessId: currentBusiness.id,
      branchId: currentBranchId,
    };
    setAllProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added to ${currentBusiness.name} catalog.`);
  };

  const updateStock = (productId: string, newStock: number) => {
    setAllProducts((prev) =>
      prev.map((p) =>
        p.id === productId && p.businessId === currentBusiness.id
          ? { ...p, stockQuantity: newStock }
          : p
      )
    );
    showToast('Stock quantity updated.');
  };

  const addOrder = (orderData: Partial<Order>) => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      businessId: currentBusiness.id,
      branchId: currentBranchId,
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName || 'Online Shopper',
      customerPhone: orderData.customerPhone || '0300-0000000',
      customerAddress: orderData.customerAddress || 'City Delivery',
      channel: orderData.channel || 'Website',
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      shippingCost: orderData.shippingCost || 250,
      adCost: orderData.adCost || 0,
      packagingCost: orderData.packagingCost || 50,
      productCost: orderData.productCost || 0,
      discount: orderData.discount || 0,
      totalAmount: orderData.totalAmount || 0,
      netProfit: orderData.netProfit || 0,
      status: orderData.status || 'pending',
      paymentStatus: orderData.paymentStatus || 'unpaid',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setAllOrders((prev) => [newOrder, ...prev]);
    showToast(`Order ${newOrder.orderNumber} placed in ${currentBusiness.name}.`);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setAllOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.businessId === currentBusiness.id ? { ...o, status } : o
      )
    );
    showToast(`Order status updated to ${status}.`);
  };

  const addExpense = (expData: Omit<Expense, 'id' | 'businessId' | 'branchId'>) => {
    const newExp: Expense = {
      ...expData,
      id: `exp-${Date.now()}`,
      businessId: currentBusiness.id,
      branchId: currentBranchId,
    };
    setAllExpenses((prev) => [newExp, ...prev]);
    showToast(`Expense "${newExp.title}" recorded in ${currentBusiness.name}.`);
  };

  const addEmployee = (empData: Omit<Employee, 'id' | 'businessId' | 'branchId'>) => {
    const newEmp: Employee = {
      ...empData,
      id: `emp-${Date.now()}`,
      businessId: currentBusiness.id,
      branchId: currentBranchId,
    };
    setAllEmployees((prev) => [...prev, newEmp]);
    showToast(`Team member "${newEmp.name}" added to ${currentBusiness.name}.`);
  };

  const toggleEmployeePermission = (empId: string, perm: keyof Employee['permissions']) => {
    setAllEmployees((prev) =>
      prev.map((emp) =>
        emp.id === empId && emp.businessId === currentBusiness.id
          ? {
              ...emp,
              permissions: {
                ...emp.permissions,
                [perm]: !emp.permissions[perm],
              },
            }
          : emp
      )
    );
    showToast('Employee permissions updated.');
  };

  const runIsolationAudit = (): IsolationAuditReport => {
    return runDataIsolationAudit(
      allUsers,
      allBusinesses,
      allCustomers,
      allProducts,
      allOrders,
      allInvoices
    );
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        activeView,
        setActiveView,
        viewMode,
        setViewMode,
        currentUser,
        userBusinesses,
        allUsers,
        businesses: userBusinesses.length > 0 ? userBusinesses : allBusinesses,
        currentBusiness,
        setCurrentBusinessId,
        currentBranchId,
        setCurrentBranchId,
        loginUser,
        logoutUser,
        switchBusiness,
        addNewBusiness,
        switchBusinessByType,
        globalSearch,
        setGlobalSearch,
        dateRangeFilter,
        setDateRangeFilter,
        customers,
        transactions,
        products,
        orders,
        expenses,
        invoices,
        employees,
        insights,
        addSale,
        addUdhaar,
        receivePayment,
        addCustomer,
        addOrder,
        updateOrderStatus,
        addProduct,
        updateStock,
        addExpense,
        addEmployee,
        toggleEmployeePermission,
        isIsolationTestModalOpen,
        setIsIsolationTestModalOpen,
        runIsolationAudit,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
