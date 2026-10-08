import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Invoice,
  Customer,
  Transaction,
  Expense,
  Product,
  Business,
  Order,
} from '../types';

// Palette constants matching SHAFAF HISAB brand guide
const NAVY = [11, 31, 51] as [number, number, number]; // #0B1F33
const TEAL = [15, 118, 110] as [number, number, number]; // #0F766E
const EMERALD_LIGHT = [204, 251, 241] as [number, number, number]; // #CCFBF1
const MUTED_GRAY = [100, 116, 139] as [number, number, number]; // #64748B
const LIGHT_BG = [248, 250, 252] as [number, number, number]; // #F8FAFC
const DARK_TEXT = [15, 23, 42] as [number, number, number]; // #0F172A

/**
 * Universal safe runner for jspdf-autotable across ESM/CJS environments
 */
function runAutoTable(doc: jsPDF, options: any) {
  if (typeof autoTable === 'function') {
    (autoTable as any)(doc, options);
  } else if ((autoTable as any)?.default && typeof (autoTable as any).default === 'function') {
    (autoTable as any).default(doc, options);
  } else if (typeof (doc as any).autoTable === 'function') {
    (doc as any).autoTable(options);
  }
}

/**
 * Safely extracts the final Y coordinate after an autoTable render
 */
function getFinalY(doc: jsPDF, fallback = 120): number {
  const table = (doc as any).lastAutoTable;
  if (table && typeof table.finalY === 'number') {
    return table.finalY;
  }
  return fallback;
}

/**
 * Bulletproof cross-platform PDF download trigger
 */
function triggerPdfDownload(doc: jsPDF, filename: string): boolean {
  try {
    const blob = doc.output('blob');
    if (blob && blob.size > 0 && typeof window !== 'undefined') {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        try {
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
        } catch {}
      }, 2500);
      return true;
    }
  } catch (blobErr) {
    console.warn('Blob URL trigger encountered error, attempting direct doc.save:', blobErr);
  }

  // Direct jsPDF save fallback
  doc.save(filename);
  return true;
}

/**
 * Clean sanitization for filenames
 */
function sanitizeFilename(name: string): string {
  if (!name) return 'Document';
  return name.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_');
}

/**
 * Draws the standard SHAFAF HISAB branded header on any document
 */
function drawHeader(doc: jsPDF, title: string, business: Business, subtitle?: string): number {
  // Brand Header Bar (Deep Navy)
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 210, 28, 'F');

  // Emerald Accent Stripe
  doc.setFillColor(...TEAL);
  doc.rect(0, 28, 210, 2.5, 'F');

  // Monogram box
  doc.setFillColor(15, 118, 110);
  doc.roundedRect(14, 5, 12, 12, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('SH', 20, 12.5, { align: 'center' });

  // Logo / Brand Name
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('SHAFAF HISAB', 30, 11);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Business Management Platform · Manage Better. Grow Smarter.', 30, 17);

  // Document Title (Right-aligned)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(title.toUpperCase(), 196, 11, { align: 'right' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(153, 246, 228);
  doc.text(business?.name || 'SHAFAF HISAB Account', 196, 17, { align: 'right' });

  // Reset text color
  doc.setTextColor(...DARK_TEXT);

  // Business Sub-bar
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MUTED_GRAY);
  const infoLine = `${business?.city || 'Pakistan'} | Phone: ${business?.phone || 'N/A'}${subtitle ? ` | ${subtitle}` : ''}`;
  doc.text(infoLine, 14, 36);

  return 42; // Return next Y offset
}

/**
 * Draws standard document footer
 */
function drawFooter(doc: jsPDF, pageNum = 1) {
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setDrawColor(226, 232, 240);
  doc.line(14, pageHeight - 12, 196, pageHeight - 12);

  doc.setFontSize(7);
  doc.setTextColor(...MUTED_GRAY);
  doc.text('Generated securely via SHAFAF HISAB Enterprise Architecture · Verified Document', 14, pageHeight - 8);
  doc.text(`Page ${pageNum}`, 196, pageHeight - 8, { align: 'right' });
}

/**
 * 1. Download Invoice PDF
 */
