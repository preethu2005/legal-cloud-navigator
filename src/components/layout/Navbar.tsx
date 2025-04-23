
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-primary font-serif text-2xl font-semibold">LegalCloud</span>
              <span className="text-muted-foreground text-lg ml-1">Advisor</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:space-x-4">
            <Link to="/dashboard" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Dashboard
            </Link>
            <Link to="/cases" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              My Cases
            </Link>
            <Link to="/legal-ai" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Legal AI
            </Link>
          </div>
          
          <div className="flex items-center">
            <Button variant="ghost" className="ml-4">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button className="ml-4">
              <Link to="/register" className="text-white">Register</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden border-t border-border">
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">
            Dashboard
          </Link>
          <Link to="/cases" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">
            My Cases
          </Link>
          <Link to="/legal-ai" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">
            Legal AI
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
