
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-6">
          LegalCloud Advisor System
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          A simple and efficient way to get legal assistance, manage cases, and connect with legal professionals.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="font-medium">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-medium">
            <Link to="/legal-ai" className="flex items-center">
              Try Legal AI <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
