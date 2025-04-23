
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard/Dashboard";
import AskLegalAI from "@/pages/legal/AskLegalAI";
import Cases from "@/pages/cases/Cases";
import NotFound from "@/pages/NotFound";
import PrivateRoute from "@/components/auth/PrivateRoute";

const App = () => {
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Simulate checking authentication
  useEffect(() => {
    // This would check Firebase auth in a real app
    const checkAuth = () => {
      // For demo purposes, just simulate a check
      const savedAuthState = localStorage.getItem('isAuthenticated');
      if (savedAuthState === 'true') {
        setIsAuthenticated(true);
        setUserRole(localStorage.getItem('userRole'));
      }
    };

    checkAuth();
  }, []);

  // Mock login function
  const handleLogin = (email: string, password: string) => {
    // This would be Firebase auth
    setIsAuthenticated(true);
    
    // Set mock role based on email for demo
    const role = email.includes('lawyer') ? 'lawyer' : 'client';
    setUserRole(role);
    
    // Store in localStorage for demo persistence
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    
    return true;
  };

  // Mock logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={
                <Login onLogin={handleLogin} />
              } />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/dashboard" element={<Dashboard userRole={userRole || 'client'} />} />
                <Route path="/legal-ai" element={<AskLegalAI />} />
                <Route path="/cases" element={<Cases userRole={userRole || 'client'} />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
