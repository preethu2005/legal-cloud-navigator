
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

interface LegalCase {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  dueDate?: Date;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface UrgentCasesProps {
  urgentCases: LegalCase[];
  getStatusColor: (status: string) => string;
}

const UrgentCases: React.FC<UrgentCasesProps> = ({ urgentCases, getStatusColor }) => {
  const formatDate = (date: Date) => {
    return format(date, 'PPP');
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-red-500" />
          Urgent Cases
        </CardTitle>
        <CardDescription>
          High-priority cases requiring immediate attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        {urgentCases.length === 0 ? (
          <p className="text-muted-foreground">No urgent cases at the moment.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urgentCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">
                    <Link to={`/cases/${caseItem.id}`} className="hover:text-primary">
                      {caseItem.title}
                    </Link>
                  </TableCell>
                  <TableCell>{caseItem.clientName}</TableCell>
                  <TableCell>{caseItem.dueDate ? formatDate(caseItem.dueDate) : 'N/A'}</TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/cases/${caseItem.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default UrgentCases;
