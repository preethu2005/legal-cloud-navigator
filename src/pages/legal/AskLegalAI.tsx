
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Search } from 'lucide-react';

const AskLegalAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // This would use the Gemini API in a production environment
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate a response from Gemini API
      const simulatedResponse = getSimulatedResponse(query);
      setResponse(simulatedResponse);
    } catch (err) {
      setError('Failed to get a response from our legal chatbot. Please try again.');
      console.error('Error getting legal advice:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to simulate different responses based on query keywords
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

  const suggestedQuestions = [
    "What are my rights as a tenant?",
    "How do I form an LLC?",
    "What is the process for filing a small claims case?",
    "How do I protect my intellectual property?",
    "What should I include in an employment contract?"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-semibold mb-2">Legal Chat Bot</h1>
        <p className="text-muted-foreground">
          Ask our AI for preliminary legal guidance on your questions
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Ask a Legal Question</CardTitle>
          <CardDescription>
            Describe your legal question or concern in detail for the most accurate guidance
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Textarea
              placeholder="e.g., What are my rights as a tenant if my landlord refuses to make repairs?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[120px] resize-y"
            />
            {error && (
              <div className="mt-2 text-sm text-destructive">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end border-t bg-muted/50 px-6 py-4">
            <Button type="submit" disabled={isLoading || !query.trim()}>
              {isLoading ? 'Processing...' : (
                <>
                  <Search className="mr-2 h-4 w-4" /> Get Legal Guidance
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {response && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Chat Bot Response</CardTitle>
            <CardDescription>
              Preliminary guidance based on your query
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="bg-muted/50 p-4 rounded-md whitespace-pre-line">
                {response}
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="font-medium">Disclaimer:</p>
                <p>
                  This AI-generated response is for informational purposes only and does not constitute
                  legal advice. For legal advice specific to your situation, please consult with a licensed attorney.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full" onClick={() => setQuery('')}>
              Ask Another Question
            </Button>
          </CardFooter>
        </Card>
      )}

      {!response && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Suggested Questions</CardTitle>
            <CardDescription>
              Common legal questions you can ask our chat bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setQuery(question)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{question}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AskLegalAI;
