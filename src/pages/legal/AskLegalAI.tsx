import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import SuggestedQuestions from '@/components/legal/SuggestedQuestions';

const AskLegalAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', content: query }]);

    try {
      // Simulate API call with delayed response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = getSimulatedResponse(query);
      
      setChatHistory(prev => [...prev, { role: 'bot', content: response }]);
      setQuery('');
      toast.success("Response generated successfully");
    } catch (error) {
      toast.error("Failed to generate response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    setQuery(question);
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="grid gap-6">
        {/* Chat History */}
        {chatHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'bot' ? 'bg-muted/50 p-4 rounded-lg' : ''}`}
                >
                  <MessageSquare className="h-5 w-5 flex-shrink-0 mt-1" />
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Ask a Legal Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Type your legal question here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[100px]"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !query.trim()}>
                <Send className="mr-2 h-4 w-4" />
                {isLoading ? 'Thinking...' : 'Get Answer'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        {chatHistory.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <SuggestedQuestions onQuestionClick={handleQuestionClick} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Simple Disclaimer */}
      <p className="text-sm text-muted-foreground text-center mt-6">
        This AI provides general guidance only, not legal advice. Please consult a lawyer for specific legal matters.
      </p>
    </div>
  );
};

const getSimulatedResponse = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('landlord') || lowerQuery.includes('tenant') || lowerQuery.includes('rent')) {
    return `Based on general legal principles regarding landlord-tenant relationships:

1. Landlords typically have a legal obligation to maintain the property in habitable condition.
2. Tenants generally have rights to request necessary repairs.
3. If repairs aren't made within a reasonable timeframe, depending on your jurisdiction, you may have several options:
   - Withholding rent (in some states)
   - "Repair and deduct" remedy
   - Breaking the lease without penalty
   - Filing a complaint with local housing authorities

The specific laws vary by location, and I recommend consulting with a landlord-tenant attorney in your area for personalized advice regarding your situation.

*Note: This information is provided as general guidance and not as legal advice.*`;
  }
  
  if (lowerQuery.includes('copyright') || lowerQuery.includes('intellectual property') || lowerQuery.includes('patent')) {
    return `Regarding copyright protection for software:

1. Copyright protection for software is automatic upon creation, but registration provides important benefits:
   - Public record of ownership
   - Legal presumption of validity
   - Statutory damages and attorney fees in litigation
   - Ability to file infringement suits (for U.S. works)

2. To register copyright for software with the U.S. Copyright Office:
   - Complete an application through the Electronic Copyright Office (eCO)
   - Pay the required filing fee
   - Submit a deposit of identifying material from your software

For comprehensive protection of software, consider multiple intellectual property strategies including copyright, patents (for functional aspects), and trade secrets.

*Note: This information is provided as general guidance and not as legal advice.*`;
  }
  
  return `Based on my understanding of your question:

The answer depends on several factors specific to your jurisdiction and the exact circumstances. Legal matters are often complex and require consideration of local laws and regulations.

I recommend:
1. Consulting with a licensed attorney specializing in this area
2. Reviewing relevant legal statutes in your jurisdiction
3. Gathering documentation related to your specific situation

Would you like me to help you find a legal professional who specializes in this type of matter?

*Note: This information is provided as general guidance and not as legal advice.*`;
};

export default AskLegalAI;
