import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-secondary/10 py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
          Streamline Your Legal Needs
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Access professional legal services, document management, and smart legal assistance all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {!isAuthenticated ? (
            <>
              <Button size="lg" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <Button size="lg" asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Features Section - only show when not logged in */}
      {!isAuthenticated && (
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-6">
              LegalCloud Advisor System
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              A simple and efficient way to get legal assistance, manage cases, and connect with legal professionals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="font-medium">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