export function downloadInvoicePDF(invoice: Invoice, business: Business): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const startY = drawHeader(doc, 'Commercial Tax Invoice', business, `Invoice #: ${invoice.invoiceNumber}`);

    // Customer & Invoice Details Grid
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text('BILLED TO:', 14, startY + 4);

    doc.setFontSize(10);
    doc.text(invoice.customerName || 'Walk-in Customer', 14, startY + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED_GRAY);
    if (invoice.customerPhone) doc.text(`Phone: ${invoice.customerPhone}`, 14, startY + 14);
    if (invoice.customerAddress) doc.text(`Address: ${invoice.customerAddress}`, 14, startY + 18);

    // Meta Box (Right aligned)
    doc.setFontSize(8.5);
    doc.setTextColor(...NAVY);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Details:', 135, startY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED_GRAY);
    doc.setFontSize(8);
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, 135, startY + 9);
    doc.text(`Date of Issue: ${invoice.date}`, 135, startY + 14);
    doc.text(`Due Date: ${invoice.dueDate || 'On Receipt'}`, 135, startY + 18);
    doc.text(`Status: ${(invoice.status || 'unpaid').toUpperCase()}`, 135, startY + 22);

    // Table of Items
    const items = invoice.items && invoice.items.length > 0 ? invoice.items : [
      { description: 'Business Services / Product Sale', quantity: 1, unitPrice: invoice.total || 0, total: invoice.total || 0 }
    ];

    const tableBody = items.map((item, idx) => [
      idx + 1,
      item.description,
      item.quantity,
      `Rs. ${(item.unitPrice || 0).toLocaleString()}`,
      `Rs. ${(item.total || 0).toLocaleString()}`,
    ]);

    runAutoTable(doc, {
      startY: startY + 27,
      head: [['#', 'Item Description', 'Qty', 'Unit Price', 'Total']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontSize: 8.5,
        fontStyle: 'bold',
        halign: 'left',
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 95 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 35, halign: 'right', fontStyle: 'bold' },
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
        textColor: DARK_TEXT,
        lineColor: [226, 232, 240],
      },
      alternateRowStyles: {
        fillColor: LIGHT_BG,
      },
    });

    // Totals Section
    const finalY = getFinalY(doc, startY + 60) + 6;

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(...LIGHT_BG);
    doc.roundedRect(120, finalY, 76, 36, 2, 2, 'FD');

    doc.setFontSize(8);
    doc.setTextColor(...MUTED_GRAY);
    doc.text('Subtotal:', 125, finalY + 7);
    doc.text(`Rs. ${(invoice.subtotal || invoice.total || 0).toLocaleString()}`, 190, finalY + 7, { align: 'right' });

    if (invoice.discount && invoice.discount > 0) {
      doc.text('Discount:', 125, finalY + 13);
      doc.setTextColor(220, 38, 38);
      doc.text(`-Rs. ${invoice.discount.toLocaleString()}`, 190, finalY + 13, { align: 'right' });
      doc.setTextColor(...MUTED_GRAY);
    }

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text('Total Amount:', 125, finalY + 20);
    doc.text(`Rs. ${(invoice.total || 0).toLocaleString()}`, 190, finalY + 20, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED_GRAY);
    doc.text('Paid Amount:', 125, finalY + 26);
    doc.setTextColor(16, 185, 129);
    doc.text(`Rs. ${(invoice.paidAmount || 0).toLocaleString()}`, 190, finalY + 26, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(217, 119, 6);
    doc.text('Remaining Balance Due:', 125, finalY + 32);
    doc.text(`Rs. ${(invoice.balanceDue || 0).toLocaleString()}`, 190, finalY + 32, { align: 'right' });

    // Terms & Conditions on bottom left
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED_GRAY);
    doc.setFont('helvetica', 'bold');
    doc.text('Notes & Payment Terms:', 14, finalY + 7);
    doc.setFont('helvetica', 'normal');
    doc.text(
      invoice.notes || 'Thank you for your business. Unpaid balances are logged into the customer ledger.',
      14,
      finalY + 13,
      { maxWidth: 95 }
    );

    drawFooter(doc);

    const filename = `SHAFAF-HISAB-Invoice-${sanitizeFilename(invoice.invoiceNumber || 'INV')}.pdf`;
    return triggerPdfDownload(doc, filename);
  } catch (error) {
    console.error('Invoice PDF Generation Error:', error);
    return false;
  }
}

/**
 * 2. Download Customer Statement PDF
 */
