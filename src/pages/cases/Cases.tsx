
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Clock } from 'lucide-react';

enum CaseStatus {
  NEW = "new",
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

interface LegalCase {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  status: CaseStatus;
  priority: string;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Mock data for demonstration
const mockAllCases = [
  {
    id: '1',
    clientId: '123',
    title: 'Contract Review - Johnson Corp',
    description: 'Review of the employment contract with Johnson Corporation',
    category: 'Contract Law',
    status: CaseStatus.IN_PROGRESS,
    priority: 'medium',
    documents: [],
    createdAt: new Date(2023, 5, 12),
    updatedAt: new Date(2023, 6, 1),
  },
  {
    id: '2',
    clientId: '123',
    title: 'Trademark Registration - TechBrand',
    description: 'Assistance with trademark registration for new product line',
    category: 'Intellectual Property',
    status: CaseStatus.NEW,
    priority: 'high',
    documents: [],
    createdAt: new Date(2023, 7, 20),
    updatedAt: new Date(2023, 7, 20),
  },
  {
    id: '3',
    clientId: '123',
    title: 'Property Dispute - 123 Main St',
    description: 'Boundary dispute with neighboring property',
    category: 'Real Estate',
    status: CaseStatus.PENDING,
    priority: 'medium',
    documents: [],
    createdAt: new Date(2023, 4, 5),
    updatedAt: new Date(2023, 6, 15),
  },
  {
    id: '4',
    clientId: '123',
    title: 'Will Preparation',
    description: 'Drafting of last will and testament',
    category: 'Estate Planning',
    status: CaseStatus.CLOSED,
    priority: 'low',
    documents: [],
    createdAt: new Date(2023, 2, 10),
    updatedAt: new Date(2023, 3, 5),
  },
  {
    id: '5',
    clientId: '123',
    title: 'Divorce Proceedings',
    description: 'Assistance with divorce filing and settlements',
    category: 'Family Law',
    status: CaseStatus.IN_PROGRESS,
    priority: 'high',
    documents: [],
    createdAt: new Date(2023, 6, 5),
    updatedAt: new Date(2023, 7, 25),
  }
];

const Cases: React.FC = () => {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [filteredCases, setFilteredCases] = useState<LegalCase[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Categories derived from cases
  const categories = Array.from(new Set(mockAllCases.map(c => c.category)));
  
  // Load cases
  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      setCases(mockAllCases);
      setFilteredCases(mockAllCases);
      setIsLoading(false);
    }, 800);
  }, []);

  // Handle filtering
  useEffect(() => {
    let result = [...cases];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(c => c.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter);
    }
    
    setFilteredCases(result);
  }, [searchQuery, categoryFilter, statusFilter, cases]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-semibold">My Cases</h1>
        <Button asChild>
          <Link to="/cases/new" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> New Case
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
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
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Cases</TabsTrigger>
          <TabsTrigger value="closed">Closed Cases</TabsTrigger>
          <TabsTrigger value="all">All Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <CasesList 
            cases={filteredCases.filter(c => c.status !== CaseStatus.CLOSED && c.status !== CaseStatus.RESOLVED)} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
        
        <TabsContent value="closed">
          <CasesList 
            cases={filteredCases.filter(c => c.status === CaseStatus.CLOSED || c.status === CaseStatus.RESOLVED)} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
        
        <TabsContent value="all">
          <CasesList 
            cases={filteredCases} 
            isLoading={isLoading} 
            formatDate={formatDate}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface CasesListProps {
  cases: LegalCase[];
  isLoading: boolean;
  formatDate: (date: Date) => string;
  getStatusColor: (status: string) => string;
}

const CasesList: React.FC<CasesListProps> = ({ cases, isLoading, formatDate, getStatusColor }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-6 animate-pulse">
            <div className="h-5 bg-muted rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (cases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No cases found matching your criteria</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {cases.map((caseItem) => (
        <div key={caseItem.id} className="bg-card rounded-lg border border-border p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <Link to={`/cases/${caseItem.id}`} className="text-xl font-medium hover:text-primary">
                {caseItem.title}
              </Link>
              <div className="mt-1 flex flex-wrap gap-2">
                <Badge variant="outline">{caseItem.category}</Badge>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                  {caseItem.status.replace('_', ' ')}
                </span>
              </div>
            </div>
            <div className="mt-3 sm:mt-0">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/cases/${caseItem.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">{caseItem.description}</p>
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            Last updated {formatDate(caseItem.updatedAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cases;
