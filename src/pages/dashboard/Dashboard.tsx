import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, FileText, MessageSquare, Clock, Plus, Upload, 
  Trash2, Edit, X, Check, Download
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface Appointment {
  id: string;
  title: string;
  lawyerName: string;
  date: Date;
  status: 'scheduled' | 'confirmed' | 'cancelled';
  clientName?: string;
}

interface Document {
  id: string;
  name: string;
  size: string;
  uploadedAt: Date;
  caseId: string;
}

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

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Initial Consultation',
    lawyerName: 'Sarah Mitchell',
    clientName: 'John Doe',
    date: new Date(2025, 4, 15, 10, 30),
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Contract Review',
    lawyerName: 'Michael Johnson',
    clientName: 'Jane Smith',
    date: new Date(2025, 4, 18, 14, 0),
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
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [activeCases, setActiveCases] = useState<LegalCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userName, setUserName] = useState<string>("User");
  const navigate = useNavigate();

  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: new Date(),
    time: '09:00',
    lawyerName: userRole === 'client' ? '' : 'N/A',
    clientName: userRole === 'lawyer' ? '' : 'N/A',
  });
  
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    } else {
      setUserName(userRole === 'lawyer' ? 'Counselor' : 'Client');
    }
    
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
    toast({
      title: "Download started",
      description: `Downloading ${docName}...`,
    });
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    toast({
      title: "Document deleted",
      description: "The document has been removed from your files.",
    });
  };

  const handleCreateAppointment = () => {
    const [hours, minutes] = newAppointment.time.split(':').map(Number);
    const appointmentDate = new Date(selectedDate || new Date());
    appointmentDate.setHours(hours, minutes, 0);
    
    const newAppointmentObj: Appointment = {
      id: Date.now().toString(),
      title: newAppointment.title,
      lawyerName: userRole === 'lawyer' ? 'You' : newAppointment.lawyerName,
      clientName: userRole === 'client' ? 'You' : newAppointment.clientName,
      date: appointmentDate,
      status: 'scheduled',
    };
    
    setAppointments(prev => [newAppointmentObj, ...prev]);
    
    setNewAppointment({
      title: '',
      date: new Date(),
      time: '09:00',
      lawyerName: userRole === 'client' ? '' : 'N/A',
      clientName: userRole === 'lawyer' ? '' : 'N/A',
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Appointment scheduled",
      description: `${newAppointmentObj.title} has been scheduled for ${formatDateTime(newAppointmentObj.date)}.`,
    });
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    toast({
      title: "Appointment cancelled",
      description: "The appointment has been cancelled.",
    });
  };

  const handleUpdateAppointmentStatus = (appointmentId: string, newStatus: 'scheduled' | 'confirmed' | 'cancelled') => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? {...apt, status: newStatus}
        : apt
    ));
    
    toast({
      title: `Appointment ${newStatus}`,
      description: `The appointment status has been updated to ${newStatus}.`,
    });
  };

  const handleManageAppointments = () => {
    // Open the appointments tab
    const appointmentsTab = document.querySelector('[data-state="inactive"][value="appointments"]') as HTMLButtonElement;
    if (appointmentsTab) {
      appointmentsTab.click();
    } else {
      toast({
        title: "Appointments",
        description: "Opening appointments manager",
      });
    }
  };

  const handleNewCase = () => {
    navigate('/cases/new');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-serif font-semibold mb-3">
          {userRole === 'lawyer' ? 'Lawyer Dashboard' : 'Client Dashboard'}
        </h1>
        <h2 className="text-xl text-muted-foreground mb-6">
          Welcome, {userName}
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleNewCase} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> New Case
          </Button>
          <Button variant="outline" onClick={handleManageAppointments} className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" /> Manage Appointments
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              Appointments
            </CardTitle>
            <CardDescription>{appointments.length} scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule Appointment</DialogTitle>
                  <DialogDescription>
                    Create a new appointment. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Appointment title"
                      value={newAppointment.title}
                      onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    />
                  </div>
                  {userRole === 'client' && (
                    <div className="grid gap-2">
                      <Label htmlFor="lawyer">Lawyer</Label>
                      <Select
                        onValueChange={(value) => 
                          setNewAppointment({...newAppointment, lawyerName: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a lawyer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sarah Mitchell">Sarah Mitchell</SelectItem>
                          <SelectItem value="Michael Johnson">Michael Johnson</SelectItem>
                          <SelectItem value="Jessica Brown">Jessica Brown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {userRole === 'lawyer' && (
                    <div className="grid gap-2">
                      <Label htmlFor="client">Client</Label>
                      <Select
                        onValueChange={(value) => 
                          setNewAppointment({...newAppointment, clientName: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="John Doe">John Doe</SelectItem>
                          <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                          <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateAppointment}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

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
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No documents uploaded yet</p>
                    <Button onClick={handleUploadDocument} className="mt-4">
                      Upload Your First Document
                    </Button>
                  </div>
                ) : (
                  documents.map((doc) => (
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
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => window.open(`#/documents/${doc.id}`, '_blank')}
                        >
                          View
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scheduled Appointments</CardTitle>
                <CardDescription>
                  {userRole === 'lawyer' 
                    ? 'Upcoming consultations with clients'
                    : 'Your upcoming consultations with legal professionals'}
                </CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Schedule Appointment</DialogTitle>
                    <DialogDescription>
                      Create a new appointment. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Appointment title"
                        value={newAppointment.title}
                        onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      />
                    </div>
                    {userRole === 'client' && (
                      <div className="grid gap-2">
                        <Label htmlFor="lawyer">Lawyer</Label>
                        <Select
                          onValueChange={(value) => 
                            setNewAppointment({...newAppointment, lawyerName: value})
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a lawyer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sarah Mitchell">Sarah Mitchell</SelectItem>
                            <SelectItem value="Michael Johnson">Michael Johnson</SelectItem>
                            <SelectItem value="Jessica Brown">Jessica Brown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {userRole === 'lawyer' && (
                      <div className="grid gap-2">
                        <Label htmlFor="client">Client</Label>
                        <Select
                          onValueChange={(value) => 
                            setNewAppointment({...newAppointment, clientName: value})
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a client" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="John Doe">John Doe</SelectItem>
                            <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                            <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateAppointment}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No appointments scheduled</p>
                  <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Your First Appointment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} 
                      className={`flex justify-between items-center p-4 bg-card rounded-md border ${
                        appointment.status === 'cancelled' ? 'border-destructive/50 bg-destructive/10' :
                        appointment.status === 'confirmed' ? 'border-green-600/50 bg-green-600/10' :
                        'border-border'
                      }`}
                    >
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{appointment.title}</p>
                          {appointment.status === 'cancelled' && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded bg-destructive text-destructive-foreground">
                              Cancelled
                            </span>
                          )}
                          {appointment.status === 'confirmed' && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-600 text-white">
                              Confirmed
                            </span>
                          )}
                        </div>
                        {userRole === 'lawyer' ? (
                          <p className="text-sm text-muted-foreground">with {appointment.clientName || 'Client'}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">with {appointment.lawyerName}</p>
                        )}
                        <p className="text-sm mt-1">{formatDateTime(appointment.date)}</p>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status !== 'cancelled' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleUpdateAppointmentStatus(appointment.id, 'confirmed')}
                              disabled={appointment.status === 'confirmed'}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteAppointment(appointment.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </>
                        )}
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
