
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onQuestionClick }) => {
  const questions = [
    "What are my rights as a tenant?",
    "How do I form an LLC?",
    "What is the process for filing a small claims case?",
    "How do I protect my intellectual property?",
    "What should I include in an employment contract?"
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium mb-4">Common Legal Questions</h3>
      <div className="grid gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start text-left h-auto py-2"
            onClick={() => onQuestionClick(question)}
          >
            <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>{question}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
