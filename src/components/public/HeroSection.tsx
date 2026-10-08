import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Package,
  Boxes,
  Receipt,
  FileText,
  DollarSign,
  ArrowUpRight,
  Smartphone,
  Store,
  Globe,
  Briefcase,
  Shirt,
  Sparkle,
  Cpu,
  Clock,
  Layers,
  ChevronRight,
  Search,
  X,
  Truck,
  Building2,
  Pill,
  UtensilsCrossed,
  Wrench,
  BookOpen,
  Armchair,
  Gem,
  Footprints,
  Cake,
  Car,
  Wheat,
  Sliders,
  Check,
  Compass,
} from 'lucide-react';
import { BusinessType } from '../../types';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

type HeroSector =
  | 'kiryana'
  | 'ecommerce'
  | 'garments'
  | 'freelancer'
  | 'cosmetics'
  | 'electronics'
  | 'wholesale'
  | 'services'
  | 'pharmacy'
  | 'food'
  | 'hardware'
  | 'other';

interface SectorPreviewData {
  title: string;
  badge: string;
  tagline: string;
  revenue: string;
  salesCount: string;
  profit: string;
  margin: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  items: { name: string; detail: string; amount: string; status: string; isCredit?: boolean }[];
  chartPoints: number[];
}

const SECTOR_DATA: Record<HeroSector, SectorPreviewData> = {
  kiryana: {
    title: 'Al-Madina Kiryana Store',
    badge: 'Kiryana & General Store',
    tagline: 'FMCG Counter Sales, Udhaar Ledger & Daily Cash Balance',
    revenue: 'Rs. 94,800',
    salesCount: '142 Sales',
    profit: 'Rs. 23,450',
    margin: '24.7% Margin',
    primaryMetricLabel: 'Customer Udhaar Due',
    primaryMetricValue: 'Rs. 11,750',
    secondaryMetricLabel: 'Low Stock Alerts',
    secondaryMetricValue: '3 Items (Coca Cola, Dalda)',
    items: [
      { name: 'Ali Ahmed (Customer #01)', detail: 'Flour 10kg, Dalda Oil, Tea', amount: '+Rs. 3,200', status: 'Udhaar Due', isCredit: true },
      { name: 'Counter Cash Sale', detail: 'Coca Cola 1.5L x 3, Sooper Biscuits', amount: 'Rs. 870', status: 'Cash Paid' },
      { name: 'Bilal Butt Karahi', detail: 'Commercial Ghee 16kg Tin', amount: '+Rs. 7,450', status: 'Udhaar Due', isCredit: true },
    ],
    chartPoints: [42, 58, 65, 82, 75, 89, 94],
  },
  ecommerce: {
    title: 'Ali Online Apparel & Trends',
    badge: 'E-Commerce Store',
    tagline: 'Direct-to-Consumer Orders, COD Shipping & Meta Ad ROAS',
    revenue: 'Rs. 385,000',
    salesCount: '168 Orders',
    profit: 'Rs. 112,400',
    margin: '29.2% Net Profit',
    primaryMetricLabel: 'COD Courier In-Transit',
    primaryMetricValue: '42 Parcels (Trax)',
    secondaryMetricLabel: 'Meta Ad ROAS',
    secondaryMetricValue: '4.2x (Rs. 28k spend)',
    items: [
      { name: 'ORD-9481 · Zainab Qasim', detail: 'Heavyweight Graphic Tee x2 (Islamabad)', amount: 'Rs. 4,750', status: 'Shipped (Trax)' },
      { name: 'ORD-9482 · Khurram Shehzad', detail: 'Urban Cargo Joggers (Lahore Cantt)', amount: 'Rs. 2,349', status: 'Processing' },
      { name: 'ORD-9483 · Hamza Nisar', detail: 'Chelsea Suede Boots (Karachi)', amount: 'Rs. 5,699', status: 'Delivered (COD)' },
    ],
    chartPoints: [180, 220, 290, 310, 340, 360, 385],
  },
  garments: {
    title: 'Gulberg Pret & Fabrics',
    badge: 'Garments & Fashion',
    tagline: 'Size & Color Matrix, Seasonal Collections & Walk-in Sales',
    revenue: 'Rs. 215,000',
    salesCount: '54 Outfits',
    profit: 'Rs. 78,500',
    margin: '36.5% Margin',
    primaryMetricLabel: 'Sizes In High Demand',
    primaryMetricValue: 'Medium & Large (84%)',
    secondaryMetricLabel: 'Seasonal Stock Left',
    secondaryMetricValue: '124 Stitched Pret',
    items: [
      { name: 'Embroidered Kurta Pret', detail: 'Size: L · Color: Midnight Navy', amount: 'Rs. 6,850', status: 'Card Paid' },
      { name: 'Lawn 3-Piece Stitched', detail: 'Size: M · Color: Emerald Mint', amount: 'Rs. 8,500', status: 'Cash Paid' },
      { name: 'Semi-Formal Mens Waistcoat', detail: 'Size: 40 · Color: Charcoal Black', amount: 'Rs. 5,200', status: 'Delivered' },
    ],
    chartPoints: [110, 135, 140, 175, 160, 195, 215],
  },
  wholesale: {
    title: 'Rawalpindi Bulk Distributors',
    badge: 'Wholesale & B2B Distribution',
    tagline: 'Bulk Cartons, Loading Slips, Transport Bilty & Raast Settlement',
    revenue: 'Rs. 1,420,000',
    salesCount: '24 Bilty Orders',
    profit: 'Rs. 165,000',
    margin: '11.6% B2B Margin',
    primaryMetricLabel: 'Ledger Receivables Due',
    primaryMetricValue: 'Rs. 340,000 (4 Distributors)',
    secondaryMetricLabel: 'Warehouse Pallets',
    secondaryMetricValue: '180 Bags In-Transit',
    items: [
      { name: 'Madina Traders Gujranwala', detail: 'Sugar 50kg Bags x 60 · Bilty #GT-940', amount: '+Rs. 310,000', status: 'Ledger Due', isCredit: true },
      { name: 'Kashmir Cash & Carry', detail: 'Dalda 16L Ghee Tins x 45', amount: 'Rs. 248,000', status: 'Raast Paid' },
      { name: 'Fazal Autos & General', detail: 'Soap & Detergent Master Cartons x 80', amount: '+Rs. 195,000', status: 'Partially Paid', isCredit: true },
    ],
    chartPoints: [600, 820, 950, 1100, 1250, 1380, 1420],
  },
  services: {
    title: 'Premier Digital Agency & Services',
    badge: 'Agency & Services',
    tagline: 'Client Milestones, Retainer Invoices & Operational Expenses',
    revenue: 'Rs. 420,000',
    salesCount: '6 Projects',
    profit: 'Rs. 315,000',
    margin: '75.0% Net Margin',
    primaryMetricLabel: 'Active Retainer Revenue',
    primaryMetricValue: 'Rs. 280,000 Monthly',
    secondaryMetricLabel: 'Pending Milestone Clearance',
    secondaryMetricValue: 'Rs. 140,000 Due',
    items: [
      { name: 'Apex Tech UK', detail: 'Monthly SEO & Marketing Retainer', amount: 'Rs. 280,000', status: 'Wire Transfer' },
      { name: 'Skyline Real Estate', detail: 'Portal Development Milestone #3', amount: '+Rs. 85,000', status: 'Invoice Due', isCredit: true },
      { name: 'Al-Haram Travels', detail: 'Social Campaign Branding Kit', amount: '+Rs. 55,000', status: 'Invoice Due', isCredit: true },
    ],
    chartPoints: [150, 200, 260, 310, 350, 390, 420],
  },
  pharmacy: {
    title: 'CarePlus Medical & Pharmacy',
    badge: 'Pharmacy & Healthcare',
    tagline: 'Medicine Batch Numbers, Expiry Matrix & Fast Prescription Billing',
    revenue: 'Rs. 245,000',
    salesCount: '320 Slips',
    profit: 'Rs. 44,500',
    margin: '18.1% Margin',
    primaryMetricLabel: 'Near-Expiry Items Checked',
    primaryMetricValue: '100% Inspected & Safe',
    secondaryMetricLabel: 'Distributor Khata Cleared',
    secondaryMetricValue: 'Rs. 58,000 Settled',
    items: [
      { name: 'Panadol Extra + Augmentin 625mg', detail: 'Prescription #RX-8841 · Batch #GSK-402', amount: 'Rs. 1,480', status: 'Cash Paid' },
      { name: 'Glucometer Strips Pack x 2', detail: 'Expiry: 2027 · Accu-Chek Instant', amount: 'Rs. 3,850', status: 'Card Paid' },
      { name: 'Nebulizer Kit + Saline', detail: 'Counter Walk-in Patient', amount: 'Rs. 2,100', status: 'Cash Paid' },
    ],
    chartPoints: [90, 115, 140, 175, 195, 220, 245],
  },
  food: {
    title: 'Al-Bait Shawarma & Cafe',
    badge: 'Food & Restaurant',
    tagline: 'Dine-in, Takeaway Slips, Daily Meat Supply & Kitchen Inventory',
    revenue: 'Rs. 182,000',
    salesCount: '412 Orders',
    profit: 'Rs. 52,800',
    margin: '29.0% Margin',
    primaryMetricLabel: 'Average Kitchen Ticket',
    primaryMetricValue: 'Rs. 920 / Slip',
    secondaryMetricLabel: 'Daily Kitchen Stock',
    secondaryMetricValue: '100% Reconciled',
    items: [
      { name: 'Jumbo Platter x 3 + Drinks', detail: 'Dine-in Table #04 · Receipt #T-192', amount: 'Rs. 3,450', status: 'Cash Paid' },
      { name: 'Shawarma Meal Family Combo', detail: 'Takeaway Counter Slip', amount: 'Rs. 2,150', status: 'Raast Paid' },
      { name: 'Office Lunch Bulk Order', detail: 'Shawarma Rolls x 15 · Commercial Delivery', amount: 'Rs. 7,200', status: 'Card Paid' },
    ],
    chartPoints: [60, 85, 105, 130, 150, 168, 182],
  },
  hardware: {
    title: 'Punjab Hardware & Tools',
    badge: 'Hardware & Tools',
    tagline: 'Sanitary Fixtures, Power Tools, Contractor Khata & Credit Ledger',
    revenue: 'Rs. 410,000',
    salesCount: '86 Orders',
    profit: 'Rs. 94,000',
    margin: '22.9% Margin',
    primaryMetricLabel: 'Contractor Credit Due',
    primaryMetricValue: 'Rs. 128,000 (3 Builders)',
    secondaryMetricLabel: 'Heavy Tools Stock',
    secondaryMetricValue: '48 In Stock',
    items: [
      { name: 'Malik Construction DHA Phase 6', detail: 'PPRC Pipes 25mm x 40 + Brass Valves', amount: '+Rs. 64,500', status: 'Contractor Khata', isCredit: true },
      { name: 'Rotary Hammer Drill 800W', detail: 'Bosch Professional with Warranty', amount: 'Rs. 28,500', status: 'Cash Paid' },
      { name: 'Cement & Tile Adhesive Bags x 30', detail: 'Site Delivery Chalan #CH-409', amount: '+Rs. 33,000', status: 'Contractor Khata', isCredit: true },
    ],
    chartPoints: [140, 190, 240, 290, 340, 380, 410],
  },
  freelancer: {
    title: 'Ali Digital Design & Studio',
    badge: 'Freelancer & Digital',
    tagline: 'Milestone Invoices, Client Retainers & Tax Deductions',
    revenue: 'Rs. 383,000',
    salesCount: '4 Projects',
    profit: 'Rs. 320,000',
    margin: '83.5% Net Margin',
    primaryMetricLabel: 'Pending Client Invoices',
    primaryMetricValue: 'Rs. 95,000 (2 Clients)',
    secondaryMetricLabel: 'Monthly Retainer Active',
    secondaryMetricValue: 'Rs. 238,000 (Apex UK)',
    items: [
      { name: 'Apex Global Tech UK', detail: 'Monthly Product Design Retainer', amount: 'Rs. 238,000', status: 'Paid (Wise)' },
      { name: 'ABC Clothing Brand', detail: 'E-Commerce UI/UX Milestone #2', amount: 'Rs. 30,000', status: 'Pending Invoice', isCredit: true },
      { name: 'CloudScale Logistics', detail: 'Fleet Manager Console Mockups', amount: 'Rs. 65,000', status: 'Pending Invoice', isCredit: true },
    ],
    chartPoints: [120, 120, 240, 240, 240, 350, 383],
  },
  cosmetics: {
    title: 'Glow Luxury Cosmetics',
    badge: 'Cosmetics & Beauty',
    tagline: 'Shade Variations, Batch Expiry Dates & Supplier Khata',
    revenue: 'Rs. 168,000',
    salesCount: '78 Items',
    profit: 'Rs. 59,200',
    margin: '35.2% Margin',
    primaryMetricLabel: 'Expiry Watch (90 Days)',
    primaryMetricValue: '14 Skincare Units Safe',
    secondaryMetricLabel: 'Supplier Payables',
    secondaryMetricValue: 'Rs. 24,000 Due',
    items: [
      { name: 'Hydrating Peptide Serum 30ml', detail: 'Batch #EXP-2027 · Korea Import', amount: 'Rs. 4,800', status: 'Card Paid' },
      { name: 'Velvet Matte Lipstick (Ruby #04)', detail: 'Shade: Deep Crimson', amount: 'Rs. 2,250', status: 'Cash Paid' },
      { name: 'Ceramide Barrier Cream 50ml', detail: 'Batch #EXP-2028 · 12 Units Left', amount: 'Rs. 3,900', status: 'Cash Paid' },
    ],
    chartPoints: [85, 95, 115, 130, 142, 155, 168],
  },
  electronics: {
    title: 'Apex Mobile & Electronics',
    badge: 'Mobile & Electronics',
    tagline: 'IMEI / Serial Numbers, PTA Status & Official Warranty',
    revenue: 'Rs. 540,000',
    salesCount: '12 Devices',
    profit: 'Rs. 68,000',
    margin: '12.6% Net Margin',
    primaryMetricLabel: 'IMEI Warranty Active',
    primaryMetricValue: '12 Months Official',
    secondaryMetricLabel: 'In-Stock PTA Approved',
    secondaryMetricValue: '38 Smartphones',
    items: [
      { name: 'Samsung Galaxy S24 Ultra 256GB', detail: 'IMEI: 358941092837192 · PTA Approved', amount: 'Rs. 345,000', status: 'Bank Transfer' },
      { name: 'Wireless ANC Earbuds Pro', detail: 'Serial: SN-948102 · 1-Yr Warranty', amount: 'Rs. 18,500', status: 'Cash Paid' },
      { name: 'Fast GaN Charger 65W + Cable', detail: 'Dual USB-C · Box Pack', amount: 'Rs. 6,500', status: 'Cash Paid' },
    ],
    chartPoints: [280, 310, 360, 420, 470, 510, 540],
  },
  other: {
    title: 'Custom Enterprise Workspace',
    badge: 'Custom Business Architecture',
    tagline: 'Tailored Modules, Unified Customers & Audited Financial Ledger',
    revenue: 'Rs. 320,000',
    salesCount: '48 Transactions',
    profit: 'Rs. 89,000',
    margin: '27.8% Net Margin',
    primaryMetricLabel: 'Active Custom Ledger',
    primaryMetricValue: '100% Reconciled',
    secondaryMetricLabel: 'Dedicated Data Partition',
    secondaryMetricValue: 'Zero Cross Leakage',
    items: [
      { name: 'Special Client Job Order #104', detail: 'Custom Service Scope & Materials', amount: 'Rs. 45,000', status: 'Advance Received' },
      { name: 'Commercial Vendor Invoice #89', detail: 'Raw Supplies & Operating Overhead', amount: '+Rs. 18,500', status: 'Pending Payment', isCredit: true },
      { name: 'Direct Counter Settlement', detail: 'Client Direct Settlement via Raast', amount: 'Rs. 22,000', status: 'Raast Paid' },
    ],
    chartPoints: [100, 140, 190, 230, 260, 290, 320],
  },
};

