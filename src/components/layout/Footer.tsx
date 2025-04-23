
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">LegalCloud Advisor</h3>
            <p className="text-muted-foreground text-sm">
              Providing innovative legal solutions through secure cloud technology and AI assistance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources/legal-dictionary" className="hover:text-primary transition-colors">Legal Dictionary</Link></li>
              <li><Link to="/resources/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/resources/templates" className="hover:text-primary transition-colors">Document Templates</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/disclaimer" className="hover:text-primary transition-colors">Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} LegalCloud Advisor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
