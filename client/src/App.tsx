import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import ErrorBoundary from './components/ErrorBoundary';
import WelcomeScreen from './components/WelcomeScreen';
import AnimatedBackground from './components/Background';
import Decorations from './components/Decorations';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import NotFound from './pages/NotFound';
import { Route, Switch } from 'wouter';

function PortfolioHome() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [logoClickTimer, setLogoClickTimer] = useState<NodeJS.Timeout | null>(null);

  // Secret trigger: Click logo 5 times within 2 seconds
  useEffect(() => {
    const handleLogoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a[href="#home"]')) {
        setLogoClickCount((prev) => {
          const newCount = prev + 1;
          
          if (newCount === 5) {
            setShowAdmin(true);
            setLogoClickCount(0);
            if (logoClickTimer) clearTimeout(logoClickTimer);
            return 0;
          }
          
          return newCount;
        });

        // Reset counter after 2 seconds
        if (logoClickTimer) clearTimeout(logoClickTimer);
        const timer = setTimeout(() => {
          setLogoClickCount(0);
        }, 2000);
        setLogoClickTimer(timer);
      }
    };

    document.addEventListener('click', handleLogoClick);
    return () => {
      document.removeEventListener('click', handleLogoClick);
      if (logoClickTimer) clearTimeout(logoClickTimer);
    };
  }, [logoClickTimer]);

  return (
    <>
      {/* Welcome Screen */}
      {showWelcome && (
        <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
      )}

      {/* Main Content */}
      {!showWelcome && (
        <>
          <AnimatedBackground />
          <Decorations />
          <Navbar />
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
            <ContactSection />
          </main>
          
          {/* Footer */}
          <footer className="relative z-10 border-t border-white/10 py-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  © 2025{' '}
                  <span className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent font-semibold">
                    Rowan
                  </span>
                  . All Rights Reserved.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Merging the logic of code with the soul of poetry
                </p>
              </div>
            </div>
          </footer>

          {/* Hidden Admin Panel */}
          <AdminPanel isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
        </>
      )}
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={PortfolioHome} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <PortfolioProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </PortfolioProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
