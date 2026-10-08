import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { FeaturesSection } from './components/public/FeaturesSection';
import { LiveBusinessShowcase } from './components/public/LiveBusinessShowcase';
import { BusinessTypesSection } from './components/public/BusinessTypesSection';
import { ProblemSection } from './components/public/ProblemSection';
import { HowItWorksSection } from './components/public/HowItWorksSection';
import { AnalyticsSection } from './components/public/AnalyticsSection';
import { CustomerCreditKhataDemo } from './components/public/CustomerCreditKhataDemo';
import { EcommerceSection } from './components/public/EcommerceSection';
import { FreelancerSection } from './components/public/FreelancerSection';
import { MobileSecurityCTASection } from './components/public/MobileSecurityCTASection';
import { SmartInsightsSection } from './components/public/SmartInsightsSection';
import { ReportsShowcaseSection } from './components/public/ReportsShowcaseSection';
import { PricingSection } from './components/public/PricingSection';
import { Footer } from './components/public/Footer';
import { LoginPage } from './components/auth/LoginPage';
import { SignupOnboarding } from './components/auth/SignupOnboarding';
import { BusinessSelectorPortal } from './components/auth/BusinessSelectorPortal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DataIsolationTestModal } from './components/dashboard/modals/DataIsolationTestModal';

const MainAppContent: React.FC = () => {
  const {
    viewMode,
    switchBusinessByType,
    isIsolationTestModalOpen,
    setIsIsolationTestModalOpen,
  } = useApp();
  const [authView, setAuthView] = useState<'login' | 'signup' | null>(null);

  const handleLaunchApp = () => {
    switchBusinessByType('kiryana');
  };

  // If in Multi-Business Selection Screen ("Good morning! Which business are you working on?")
  if (viewMode === 'select_business') {
    return (
      <BusinessSelectorPortal
        onAddAnotherBusiness={() => setAuthView('signup')}
      />
    );
  }

  // If in Logged-in Application View
  if (viewMode === 'app') {
    return <DashboardLayout />;
  }

  // If on Auth View (Login or Signup/Onboarding)
  if (authView === 'login') {
    return (
      <LoginPage
        onBackToHome={() => setAuthView(null)}
        onGoToSignup={() => setAuthView('signup')}
      />
    );
  }

  if (authView === 'signup') {
    return (
      <SignupOnboarding
        onBackToHome={() => setAuthView(null)}
        onGoToLogin={() => setAuthView('login')}
      />
    );
  }

  // Default: Public High-Converting Website (Before Login)
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased selection:bg-[#0F766E]/20 selection:text-[#0F766E]">
      <Navbar
        onOpenLogin={() => setAuthView('login')}
        onOpenSignup={() => setAuthView('signup')}
      />

      <main className="flex-1">
        {/* Section 1: Hero + animated interactive dashboard preview with business switch */}
        <HeroSection
          onGetStarted={() => setAuthView('signup')}
          onExploreDemo={handleLaunchApp}
        />

        {/* Section 2: "Everything your business needs. In one place." Animated product modules */}
        <FeaturesSection />

        {/* Section 3: "Built differently for different businesses." Interactive sector showcase */}
        <LiveBusinessShowcase onOpenApp={(type) => switchBusinessByType(type)} />
        <BusinessTypesSection />

        {/* Section 4: Show the problem visually: Scattered notebooks, WhatsApp, Spreadsheets -> SHAFAF HISAB */}
        <ProblemSection />

        {/* Section 5: Interactive 6-step workflow: Record Sale -> Customer/Order -> Payment -> Expense -> Profit -> Report */}
        <HowItWorksSection onGetStarted={() => setAuthView('signup')} />

        {/* Section 6: Analytics preview with charts & real data */}
        <AnalyticsSection />

        {/* Section 7: Customer/Udhaar preview with statement & WhatsApp payment reminder */}
        <CustomerCreditKhataDemo />

        {/* Section 8: E-commerce preview: Orders -> Shipping -> Advertising -> Net Profit */}
        <EcommerceSection />

        {/* Section 9: Freelancer preview: Clients -> Projects -> Invoices -> Payments */}
        <FreelancerSection />

        {/* Section 10, 11, 12: Mobile App Preview + Security/Isolation Guarantee + Final CTA */}
        <MobileSecurityCTASection
          onGetStarted={() => setAuthView('signup')}
          onExploreDemo={handleLaunchApp}
        />

        {/* Proactive Smart Insights */}
        <SmartInsightsSection />

        {/* 10 Business Reports Showcase & Exports */}
        <ReportsShowcaseSection />

        {/* Transparent SaaS Pricing */}
        <PricingSection onSelectPlan={() => setAuthView('signup')} />
      </main>

      <Footer />

      {/* Global Data Isolation QA Suite Modal */}
      <DataIsolationTestModal
        isOpen={isIsolationTestModalOpen}
        onClose={() => setIsIsolationTestModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
