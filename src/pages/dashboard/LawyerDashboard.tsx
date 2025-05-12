
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, FileText, MessageSquare, Clock, Plus, 
  Users, Edit, UserCheck, Briefcase, Search
} from 'lucide-react';
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

enum CaseStatus {
  NEW = "new",
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: Date;
  casesCount: number;
}

interface LegalCase {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  category: string;
  status: CaseStatus;
  priority: string;
  dueDate?: Date;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Appointment {
  id: string;
  title: string;
  lawyerName: string;
  date: Date;
  status: 'scheduled' | 'confirmed' | 'cancelled';
  clientName?: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    joinedAt: new Date(2023, 3, 15),
    casesCount: 2,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    joinedAt: new Date(2023, 5, 22),
    casesCount: 1,
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 456-7890',
    joinedAt: new Date(2023, 6, 8),
    casesCount: 3,
  },
];

const mockLawyerCases = [
  {
    id: '1',
    clientId: '123',
    clientName: 'John Doe',
    title: 'Contract Review - Johnson Corp',
    description: 'Review of the employment contract with Johnson Corporation',
    category: 'Contract Law',
    status: CaseStatus.IN_PROGRESS,
    priority: 'medium',
    dueDate: new Date(2025, 5, 15),
    documents: [],
    createdAt: new Date(2023, 5, 12),
    updatedAt: new Date(2023, 6, 1),
  },
  {
    id: '2',
    clientId: '123',
    clientName: 'Jane Smith',
    title: 'Trademark Registration - TechBrand',
    description: 'Assistance with trademark registration for new product line',
    category: 'Intellectual Property',
    status: CaseStatus.NEW,
    priority: 'high',
    dueDate: new Date(2025, 5, 20),
    documents: [],
    createdAt: new Date(2023, 7, 20),
    updatedAt: new Date(2023, 7, 20),
  },
  {
    id: '3',
    clientId: '456',
    clientName: 'Robert Johnson',
    title: 'Property Dispute - 123 Main St',
    description: 'Boundary dispute with neighboring property',
    category: 'Real Estate',
    status: CaseStatus.PENDING,
    priority: 'medium',
    dueDate: new Date(2025, 6, 10),
    documents: [],
    createdAt: new Date(2023, 4, 5),
    updatedAt: new Date(2023, 6, 15),
  },
  {
    id: '4',
    clientId: '456',
    clientName: 'Maria Garcia',
    title: 'Corporate Merger Review',
    description: 'Review of proposed merger between ABC Corp and XYZ Inc',
    category: 'Corporate Law',
    status: CaseStatus.IN_PROGRESS,
    priority: 'high',
    dueDate: new Date(2025, 5, 30),
    documents: [],
    createdAt: new Date(2023, 8, 5),
    updatedAt: new Date(2023, 8, 10),
  },
  {
    id: '5',
    clientId: '789',
    clientName: 'David Lee',
    title: 'Tax Liability Assessment',
    description: 'Review of tax implications for international business operations',
    category: 'Tax Law',
    status: CaseStatus.NEW,
    priority: 'medium',
    dueDate: new Date(2025, 6, 5),
    documents: [],
    createdAt: new Date(2023, 8, 12),
    updatedAt: new Date(2023, 8, 12),
  }
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Initial Consultation',
    lawyerName: 'You',
    clientName: 'John Doe',
    date: new Date(2025, 4, 15, 10, 30),
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Contract Review',
    lawyerName: 'You',
    clientName: 'Jane Smith',
    date: new Date(2025, 4, 18, 14, 0),
    status: 'confirmed',
  },
  {
    id: '3',
    title: 'Case Strategy Discussion',
    lawyerName: 'You',
    clientName: 'Robert Johnson',
    date: new Date(2025, 4, 20, 11, 15),
    status: 'scheduled',
  }
];

const LawyerDashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [cases, setCases] = useState<LegalCase[]>(mockLawyerCases);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [filteredCases, setFilteredCases] = useState<LegalCase[]>(mockLawyerCases);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const formatDate = (date: Date) => {
    return format(date, 'PPP');
  };

  const formatDateTime = (date: Date) => {
    return format(date, 'PPP p');
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

  const handleStatusChange = (caseId: string, newStatus: CaseStatus) => {
    setCases(prev => prev.map(c => 
      c.id === caseId ? {...c, status: newStatus, updatedAt: new Date()} : c
    ));
    
    toast({
      title: "Case status updated",
      description: `Case status has been changed to ${newStatus.replace('_', ' ')}.`,
    });
  };

  // Calculate statistics
  const activeCasesCount = cases.filter(c => c.status !== CaseStatus.CLOSED && c.status !== CaseStatus.RESOLVED).length;
  const upcomingAppointmentsCount = appointments.filter(a => a.status !== 'cancelled' && new Date(a.date) > new Date()).length;
  const newCasesCount = cases.filter(c => c.status === CaseStatus.NEW).length;

  // Get cases by priority
  const urgentCases = cases.filter(c => c.priority === 'high' && c.status !== CaseStatus.CLOSED && c.status !== CaseStatus.RESOLVED);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-semibold mb-3">
            Lawyer Dashboard
          </h1>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/calendar" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> View Calendar
              </Link>
            </Button>
            <Button asChild>
              <Link to="/cases/new" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> New Case
              </Link>
            </Button>
          </div>
        </div>
        <h2 className="text-xl text-muted-foreground mb-6">
          Welcome back, Counselor
        </h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center text-blue-700">
              <Briefcase className="mr-2 h-5 w-5" />
              Active Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{activeCasesCount}</div>
            <p className="text-blue-600 mt-1 text-sm">Cases requiring attention</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center text-purple-700">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">{upcomingAppointmentsCount}</div>
            <p className="text-purple-600 mt-1 text-sm">Scheduled consultations</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center text-green-700">
              <UserCheck className="mr-2 h-5 w-5" />
              Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{clients.length}</div>
            <p className="text-green-600 mt-1 text-sm">Active client relationships</p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Cases */}
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

      {/* Main Content Tabs */}
      <Tabs defaultValue="cases" className="w-full">
        <TabsList>
          <TabsTrigger value="cases">Case Management</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="clients">Client Directory</TabsTrigger>
        </TabsList>
        
        {/* Cases Tab */}
        <TabsContent value="cases">
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
                          <Link to={`/cases/${caseItem.id}`} className="hover:text-primary">
                            {caseItem.title}
                          </Link>
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
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/cases/${caseItem.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" className="text-blue-600">
                              <MessageSquare className="h-4 w-4" />
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
        </TabsContent>
        
        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled client meetings and consultations</CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No appointments scheduled.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Appointment</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.title}</TableCell>
                        <TableCell>{appointment.clientName}</TableCell>
                        <TableCell>{formatDateTime(appointment.date)}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                              appointment.status === 'cancelled' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                              'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm" variant="ghost" className="text-red-600">Cancel</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Clients Tab */}
        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                Client Directory
              </CardTitle>
              <CardDescription>Manage your client relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Client Since</TableHead>
                    <TableHead>Active Cases</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>
                        <div>{client.email}</div>
                        <div className="text-sm text-muted-foreground">{client.phone}</div>
                      </TableCell>
                      <TableCell>{formatDate(client.joinedAt)}</TableCell>
                      <TableCell>{client.casesCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">View Profile</Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LawyerDashboard;
