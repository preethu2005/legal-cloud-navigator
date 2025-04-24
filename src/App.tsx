
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
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
  // Firebase authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsAuthenticated(true);
        
        // Get role from localStorage (in a real app, this would be in Firestore or custom claims)
        const role = localStorage.getItem('userRole') || 'client';
        setUserRole(role);
        
        // Store authentication state in localStorage for persistence
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsAuthenticated(false);
      setUserRole(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  if (isLoading) {
    // You could add a loading spinner here
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
              } />
              <Route path="/register" element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
              } />
              
              {/* Protected Routes */}
              <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/dashboard" element={<Dashboard userRole={userRole || 'client'} />} />
                <Route path="/legal-ai" element={<AskLegalAI />} />
                <Route path="/cases" element={<Cases />} />
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
