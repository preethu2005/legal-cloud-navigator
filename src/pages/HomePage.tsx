
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-primary">
                Modern Legal Solutions in the Cloud
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                Secure, intelligent legal assistance powered by advanced AI technology and experienced legal professionals.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
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
            <div className="mt-10 md:mt-0 md:w-1/2">
              <div className="bg-white rounded-lg shadow-md p-6 border border-border">
                <h3 className="text-lg font-medium mb-4">Quick Legal Consultation</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Your legal question
                    </label>
                    <textarea
                      className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                      rows={4}
                      placeholder="Describe your legal question or concern..."
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">Get Quick Advice</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold">Our Services</h2>
            <p className="mt-4 text-muted-foreground">Comprehensive legal solutions for your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-semibold">01</span>
              </div>
              <h3 className="text-xl font-medium mb-2">AI Legal Assistant</h3>
              <p className="text-muted-foreground mb-4">
                Get instant answers to legal questions using our advanced AI technology, available 24/7.
              </p>
              <Link to="/legal-ai" className="text-primary hover:underline flex items-center text-sm">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-semibold">02</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Document Storage</h3>
              <p className="text-muted-foreground mb-4">
                Store, manage, and share your legal documents with bank-level security in the cloud.
              </p>
              <Link to="/documents" className="text-primary hover:underline flex items-center text-sm">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-semibold">03</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Professional Consultations</h3>
              <p className="text-muted-foreground mb-4">
                Schedule appointments with experienced attorneys specialized in your specific legal needs.
              </p>
              <Link to="/appointments" className="text-primary hover:underline flex items-center text-sm">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold">Client Testimonials</h2>
            <p className="mt-4 text-muted-foreground">What our clients say about us</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <p className="italic text-muted-foreground mb-4">
                "LegalCloud Advisor helped me resolve a complex contract dispute quickly with their AI assistance and professional consultation."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                <div className="ml-3">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Small Business Owner</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <p className="italic text-muted-foreground mb-4">
                "The document management system is incredibly intuitive and secure, giving me peace of mind about my sensitive legal documents."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                <div className="ml-3">
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Real Estate Developer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <p className="italic text-muted-foreground mb-4">
                "Being able to get quick legal advice through the AI system before scheduling a full consultation saved me both time and money."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                <div className="ml-3">
                  <p className="font-medium">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Startup Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
