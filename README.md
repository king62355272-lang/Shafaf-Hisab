# SHAFAF HISAB — Business Management Platform
> **Manage Better. Grow Smarter.**

A complete, high-performance Business Management Platform built for Retail, Kiryana, E-commerce, Garments, Wholesale, Services, and Multi-Branch Enterprises.

---

## 🚀 Quick Start (Running Outside Google AI Studio)

This project is a standard React 19 + TypeScript + Vite application. It runs locally on your computer without requiring any external cloud setup.

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to: `http://localhost:3000` (or the port Vite prints in the terminal).

### 3. Production Build & Preview
```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🛡️ Complete Data Isolation Architecture

Every user account, business entity, and branch in SHAFAF HISAB is strictly isolated with zero data contamination:

- **Entity Model**:
  ```text
  User Account (Phone / Login)
   └── Business 1 (e.g. Al-Madina Kiryana - Kiryana Retail)
        ├── Customers & Udhaar Ledgers
        ├── Products & Inventory
        ├── Sales & Orders
        ├── Expenses & Purchases
        ├── Invoices & Account Statements
        └── P&L Analytics
   └── Business 2 (e.g. Ali Online Store - E-Commerce)
        ├── Orders & Shipments
        ├── Ad Spend & Net Margins
        └── Inventory
  ```

- **Query-Level Scoping**: All queries require an explicit `businessId`. There are zero unscoped global database queries.
- **Pre-Configured Test Accounts for Verification**:
  - **Account A** (`0300-1111111`): Al-Madina Kiryana (Kiryana / Grocery store with Udhaar, Khata, FMCG products).
  - **Account B** (`0300-2222222`): Ali Online Store (Pure E-Commerce store with orders, return rates, ROAS, courier tracking).
  - **Account C** (`0300-3333333`): Multi-Business Owner (owns both "Apex Agency" and "Apex Logistics" under the same phone number).

---

## 🎨 Technology Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Server**: Vite 6 (runs on port 3000)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Document Generation**: jsPDF & jsPDF-AutoTable (PDF Invoices & Statements)