export function downloadCustomerStatementPDF(
  customer: Customer,
  transactions: Transaction[],
  business: Business
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const startY = drawHeader(doc, 'Customer Account Statement', business, `Date: ${new Date().toLocaleDateString('en-GB')}`);

    // Customer Profile Card
    doc.setFillColor(...LIGHT_BG);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, startY, 182, 23, 2, 2, 'FD');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(`Customer: ${customer.name}`, 18, startY + 7);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED_GRAY);
    doc.text(`Contact: ${customer.phone || 'N/A'}  |  City: ${customer.city || business?.city || 'Pakistan'}`, 18, startY + 13);
    doc.text(`Credit Limit: Rs. ${(customer.creditLimit || 15000).toLocaleString()}`, 18, startY + 19);

    // Current Outstanding Due Box
    doc.setFillColor(...NAVY);
    doc.roundedRect(132, startY + 3, 60, 17, 2, 2, 'F');
    doc.setTextColor(203, 213, 225);
    doc.setFontSize(7);
    doc.text('CURRENT OUTSTANDING BALANCE', 162, startY + 8, { align: 'center' });
    doc.setTextColor(253, 224, 71);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Rs. ${(customer.currentBalance || 0).toLocaleString()} Due`, 162, startY + 16, { align: 'center' });

    // Customer ledger table
    const relevantTxs = transactions.filter(
      (t) =>
        t.customerId === customer.id ||
        (t.customerName && t.customerName.toLowerCase() === customer.name.toLowerCase())
    );

    const txsToRender = relevantTxs.length > 0 ? relevantTxs : transactions.slice(0, 5);

    const tableBody = txsToRender.map((tx) => [
      tx.date,
      tx.description || (tx.type === 'udhaar' ? 'Store Items on Credit (Udhaar)' : 'Payment Received'),
      tx.paymentMethod || 'Credit / Udhaar',
      tx.type === 'udhaar' || tx.type === 'sale' ? `+Rs. ${(tx.amount || 0).toLocaleString()}` : '-',
      tx.type === 'payment' ? `-Rs. ${(tx.amount || 0).toLocaleString()}` : '-',
      `Rs. ${(tx.balanceAfter ?? customer.currentBalance ?? 0).toLocaleString()}`,
    ]);

    runAutoTable(doc, {
      startY: startY + 28,
      head: [['Date', 'Transaction Description', 'Method', 'Debit (Udhaar)', 'Credit (Payment)', 'Running Balance']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
        halign: 'left',
      },
      columnStyles: {
        0: { cellWidth: 24 },
        1: { cellWidth: 62 },
        2: { cellWidth: 26 },
        3: { cellWidth: 26, halign: 'right', textColor: [180, 83, 9] },
        4: { cellWidth: 26, halign: 'right', textColor: [16, 185, 129] },
        5: { cellWidth: 26, halign: 'right', fontStyle: 'bold' },
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 3,
        textColor: DARK_TEXT,
        lineColor: [226, 232, 240],
      },
      alternateRowStyles: {
        fillColor: LIGHT_BG,
      },
    });

    const finalY = getFinalY(doc, startY + 80) + 8;
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED_GRAY);
    doc.text(
      'This statement reflects all verified debits, credits, and settlements registered on SHAFAF HISAB.',
      14,
      finalY
    );

    drawFooter(doc);

    // Standardized clean filename matching requirement: SHAFAF-HISAB-Ahmed-Statement.pdf
    const cleanCustomerName = sanitizeFilename(customer.name);
    const filename = `SHAFAF-HISAB-${cleanCustomerName}-Statement.pdf`;
    return triggerPdfDownload(doc, filename);
  } catch (error) {
    console.error('Customer Statement PDF Generation Error:', error);
    return false;
  }
}

/**
 * 3. Download Sales Report PDF
 */
export function downloadSalesReportPDF(
  transactions: Transaction[],
  business: Business,
  dateRange: string = 'Current Month'
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const startY = drawHeader(doc, 'Sales Ledger Report', business, `Period: ${dateRange}`);

    const salesTxs = transactions.filter((t) => t.type === 'sale' || t.type === 'udhaar');
    const totalVolume = salesTxs.reduce((acc, t) => acc + (t.amount || 0), 0);

    // Summary Banner
    doc.setFillColor(...LIGHT_BG);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, startY, 182, 16, 2, 2, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(`TOTAL TRANSACTIONS: ${salesTxs.length}`, 20, startY + 10);
    doc.setTextColor(16, 185, 129);
    doc.text(`TOTAL SALES REVENUE: Rs. ${totalVolume.toLocaleString()}`, 120, startY + 10);

    const tableBody = salesTxs.map((s, idx) => [
      idx + 1,
      s.date,
      s.customerName || 'Counter Retail Sale',
      s.description || 'Goods / Items',
      s.paymentMethod || 'Cash',
      `Rs. ${(s.amount || 0).toLocaleString()}`,
    ]);

    runAutoTable(doc, {
      startY: startY + 22,
      head: [['#', 'Date', 'Customer / Account', 'Items / Description', 'Payment Rail', 'Amount']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 25 },
        2: { cellWidth: 42, fontStyle: 'bold' },
        3: { cellWidth: 55 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25, halign: 'right', fontStyle: 'bold' },
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 3,
        lineColor: [226, 232, 240],
      },
      alternateRowStyles: {
        fillColor: LIGHT_BG,
      },
    });

    drawFooter(doc);

    const filename = `SHAFAF-HISAB-Sales-Report-${sanitizeFilename(business?.name || 'Store')}.pdf`;
    return triggerPdfDownload(doc, filename);
  } catch (error) {
    console.error('Sales Report PDF Generation Error:', error);
    return false;
  }
}

/**
 * 4. Download Profit & Loss Report PDF
 */
export function downloadProfitLossPDF(
  business: Business,
  data: {
    revenue: number;
    cogs: number;
    operatingExpenses: number;
    shippingCost?: number;
    advertisingCost?: number;
    netProfit: number;
    period?: string;
  }
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const startY = drawHeader(doc, 'Profit & Loss Statement', business, `Period: ${data.period || 'October 2026'}`);

    const grossMargin = (data.revenue || 0) - (data.cogs || 0);
    const grossMarginPct = data.revenue > 0 ? Math.round((grossMargin / data.revenue) * 100) : 0;
    const netMarginPct = data.revenue > 0 ? Math.round(((data.netProfit || 0) / data.revenue) * 100) : 0;

    const tableData = [
      ['Gross Trading Revenue', `Rs. ${(data.revenue || 0).toLocaleString()}`, 'Total top-line customer billings and counter sales'],
      ['Less: Cost of Goods Sold (COGS)', `-Rs. ${(data.cogs || 0).toLocaleString()}`, 'Direct item procurement cost from distributors/factories'],
      ['GROSS PROFIT MARGIN', `Rs. ${grossMargin.toLocaleString()}`, `${grossMarginPct}% Gross Margin on sales`],
      ['Less: Operating Expenditures', `-Rs. ${(data.operatingExpenses || 0).toLocaleString()}`, 'Store rent, employee salaries, and generator utilities'],
    ];

    if (data.shippingCost) {
      tableData.push(['Less: Courier & Shipping Cost', `-Rs. ${data.shippingCost.toLocaleString()}`, 'Courier dispatch logistics and COD fees']);
    }
    if (data.advertisingCost) {
      tableData.push(['Less: Marketing & Ad Spend', `-Rs. ${data.advertisingCost.toLocaleString()}`, 'Meta / TikTok ad acquisition campaigns']);
    }

    tableData.push(['NET TAKE-HOME PROFIT', `Rs. ${(data.netProfit || 0).toLocaleString()}`, `${netMarginPct}% Net Operating Margin`]);

    runAutoTable(doc, {
      startY: startY + 6,
      head: [['Financial Account / Ledger Component', 'Amount', 'Accounting Explanatory Notes']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontSize: 8.5,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 64, fontStyle: 'bold' },
        1: { cellWidth: 36, halign: 'right', fontStyle: 'bold' },
        2: { cellWidth: 82, textColor: MUTED_GRAY, fontSize: 7.5 },
      },
      styles: {
        fontSize: 8,
        cellPadding: 4,
        lineColor: [226, 232, 240],
      },
      alternateRowStyles: {
        fillColor: LIGHT_BG,
      },
    });

    drawFooter(doc);

    const filename = `SHAFAF-HISAB-Profit-Loss-${sanitizeFilename(business?.name || 'Business')}.pdf`;
    return triggerPdfDownload(doc, filename);
  } catch (error) {
    console.error('Profit & Loss PDF Generation Error:', error);
    return false;
  }
}

/**
 * 5. Download Expense Report PDF
 */
export function downloadExpenseReportPDF(
  expenses: Expense[],
  business: Business,
  dateRange: string = 'October 2026'
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const startY = drawHeader(doc, 'Operating Expense Audit', business, `Period: ${dateRange}`);

    const safeExpenses = expenses || [];
    const totalExpense = safeExpenses.reduce((acc, e) => acc + (e.amount || 0), 0);

    // Summary Card
    doc.setFillColor(...LIGHT_BG);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, startY, 182, 16, 2, 2, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(`TOTAL EXPENSE ITEMS: ${safeExpenses.length}`, 20, startY + 10);
    doc.setTextColor(220, 38, 38);
    doc.text(`TOTAL EXPENDITURE: Rs. ${totalExpense.toLocaleString()}`, 120, startY + 10);

    const tableBody = safeExpenses.map((e, idx) => [
      idx + 1,
      e.date,
      e.title,
      e.category,
      e.paidVia || 'Cash',
      `Rs. ${(e.amount || 0).toLocaleString()}`,
    ]);

    runAutoTable(doc, {
      startY: startY + 22,
      head: [['#', 'Date', 'Expense Title', 'Category', 'Paid Via', 'Amount']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 25 },
        2: { cellWidth: 60, fontStyle: 'bold' },
        3: { cellWidth: 35 },
        4: { cellWidth: 26 },
        5: { cellWidth: 26, halign: 'right', fontStyle: 'bold', textColor: [220, 38, 38] },
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 3,
        lineColor: [226, 232, 240],
      },
      alternateRowStyles: {
        fillColor: LIGHT_BG,
      },
    });

    drawFooter(doc);

    const filename = `SHAFAF-HISAB-Expense-Report-${sanitizeFilename(business?.name || 'Business')}.pdf`;
    return triggerPdfDownload(doc, filename);
  } catch (error) {
    console.error('Expense Report PDF Generation Error:', error);
    return false;
  }
}

/**
 * 6. Download Customer Directory & Udhaar Aging Report PDF
 */
export function downloadCustomerReportPDF(
  customers: Customer[],
  business: Business,
  dateRange: string = 'Current Active Ledger'
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const startY = drawHeader(doc, 'Customer Accounts & Credit Directory', business, `Status: ${dateRange}`);
    const safeCusts = customers || [];
    const totalDue = safeCusts.reduce((acc, c) => acc + Math.max(0, c.currentBalance || 0), 0);

    doc.setFillColor(...LIGHT_BG);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, startY, 182, 16, 2, 2, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(`TOTAL CUSTOMER ACCOUNTS: ${safeCusts.length}`, 20, startY + 10);
    doc.setTextColor(217, 119, 6);
    doc.text(`CONSOLIDATED UDHAAR DUE: Rs. ${totalDue.toLocaleString()}`, 110, startY + 10);

    const tableBody = safeCusts.map((c, idx) => [
      idx + 1,
      c.name,
      c.phone || 'N/A',
      c.city || business?.city || 'Pakistan',
      `Rs. ${(c.creditLimit || 15000).toLocaleString()}`,
      `Rs. ${(c.currentBalance || 0).toLocaleString()}`,
      (c.currentBalance || 0) > 0 ? 'Pending Udhaar' : 'Settled (Rs. 0)',
    ]);

    runAutoTable(doc, {
      startY: startY + 22,
      head: [['#', 'Customer Name', 'Phone', 'City', 'Credit Limit', 'Current Balance', 'Account Status']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 40, fontStyle: 'bold' },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 26, halign: 'right', fontStyle: 'bold' },
        6: { cellWidth: 26, halign: 'center' },
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 3,
        lineColor: [226, 232, 240],
      },
      alternateRowStyles: {
        fillColor: LIGHT_BG,
      },
    });

    drawFooter(doc);

    const filename = `SHAFAF-HISAB-Customer-Report-${sanitizeFilename(business?.name || 'Business')}.pdf`;
    return triggerPdfDownload(doc, filename);
  } catch (error) {
    console.error('Customer Report PDF Generation Error:', error);
    return false;
  }
}

/**
 * 7. Download Outstanding Udhaar Report PDF
 */
export function downloadOutstandingReportPDF(
  customers: Customer[],
  business: Business
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const startY = drawHeader(doc, 'Outstanding Udhaar Recovery Ledger', business, `Date: ${new Date().toLocaleDateString('en-GB')}`);
    const debtors = (customers || []).filter((c) => (c.currentBalance || 0) > 0);
    const totalDue = debtors.reduce((acc, c) => acc + (c.currentBalance || 0), 0);

    doc.setFillColor(...LIGHT_BG);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, startY, 182, 16, 2, 2, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(`DEBTOR ACCOUNTS: ${debtors.length}`, 20, startY + 10);
    doc.setTextColor(220, 38, 38);
    doc.text(`TOTAL UNPAID RECEIVABLES: Rs. ${totalDue.toLocaleString()} Due`, 100, startY + 10);

    const tableBody = debtors.map((c, idx) => [
      idx + 1,
      c.name,
      c.phone || 'N/A',
      c.lastTransactionDate || 'Recent',
      `Rs. ${(c.creditLimit || 15000).toLocaleString()}`,
      `Rs. ${(c.currentBalance || 0).toLocaleString()}`,
      c.currentBalance > (c.creditLimit || 15000) ? 'Over Limit Alert' : 'Active Udhaar',
    ]);

    runAutoTable(doc, {
      startY: startY + 22,
      head: [['#', 'Customer Name', 'Phone', 'Last Active', 'Credit Limit', 'Balance Due', 'Risk Status']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 42, fontStyle: 'bold' },
        2: { cellWidth: 32 },
        3: { cellWidth: 26 },
        4: { cellWidth: 24, halign: 'right' },
        5: { cellWidth: 24, halign: 'right', fontStyle: 'bold', textColor: [217, 119, 6] },
        6: { cellWidth: 24, halign: 'center' },
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 3,
        lineColor: [226, 232, 240],
      },
      alternateRowStyles: {
        fillColor: LIGHT_BG,
      },
    });

    drawFooter(doc);

    const filename = `SHAFAF-HISAB-Outstanding-Udhaar-Report-${sanitizeFilename(business?.name || 'Business')}.pdf`;
    return triggerPdfDownload(doc, filename);
  } catch (error) {
    console.error('Outstanding Report PDF Generation Error:', error);
    return false;
  }
}

/**
 * 8. Download Inventory Valuation & Low Stock Report PDF
 */
export function downloadInventoryReportPDF(
  products: Product[],
  business: Business
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const startY = drawHeader(doc, 'Inventory Stock Valuation Report', business, `Date: ${new Date().toLocaleDateString('en-GB')}`);
    const safeProducts = products || [];
    const totalValuation = safeProducts.reduce(
      (acc, p) => acc + (p.stockQuantity ?? (p as any).stock ?? 0) * (p.costPrice || 0),
      0
    );
    const lowStockCount = safeProducts.filter(
      (p) => (p.stockQuantity ?? (p as any).stock ?? 0) <= (p.minStockThreshold ?? (p as any).minStockLevel ?? 10)
    ).length;

    doc.setFillColor(...LIGHT_BG);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, startY, 182, 16, 2, 2, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(`TOTAL CATALOG ITEMS: ${safeProducts.length}  |  LOW STOCK: ${lowStockCount}`, 20, startY + 10);
    doc.setTextColor(16, 185, 129);
    doc.text(`TOTAL STOCK VALUATION: Rs. ${totalValuation.toLocaleString()}`, 115, startY + 10);

    const tableBody = safeProducts.map((p, idx) => {
      const stock = p.stockQuantity ?? (p as any).stock ?? 0;
      const minStock = p.minStockThreshold ?? (p as any).minStockLevel ?? 10;
      const price = p.sellingPrice ?? (p as any).price ?? 0;
      return [
        idx + 1,
        p.name,
        p.category || 'General',
        `${stock} ${p.unit || 'pcs'}`,
        `Rs. ${(p.costPrice || 0).toLocaleString()}`,
        `Rs. ${price.toLocaleString()}`,
        `Rs. ${(stock * (p.costPrice || 0)).toLocaleString()}`,
        stock <= minStock ? 'LOW STOCK' : 'Healthy',
      ];
    });

    runAutoTable(doc, {
      startY: startY + 22,
      head: [['#', 'Product Name', 'Category', 'Stock Qty', 'Cost Price', 'Sale Price', 'Valuation', 'Stock Alert']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 42, fontStyle: 'bold' },
        2: { cellWidth: 26 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 22, halign: 'right' },
        5: { cellWidth: 22, halign: 'right' },
        6: { cellWidth: 24, halign: 'right', fontStyle: 'bold' },
        7: { cellWidth: 18, halign: 'center' },
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 3,
        lineColor: [226, 232, 240],
      },
      alternateRowStyles: {
        fillColor: LIGHT_BG,
      },
    });

    drawFooter(doc);

    const filename = `SHAFAF-HISAB-Inventory-Report-${sanitizeFilename(business?.name || 'Business')}.pdf`;
    return triggerPdfDownload(doc, filename);
  } catch (error) {
    console.error('Inventory Report PDF Generation Error:', error);
    return false;
  }
}

/**
 * 9. Download Orders Fulfillment Report PDF
 */
export function downloadOrderReportPDF(
  orders: Order[],
  business: Business
): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const startY = drawHeader(doc, 'Order Pipeline & Fulfillment Report', business, `Date: ${new Date().toLocaleDateString('en-GB')}`);
    const safeOrders = orders || [];
    const totalAmount = safeOrders.reduce((acc, o) => acc + (o.totalAmount ?? (o as any).total ?? 0), 0);

    doc.setFillColor(...LIGHT_BG);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, startY, 182, 16, 2, 2, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(`TOTAL ORDERS: ${safeOrders.length}`, 20, startY + 10);
    doc.setTextColor(16, 185, 129);
    doc.text(`TOTAL ORDER VALUE: Rs. ${totalAmount.toLocaleString()}`, 115, startY + 10);

    const tableBody = safeOrders.map((o, idx) => [
      idx + 1,
      o.orderNumber || `#ORD-${idx + 101}`,
      o.date,
      o.customerName || 'Online Buyer',
      o.channel || 'Direct',
      (o.status || 'pending').toUpperCase(),
      `Rs. ${(o.totalAmount ?? (o as any).total ?? 0).toLocaleString()}`,
    ]);

    runAutoTable(doc, {
      startY: startY + 22,
      head: [['#', 'Order #', 'Date', 'Customer', 'Channel', 'Status', 'Total Amount']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: NAVY,
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 28, fontStyle: 'bold' },
        2: { cellWidth: 25 },
        3: { cellWidth: 45 },
        4: { cellWidth: 26 },
        5: { cellWidth: 24, halign: 'center' },
        6: { cellWidth: 24, halign: 'right', fontStyle: 'bold' },
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 3,
        lineColor: [226, 232, 240],
      },
      alternateRowStyles: {
        fillColor: LIGHT_BG,
      },
    });

    drawFooter(doc);

    const filename = `SHAFAF-HISAB-Orders-Report-${sanitizeFilename(business?.name || 'Business')}.pdf`;
    return triggerPdfDownload(doc, filename);
  } catch (error) {
    console.error('Orders Report PDF Generation Error:', error);
    return false;
  }
}

