import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Logo } from '../brand/Logo';
import { RefreshCw, Home, ShieldCheck } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log detailed technical error to console for developers / debugging
    console.error('[SHAFAF HISAB Error Boundary caught an error]:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Clean any transient cache while keeping core accounts intact
        sessionStorage.clear();
      }
    } catch (e) {
      console.warn('Storage cleanup failed gracefully', e);
    }
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = './';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 antialiased text-[#0B1F33]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl shadow-slate-200/50 text-center space-y-6 animate-fade-in">
            {/* Brand Logo Header */}
            <div className="flex justify-center">
              <Logo size="lg" variant="dark" showTagline={true} />
            </div>

            {/* Error Message Header */}
            <div className="space-y-2 pt-2">
              <h2 className="text-xl font-black text-[#0B1F33] tracking-tight">
                SHAFAF HISAB
              </h2>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                Something went wrong while loading the application.
              </p>
              <p className="text-xs text-slate-500 leading-normal">
                Your business data is safe and isolated. Click below to reload the workspace.
              </p>
            </div>

            {/* Recovery Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </button>
            </div>

            {/* Footer Trust Indicator */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>SHAFAF HISAB Tenancy Isolation Layer</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
