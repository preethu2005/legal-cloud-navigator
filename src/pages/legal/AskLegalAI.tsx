
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Search, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';

const AskLegalAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', content: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when chat updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Progress bar animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 150);
    } else {
      setProgress(100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    
    // Add user query to chat history
    setChatHistory(prev => [...prev, { role: 'user', content: query }]);
    
    try {
      // This would use the Gemini API in a production environment
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate a response from Gemini API
      const simulatedResponse = getSimulatedResponse(query);
      setResponse(simulatedResponse);
      
      // Add bot response to chat history
      setChatHistory(prev => [...prev, { role: 'bot', content: simulatedResponse }]);
      
      // Reset query input
      setQuery('');
      
      // Show success toast
      toast.success("Response generated successfully");
    } catch (err) {
      setError('Failed to get a response from our legal chatbot. Please try again.');
      toast.error("Failed to generate response");
      console.error('Error getting legal advice:', err);
    } finally {
      setIsLoading(false);
      setProgress(100);
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

  const handleSuggestedQuestionClick = (question: string) => {
    setQuery(question);
    // Optional: automatically submit the form when clicking a suggested question
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
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

      {/* Chat History Display */}
      {chatHistory.length > 0 && (
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Chat History</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto p-0">
            <div className="flex flex-col">
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 ${msg.role === 'bot' 
                    ? 'bg-muted/50' 
                    : 'bg-background border-b'}`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 mr-3 mt-0.5 ${msg.role === 'bot' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {msg.role === 'bot' ? <MessageSquare size={16} /> : <ArrowRight size={16} />}
                    </div>
                    <div className={`flex-1 ${msg.role === 'bot' ? 'prose prose-sm max-w-none' : ''}`}>
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </CardContent>
        </Card>
      )}

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
              disabled={isLoading}
            />
            {error && (
              <div className="mt-2 text-sm text-destructive">
                {error}
              </div>
            )}
            {isLoading && (
              <div className="mt-4">
                <Progress value={progress} className="h-1" />
                <p className="text-xs text-muted-foreground mt-1">Generating legal response...</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">AI-powered legal guidance</span>
            </div>
            <Button type="submit" disabled={isLoading || !query.trim()}>
              {isLoading ? 'Processing...' : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Get Legal Guidance
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {chatHistory.length === 0 && (
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
                    onClick={() => handleSuggestedQuestionClick(question)}
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
      
      <div className="mt-6 text-sm text-muted-foreground text-center">
        <p className="font-medium">Disclaimer:</p>
        <p>
          This AI-generated response is for informational purposes only and does not constitute
          legal advice. For legal advice specific to your situation, please consult with a licensed attorney.
        </p>
      </div>
    </div>
  );
};

export default AskLegalAI;
