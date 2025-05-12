
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { CaseStatus, LegalCase } from './types';

interface CasesManagementProps {
  cases: LegalCase[];
  getStatusColor: (status: string) => string;
  onStatusChange?: (caseId: string, newStatus: CaseStatus) => void;
}

const CasesManagement: React.FC<CasesManagementProps> = ({ cases, getStatusColor, onStatusChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredCases, setFilteredCases] = useState<LegalCase[]>(cases);

  const formatDate = (date: Date) => {
    return format(date, 'PPP');
  };

  // Filter cases based on search query and status
  useEffect(() => {
    let filtered = [...cases];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.description.toLowerCase().includes(query) ||
        c.clientName.toLowerCase().includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    
    setFilteredCases(filtered);
  }, [searchQuery, statusFilter, cases]);

  const handleStatusChange = (caseId: string, newStatus: CaseStatus) => {
    if (onStatusChange) {
      onStatusChange(caseId, newStatus);
    }
    
    toast({
      title: "Case status updated",
      description: `Case status has been changed to ${newStatus.replace('_', ' ')}.`,
    });
  };
  
  const handleViewCase = (caseId: string) => {
    toast({
      title: "View Case Details",
      description: `Case details view is coming soon.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Case Management</CardTitle>
          <CardDescription>View and manage all assigned cases</CardDescription>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[250px]"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value={CaseStatus.NEW}>New</SelectItem>
              <SelectItem value={CaseStatus.IN_PROGRESS}>In Progress</SelectItem>
              <SelectItem value={CaseStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={CaseStatus.RESOLVED}>Resolved</SelectItem>
              <SelectItem value={CaseStatus.CLOSED}>Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredCases.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No cases match your search criteria.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">
                    <div className="hover:text-primary cursor-pointer" onClick={() => handleViewCase(caseItem.id)}>
                      {caseItem.title}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {caseItem.description}
                    </p>
                  </TableCell>
                  <TableCell>{caseItem.clientName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{caseItem.category}</Badge>
                  </TableCell>
                  <TableCell>{caseItem.dueDate ? formatDate(caseItem.dueDate) : 'N/A'}</TableCell>
                  <TableCell>
                    <Select 
                      defaultValue={caseItem.status} 
                      onValueChange={(value) => handleStatusChange(caseItem.id, value as CaseStatus)}
                    >
                      <SelectTrigger className={`w-[130px] ${getStatusColor(caseItem.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={CaseStatus.NEW}>New</SelectItem>
                        <SelectItem value={CaseStatus.IN_PROGRESS}>In Progress</SelectItem>
                        <SelectItem value={CaseStatus.PENDING}>Pending</SelectItem>
                        <SelectItem value={CaseStatus.RESOLVED}>Resolved</SelectItem>
                        <SelectItem value={CaseStatus.CLOSED}>Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewCase(caseItem.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
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

export default CasesManagement;