export interface ExplorerBusinessCategory {
  id: string;
  name: string;
  group: 'Popular' | 'Retail' | 'Food' | 'Services' | 'Wholesale' | 'Digital';
  icon: React.FC<{ className?: string }>;
  sectorId: HeroSector;
  tagline: string;
}

export const HERO_EXPLORER_CATEGORIES: ExplorerBusinessCategory[] = [
  { id: 'kiryana', name: 'Grocery / Kiryana', group: 'Popular', icon: Store, sectorId: 'kiryana', tagline: 'FMCG counter sales, customer udhaar khata & cash drawer' },
  { id: 'clothing', name: 'Clothing / Garments', group: 'Popular', icon: Shirt, sectorId: 'garments', tagline: 'Variant sizes, colors, seasonal fabric & boutique counter' },
  { id: 'ecommerce', name: 'E-commerce / Online Store', group: 'Popular', icon: Globe, sectorId: 'ecommerce', tagline: 'Trax / TCS COD parcels, Shopify orders & ad profit' },
  { id: 'agency', name: 'Agency / Services', group: 'Popular', icon: Building2, sectorId: 'services', tagline: 'Client milestones, retainer invoices & operational expenses' },
  { id: 'wholesale', name: 'Wholesale / Distribution', group: 'Popular', icon: Truck, sectorId: 'wholesale', tagline: 'Bulk supply orders, loading chalan & ledger reconciliation' },
  { id: 'pharmacy', name: 'Pharmacy', group: 'Retail', icon: Pill, sectorId: 'pharmacy', tagline: 'Medicine batch numbers, expiry dates & prescription billing' },
  { id: 'food', name: 'Food / Restaurant', group: 'Food', icon: UtensilsCrossed, sectorId: 'food', tagline: 'Dine-in, takeaway slips & fast daily kitchen supplies' },
  { id: 'hardware', name: 'Hardware / Tools', group: 'Retail', icon: Wrench, sectorId: 'hardware', tagline: 'Sanitary fittings, tools, construction hardware & credit khata' },
  { id: 'mobile', name: 'Mobile & Electronics', group: 'Retail', icon: Smartphone, sectorId: 'electronics', tagline: 'IMEI / Serial numbers, PTA status & warranty tracking' },
  { id: 'cosmetics', name: 'Cosmetics / Beauty', group: 'Retail', icon: Sparkle, sectorId: 'cosmetics', tagline: 'Beauty shades, cosmetic batches & supplier invoices' },
  { id: 'freelancer', name: 'Freelancer', group: 'Digital', icon: Briefcase, sectorId: 'freelancer', tagline: 'Remote clients, USD/PKR invoices & milestone tracking' },
  { id: 'household', name: 'Home & Household', group: 'Retail', icon: Armchair, sectorId: 'kiryana', tagline: 'Kitchenware, home appliances & walk-in counter sales' },
  { id: 'stationery', name: 'Stationery / Books', group: 'Retail', icon: BookOpen, sectorId: 'kiryana', tagline: 'School supplies, bulk paper books & office stationery' },
  { id: 'furniture', name: 'Furniture', group: 'Retail', icon: Armchair, sectorId: 'services', tagline: 'Custom woodwork, showroom pieces & client order deposits' },
  { id: 'jewelry', name: 'Jewelry / Accessories', group: 'Retail', icon: Gem, sectorId: 'cosmetics', tagline: 'Precious items, weight valuation & customer installments' },
  { id: 'shoes', name: 'Shoes / Footwear', group: 'Retail', icon: Footprints, sectorId: 'garments', tagline: 'Shoe sizing matrix, pairs stock & retail counter' },
  { id: 'bakery', name: 'Bakery / Sweets', group: 'Food', icon: Cake, sectorId: 'food', tagline: 'Fresh confectionary, mithai boxes & counter billing' },
  { id: 'auto', name: 'Auto Parts / Workshop', group: 'Services', icon: Car, sectorId: 'services', tagline: 'Vehicle repair job cards, spare parts & labor charges' },
  { id: 'agriculture', name: 'Agriculture / Farm', group: 'Wholesale', icon: Wheat, sectorId: 'wholesale', tagline: 'Seeds, fertilizer sales, crop produce & mandi accounts' },
  { id: 'general', name: 'General Retail', group: 'Retail', icon: Store, sectorId: 'kiryana', tagline: 'Multi-category retail counter & customer credit register' },
  { id: 'other', name: 'Other / Custom Business', group: 'Services', icon: Sliders, sectorId: 'other', tagline: 'Tailored business modules for unique commercial workflows' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onExploreDemo }) => {
  const [selectedSector, setSelectedSector] = useState<HeroSector>('kiryana');
  const [animatedRevenue, setAnimatedRevenue] = useState<string>('Rs. 94,800');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isExplorerModalOpen, setIsExplorerModalOpen] = useState<boolean>(false);
  const [explorerSearch, setExplorerSearch] = useState<string>('');
  const [explorerFilter, setExplorerFilter] = useState<string>('All');
  const [customBusinessName, setCustomBusinessName] = useState<string>('');

  // Animated Rotating Typewriter Text
  const rotatingWords = [
    'Retail & Kiryana Stores',
    'Wholesale & B2B Distributors',
    'Garment Outlets & Boutiques',
    'E-Commerce & Online Stores',
    'Agencies, Freelancers & Services',
    'Pharmacies & Medical Stores',
    'Restaurants & Food Cafes',
    'Hardware & Construction Stores',
    'Every Modern Growing Business',
  ];
  const [wordIdx, setWordIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = rotatingWords[wordIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 28);
      } else {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % rotatingWords.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIdx]);

  const activeData = SECTOR_DATA[selectedSector];

  const handleSelectSector = (sector: HeroSector) => {
    if (sector === selectedSector) return;
    setIsTransitioning(true);
    setSelectedSector(sector);
    setTimeout(() => {
      setAnimatedRevenue(SECTOR_DATA[sector].revenue);
      setIsTransitioning(false);
    }, 150);
  };

  const sectorButtons: { id: HeroSector; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'kiryana', label: 'Retail & Kiryana', icon: Store },
    { id: 'ecommerce', label: 'E-commerce', icon: Globe },
    { id: 'garments', label: 'Garments', icon: Shirt },
    { id: 'wholesale', label: 'Wholesale B2B', icon: Truck },
    { id: 'services', label: 'Agency & Services', icon: Building2 },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
    { id: 'food', label: 'Food & Cafe', icon: UtensilsCrossed },
    { id: 'hardware', label: 'Hardware & Tools', icon: Wrench },
    { id: 'electronics', label: 'Mobile & Electronics', icon: Smartphone },
    { id: 'cosmetics', label: 'Cosmetics', icon: Sparkle },
  ];

  const filteredExplorerCategories = HERO_EXPLORER_CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(explorerSearch.toLowerCase()) ||
      cat.tagline.toLowerCase().includes(explorerSearch.toLowerCase());
    const matchesGroup =
      explorerFilter === 'All' ||
      cat.group === explorerFilter ||
      (explorerFilter === 'Popular' && cat.group === 'Popular');
    return matchesSearch && matchesGroup;
  });

  const handleApplyCustomBusiness = () => {
    if (customBusinessName.trim()) {
      SECTOR_DATA.other.title = customBusinessName.trim();
      SECTOR_DATA.other.tagline = `Dedicated custom workspace for ${customBusinessName.trim()} with zero data leakage`;
    }
    handleSelectSector('other');
    setIsExplorerModalOpen(false);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#071524] via-[#0B2138] to-[#071524] text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Subtle Tech Grid & Atmospheric Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F766E15_1px,transparent_1px),linear-gradient(to_bottom,#0F766E15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-tr from-teal-500/20 via-emerald-500/15 to-transparent blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold tracking-wide uppercase shadow-inner backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>Manage Better. Grow Smarter.</span>
          </div>

          {/* Core Message: YOUR BUSINESS. ONE CLEAR SYSTEM. with Animated Shimmer */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.08] mt-3">
            YOUR BUSINESS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-cyan-300 animate-text-shimmer">
              ONE CLEAR SYSTEM.
            </span>
          </h1>

          {/* Animated Interactive Rotating Sector Indicator */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-slate-300 font-medium">
            <span className="text-slate-400">Engineered for</span>
            <div className="px-3 py-1 rounded-xl bg-teal-950/60 border border-teal-500/40 text-teal-300 font-bold min-h-[34px] flex items-center shadow-inner backdrop-blur-sm">
              <span>{displayedText}</span>
              <span className="w-0.5 h-4 bg-teal-400 ml-1 inline-block animate-cursor-blink" />
            </div>
          </div>

          {/* Supporting text */}
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl font-normal leading-relaxed">
            Manage sales, customers, inventory, expenses, payments and reports — all in one place.
          </p>

          {/* Buttons: GET STARTED, EXPLORE DEMO */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-extrabold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl shadow-lg shadow-teal-950/60 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 tracking-wide uppercase group"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm tracking-wide uppercase hover:border-teal-400/50"
            >
              <span>EXPLORE DEMO</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Data Isolation Guarantee
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Multi-Business on Single Phone
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Real Downloadable PDF Reports
            </span>
          </div>

          {/* Live System Activity Ticker Marquee */}
          <div className="mt-8 w-full max-w-4xl overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md py-2.5 px-3.5 shadow-xl shadow-black/50">
            <div className="flex items-center gap-3">
              <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>LIVE LEDGER AUDIT</span>
              </div>
              
              <div className="overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <div className="animate-marquee-scroll flex items-center gap-8 text-xs text-slate-300 whitespace-nowrap">
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">●</span> <strong className="text-white">Al-Rehman Kiryana:</strong> Recorded Rs. 14,850 Cash Sale
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-teal-400 font-bold">●</span> <strong className="text-white">AR Online Store:</strong> Dispatched 42 Trax COD Parcels
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-cyan-400 font-bold">●</span> <strong className="text-white">Rawalpindi Wholesale:</strong> Reconciled Rs. 185,000 via Raast
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">●</span> <strong className="text-white">Gulberg Garments:</strong> Stock auto-updated for 150 SKUs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">●</span> <strong className="text-white">Digital Agency:</strong> Issued Client Statement PDF #SH-102
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-purple-400 font-bold">●</span> <strong className="text-white">System Security:</strong> 0% cross-account leakage verified
                  </span>
                  {/* Duplicate items for seamless continuous ticker */}
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">●</span> <strong className="text-white">Al-Rehman Kiryana:</strong> Recorded Rs. 14,850 Cash Sale
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-teal-400 font-bold">●</span> <strong className="text-white">AR Online Store:</strong> Dispatched 42 Trax COD Parcels
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-cyan-400 font-bold">●</span> <strong className="text-white">Rawalpindi Wholesale:</strong> Reconciled Rs. 185,000 via Raast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ANIMATED BUSINESS ADAPTATION SESSION */}
        <div className="mt-12 mb-8 max-w-5xl mx-auto px-2">
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/95 via-[#0B2138]/90 to-slate-950/95 border border-teal-500/35 backdrop-blur-xl shadow-2xl shadow-teal-950/60 relative overflow-hidden text-center">
            {/* Ambient Animated Corner Glows */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            {/* Top Shimmer Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-80" />

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-black uppercase tracking-widest mb-3 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Tailored For Any Business · Zero Data Leakage</span>
            </div>

            {/* Animated Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white max-w-3xl mx-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-100 to-cyan-300 animate-text-shimmer">
                Built around the way you work.
              </span>
            </h2>

            {/* Supporting Copy */}
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Whether you sell products, provide services, run an online store or manage something completely different — Shafaf Hisab adapts to your business.
            </p>

            {/* Animated Quick Category Pill Deck */}
            <div className="mt-6 flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 max-w-4xl mx-auto">
              {sectorButtons.map((sec) => {
                const Icon = sec.icon;
                const isActive = selectedSector === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSelectSector(sec.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0F766E] to-[#0D9488] text-white shadow-lg shadow-teal-900/80 ring-2 ring-teal-400/60 scale-105'
                        : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 hover:text-white hover:border-teal-500/40 hover:-translate-y-0.5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-teal-200' : 'text-slate-400'}`} />
                    <span>{sec.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explore Business Types Button */}
            <div className="mt-6 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsExplorerModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/50 text-teal-200 hover:text-white text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-lg shadow-teal-950/40 hover:scale-105 group"
              >
                <Compass className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" />
                <span>Explore business types →</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-400/20 text-emerald-300 text-[11px] font-bold">
                  20+ Types + Other
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* LARGE ANIMATED SHAFAF HISAB DASHBOARD PREVIEW WITH FLOATING LIVE BADGES */}
        <div className="mt-6 relative max-w-6xl mx-auto">
          {/* Floating Live Badge Top-Left */}
          <div className="hidden lg:flex absolute -top-5 -left-5 z-20 items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-teal-500/40 shadow-2xl shadow-teal-950/80 backdrop-blur-md animate-float-slow">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Sale Stream</span>
              </div>
              <div className="text-xs font-mono font-bold text-white">+Rs. 18,500 <span className="text-[10px] text-emerald-400 font-sans font-semibold">(Instant Raast)</span></div>
            </div>
          </div>

          {/* Floating Live Badge Top-Right */}
          <div className="hidden lg:flex absolute -top-5 -right-5 z-20 items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 shadow-2xl shadow-emerald-950/80 backdrop-blur-md animate-float-reverse">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Data Isolation</div>
              <div className="text-xs font-bold text-emerald-300">100% Partition Shield Active</div>
            </div>
          </div>

          {/* Floating Live Badge Bottom-Right */}
          <div className="hidden lg:flex absolute -bottom-5 -right-4 z-20 items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 backdrop-blur-md animate-float-slow">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Audited True Margin</div>
              <div className="text-xs font-mono font-bold text-cyan-300">+34.8% Net Calculated</div>
            </div>
          </div>

          <div className="rounded-3xl p-1 bg-gradient-to-b from-teal-500/40 via-white/10 to-transparent shadow-2xl shadow-black/80">
            <div className="rounded-[22px] bg-[#0A1A2B] border border-slate-700/80 overflow-hidden shadow-2xl">
            {/* Top Browser / App Window Chrome */}
            <div className="px-4 sm:px-6 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
              </div>

              {/* URL Address Bar */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="text-emerald-400 font-bold">https://</span>
                <span>app.shafafhisab.pk/workspace/</span>
                <span className="text-teal-300 font-semibold">{selectedSector}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </span>
                <span className="text-xs font-semibold text-slate-300 hidden md:inline">
                  SHAFAF HISAB v2.6
                </span>
              </div>
            </div>

            {/* Live Adaptability Notification Strip */}
            <div className="px-4 sm:px-6 py-2 bg-gradient-to-r from-teal-950/80 via-slate-900 to-teal-950/80 border-b border-teal-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-slate-400">Live Architecture Demo:</span>
                <strong className="text-white font-extrabold">{activeData.title}</strong>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 text-[10px] font-black uppercase">
                  {activeData.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsExplorerModalOpen(true)}
                className="text-xs font-bold text-teal-300 hover:text-teal-200 underline underline-offset-4 flex items-center gap-1 cursor-pointer"
              >
                <span>Switch to another business</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Dashboard Content Container */}
            <div className={`p-4 sm:p-6 lg:p-8 transition-opacity duration-200 ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
              {/* Business Name Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {activeData.badge}
                    </span>
                    <span className="text-xs text-slate-400">Isolated Workspace ID: #{selectedSector}-01</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activeData.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeData.tagline}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onExploreDemo}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Open Live Console</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 5 Core Top KPI Cards: Revenue, Sales, Customers, Profit, Margin */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 my-6">
                {/* Revenue */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Today's Revenue</span>
                    <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-1 font-mono">
                    {activeData.revenue}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                    +18.4% vs yesterday
                  </span>
                </div>

                {/* Sales / Orders Count */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Total Sales / Orders</span>
                    <Package className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-1 font-mono">
                    {activeData.salesCount}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    100% Reconciled
                  </span>
                </div>

                {/* Net Profit */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>True Net Profit</span>
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-300 mt-1 font-mono">
                    {activeData.profit}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                    {activeData.margin}
                  </span>
                </div>

                {/* Sector Specific Metric 1 */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-teal-900/40 hover:border-teal-700/60 transition-all">
                  <div className="text-xs text-teal-300 font-bold truncate">
                    {activeData.primaryMetricLabel}
                  </div>
                  <div className="text-base sm:text-lg font-black text-white mt-1 font-mono truncate">
                    {activeData.primaryMetricValue}
                  </div>
                  <span className="text-[10px] text-amber-400 font-semibold block mt-0.5">
                    Sector Priority
                  </span>
                </div>

                {/* Sector Specific Metric 2 */}
                <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="text-xs text-slate-400 truncate">
                    {activeData.secondaryMetricLabel}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-slate-200 mt-1 truncate">
                    {activeData.secondaryMetricValue}
                  </div>
                  <span className="text-[10px] text-teal-400 block mt-0.5">
                    Automated Alert
                  </span>
                </div>
              </div>

              {/* Chart & Live Activity Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Visual Chart Card */}
                <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-bold text-slate-300">
                        Weekly Growth & Margin Trend
                      </span>
                      <span className="text-[11px] text-slate-500 block">Mon — Sun Real-Time Calculation</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                      <TrendingUp className="w-4 h-4" />
                      <span>Consistent Growth</span>
                    </div>
                  </div>

                  {/* SVG Chart Preview */}
                  <div className="h-36 w-full flex items-end gap-2 pt-4 px-2">
                    {activeData.chartPoints.map((val, idx) => {
                      const maxVal = Math.max(...activeData.chartPoints);
                      const heightPercent = Math.round((val / maxVal) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                          <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {val}
                          </div>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full rounded-t-lg bg-gradient-to-t from-teal-600/70 to-emerald-400 transition-all duration-300 group-hover:brightness-125"
                          />
                          <span className="text-[10px] text-slate-500 font-mono">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Zero manual recalculation required</span>
                    <span className="text-emerald-400 font-mono">100% Audited</span>
                  </div>
                </div>

                {/* Recent Transaction Activity */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-300">
                        Recent Sector Transactions
                      </span>
                      <span className="text-[10px] text-teal-400 font-mono font-bold">Live Stream</span>
                    </div>

                    <div className="space-y-2.5">
                      {activeData.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-2"
                        >
                          <div className="truncate">
                            <span className="text-xs font-bold text-white block truncate">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {item.detail}
                            </span>
                          </div>

                          <div className="text-right shrink-0">
                            <span className={`text-xs font-mono font-bold block ${item.isCredit ? 'text-amber-400' : 'text-emerald-400'}`}>
                              {item.amount}
                            </span>
                            <span
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded inline-block mt-0.5 ${
                                item.isCredit
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                      Isolated ledger storage
                    </span>
                    <button
                      onClick={onExploreDemo}
                      className="text-xs text-teal-300 hover:text-white font-bold cursor-pointer transition-colors"
                    >
                      View All →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* EXPLORE BUSINESS TYPES INTERACTIVE MODAL */}
      {isExplorerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B1F33] text-white border border-teal-500/40 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl shadow-teal-950/80 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/70">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Sector Explorer</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Built around the way you work.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Whether you sell products, provide services, run an online store or manage something completely different — Shafaf Hisab adapts to your business.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsExplorerModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/60 space-y-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={explorerSearch}
                  onChange={(e) => setExplorerSearch(e.target.value)}
                  placeholder="🔍 Type to search (e.g. Pharmacy, Bakery, Agriculture, Auto, Garments, Kiryana...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                />
              </div>

              {/* Group Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <span className="text-slate-400 text-[11px] font-bold uppercase mr-1">Categories:</span>
                {['All', 'Popular', 'Retail', 'Food', 'Services', 'Wholesale', 'Digital'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setExplorerFilter(cat)}
                    className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                      explorerFilter === cat
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Scrollable Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 max-h-[460px] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredExplorerCategories.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = selectedSector === item.sectorId;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        handleSelectSector(item.sectorId);
                        setIsExplorerModalOpen(false);
                      }}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between group ${
                        isCurrent
                          ? 'bg-teal-950/70 border-teal-400 ring-1 ring-teal-400 shadow-md'
                          : 'bg-slate-900/80 border-slate-800 hover:border-teal-500/60 hover:bg-slate-800/80 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isCurrent ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 group-hover:bg-teal-900/80 text-teal-300'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block group-hover:text-teal-300 transition-colors">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-teal-400 font-semibold">
                              {item.group}
                            </span>
                          </div>
                        </div>

                        {isCurrent && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Active
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                        {item.tagline}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-teal-300 font-bold">
                        <span>Preview Architecture</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Can't find your business? + Add your own business type (Custom) */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-900 border border-teal-500/40 shadow-inner">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-extrabold text-white">
                      Can't find your business? Add your own business type
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Shafaf Hisab provides full generic business modules for custom business types with independent customer ledgers, inventory, cash flow, and reports.
                    </p>

                    <div className="mt-3 flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={customBusinessName}
                        onChange={(e) => setCustomBusinessName(e.target.value)}
                        placeholder="Business type (e.g. Printing & Stationery, Solar Tech, Marble Mart...)"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCustomBusiness}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                      >
                        Preview Custom Workspace
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Each business gets 100% separate customer ledgers, stock, and reports</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsExplorerModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsExplorerModalOpen(false);
                    onGetStarted();
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white text-xs font-bold cursor-pointer shadow-md shadow-teal-950/60"
                >
                  Start With This Business →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
