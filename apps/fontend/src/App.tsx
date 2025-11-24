import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { MarketsPage } from './components/MarketsPage';
import { PortfolioPage } from './components/PortfolioPage';
import { TradePage } from './components/TradePage';
import { AuthPage } from './components/AuthPage';

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'markets' | 'portfolio' | 'trade' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  
  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
      case 'signup':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard />;
      case 'markets':
        return <MarketsPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'trade':
        return <TradePage />;
      case 'settings':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl text-slate-900 dark:text-white mb-4">Settings</h2>
            <p className="text-slate-600 dark:text-slate-400">Settings page coming soon...</p>
          </div>
        );
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };
  
  const showLayout = !['landing', 'login', 'signup'].includes(currentPage);
  
  return (
    <ThemeProvider>
      {showLayout ? (
        <Layout currentPage={currentPage} onNavigate={handleNavigate}>
          {renderPage()}
        </Layout>
      ) : (
        renderPage()
      )}
    </ThemeProvider>
  );
}