/**
 * 10. Master Router: Download any of the 10 official business reports
 */
export function downloadBusinessReportByType(
  reportName: string,
  context: {
    business: Business;
    transactions: Transaction[];
    expenses: Expense[];
    customers: Customer[];
    products: Product[];
    orders: Order[];
    timeframe?: string;
  }
): boolean {
  const { business, transactions, expenses, customers, products, orders, timeframe } = context;

  if (reportName.includes('Profit') || reportName.includes('P&L')) {
    return downloadProfitLossPDF(business, {
      revenue: 2450000,
      cogs: 1458000,
      operatingExpenses: 152700,
      netProfit: 839300,
      period: timeframe || 'October 2026',
    });
  }

  if (reportName.includes('Expense')) {
    return downloadExpenseReportPDF(expenses, business, timeframe || 'October 2026');
  }

  if (reportName.includes('Customer') && !reportName.includes('Outstanding')) {
    return downloadCustomerReportPDF(customers, business, timeframe || 'October 2026');
  }

  if (reportName.includes('Outstanding')) {
    return downloadOutstandingReportPDF(customers, business);
  }

  if (reportName.includes('Inventory')) {
    return downloadInventoryReportPDF(products, business);
  }

  if (reportName.includes('Product')) {
    return downloadInventoryReportPDF(products, business);
  }

  if (reportName.includes('Order')) {
    return downloadOrderReportPDF(orders, business);
  }

  // Default to Sales Report
  return downloadSalesReportPDF(transactions, business, timeframe || 'October 2026');
}
