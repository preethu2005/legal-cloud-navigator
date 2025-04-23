import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, MessageSquare, Clock, Plus, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DashboardProps {
  userRole?: string;
}

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
const mockCases = [
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
  }
];

// Mock lawyer-specific cases
const mockLawyerCases = [
  ...mockCases,
  {
    id: '4',
    clientId: '456',
    title: 'Corporate Merger Review',
    description: 'Review of proposed merger between ABC Corp and XYZ Inc',
    category: 'Corporate Law',
    status: CaseStatus.IN_PROGRESS,
    priority: 'high',
    documents: [],
    createdAt: new Date(2023, 8, 5),
    updatedAt: new Date(2023, 8, 10),
  },
  {
    id: '5',
    clientId: '789',
    title: 'Tax Liability Assessment',
    description: 'Review of tax implications for international business operations',
    category: 'Tax Law',
    status: CaseStatus.NEW,
    priority: 'medium',
    documents: [],
    createdAt: new Date(2023, 8, 12),
    updatedAt: new Date(2023, 8, 12),
  }
];

const mockAppointments = [
  {
    id: '1',
    title: 'Initial Consultation',
    lawyerName: 'Sarah Mitchell',
    date: new Date(2023, 8, 15, 10, 30),
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Contract Review',
    lawyerName: 'Michael Johnson',
    date: new Date(2023, 8, 18, 14, 0),
    status: 'confirmed',
  }
];

const mockDocuments = [
  {
    id: '1',
    name: 'Employment Contract.pdf',
    size: '2.4 MB',
    uploadedAt: new Date(2023, 7, 28),
    caseId: '1',
  },
  {
    id: '2',
    name: 'Property Deed.pdf',
    size: '1.8 MB',
    uploadedAt: new Date(2023, 8, 2),
    caseId: '3',
  }
];

const mockQueries = [
  {
    id: '1',
    question: 'What are my rights as a tenant if my landlord refuses to make repairs?',
    timestamp: new Date(2023, 7, 28),
    status: 'answered',
  },
  {
    id: '2',
    question: 'How do I file for copyright protection for my new software?',
    timestamp: new Date(2023, 8, 2),
    status: 'pending',
  }
];

const Dashboard: React.FC<DashboardProps> = ({ userRole = 'client' }) => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [activeCases, setActiveCases] = useState<LegalCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      if (userRole === 'lawyer') {
        setActiveCases(mockLawyerCases);
      } else {
        setActiveCases(mockCases);
      }
      setIsLoading(false);
    }, 1000);
  }, [userRole]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  const handleUploadDocument = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        
        const newDoc = {
          id: Date.now().toString(),
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadedAt: new Date(),
          caseId: '1',
        };
        
        setDocuments(prev => [newDoc, ...prev]);
        toast({
          title: "Document uploaded successfully",
          description: `${file.name} has been uploaded.`,
        });
      }
    };
    
    input.click();
  };

  const handleDownloadDocument = (docName: string) => {
    // In a real app, this would download from your storage
    toast({
      title: "Download started",
      description: `Downloading ${docName}...`,
    });
  };

  const handleManageAppointment = (appointmentId: string) => {
    toast({
      title: "Appointment management",
      description: "This feature will be available soon.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-semibold">
          {userRole === 'lawyer' ? 'Lawyer Dashboard' : 'Client Dashboard'}
        </h1>
        <div className="flex space-x-4">
          <Button asChild>
            <Link to="/cases/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> New Case
            </Link>
          </Button>
          {userRole === 'client' && (
            <Button variant="outline" onClick={handleUploadDocument}>
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Document Management Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <Upload className="mr-2 h-5 w-5 text-muted-foreground" />
              {userRole === 'lawyer' ? 'Client Documents' : 'My Documents'}
            </CardTitle>
            <CardDescription>
              {documents.length} documents available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              onClick={handleUploadDocument} 
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>

        {/* Appointments Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              Appointments
            </CardTitle>
            <CardDescription>{appointments.length} scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              onClick={() => handleManageAppointment('new')}
              className="w-full"
            >
              Manage Appointments
            </Button>
          </CardContent>

        </Card>

        {/* Active Cases */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
              Active Cases
            </CardTitle>
            <CardDescription>
              {userRole === 'lawyer' 
                ? `${mockLawyerCases.length} cases assigned to you`
                : `${activeCases.length} cases in progress`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/cases" className="text-primary hover:underline text-sm">
              View all cases
            </Link>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>
                View and manage all documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex justify-between items-center p-4 bg-card rounded-md border border-border">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Uploaded {formatDate(doc.uploadedAt)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadDocument(doc.name)}
                      >
                        Download
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => window.open(`#/documents/${doc.id}`, '_blank')}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Appointments</CardTitle>
              <CardDescription>
                {userRole === 'lawyer' 
                  ? 'Upcoming consultations with clients'
                  : 'Your upcoming consultations with legal professionals'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No appointments scheduled</p>
                  <Button asChild className="mt-4">
                    <Link to="/appointments/schedule">
                      {userRole === 'lawyer' ? 'Set Availability' : 'Schedule Consultation'}
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex justify-between items-center p-4 bg-card rounded-md border border-border">
                      <div>
                        <p className="font-medium">{appointment.title}</p>
                        {userRole === 'lawyer' ? (
                          <p className="text-sm text-muted-foreground">with Client Name</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">with {appointment.lawyerName}</p>
                        )}
                        <p className="text-sm mt-1">{formatDateTime(appointment.date)}</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/appointments/${appointment.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>
                {userRole === 'lawyer' ? 'Assigned Cases' : 'Active Legal Cases'}
              </CardTitle>
              <CardDescription>
                {userRole === 'lawyer' 
                  ? 'Cases currently assigned to you for review'
                  : 'Manage your ongoing legal matters'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-pulse bg-muted h-12 w-full rounded-md mb-4"></div>
                  <div className="animate-pulse bg-muted h-12 w-full rounded-md mb-4"></div>
                  <div className="animate-pulse bg-muted h-12 w-full rounded-md"></div>
                </div>
              ) : activeCases.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No active cases found</p>
                  <Button asChild className="mt-4">
                    <Link to="/cases/new">Create New Case</Link>
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {activeCases.map((caseItem) => (
                    <div key={caseItem.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/cases/${caseItem.id}`} className="text-lg font-medium hover:text-primary">
                            {caseItem.title}
                          </Link>
                          <p className="text-muted-foreground text-sm mt-1">{caseItem.category}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="mt-2 text-sm line-clamp-2">{caseItem.description}</p>
                      <div className="mt-3 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        Updated {formatDate(caseItem.updatedAt)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
