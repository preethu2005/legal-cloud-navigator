
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Import refactored components
import StatisticsCards from './components/lawyer/StatisticsCards';
import UrgentCases from './components/lawyer/UrgentCases';
import CasesManagement from './components/lawyer/CasesManagement';
import AppointmentsList from './components/lawyer/AppointmentsList';
import ClientDirectory from './components/lawyer/ClientDirectory';

// Import types and mock data
import { CaseStatus, LegalCase } from './components/lawyer/types';
import { mockClients, mockLawyerCases, mockAppointments } from './components/lawyer/MockData';

const LawyerDashboard: React.FC = () => {
  const [clients, setClients] = useState(mockClients);
  const [cases, setCases] = useState<LegalCase[]>(mockLawyerCases);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Calculate statistics
  const activeCasesCount = cases.filter(c => c.status !== CaseStatus.CLOSED && c.status !== CaseStatus.RESOLVED).length;
  const upcomingAppointmentsCount = appointments.filter(a => a.status !== 'cancelled' && new Date(a.date) > new Date()).length;

  // Get cases by priority
  const urgentCases = cases.filter(c => c.priority === 'high' && c.status !== CaseStatus.CLOSED && c.status !== CaseStatus.RESOLVED);

  // Status color mapping helper
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
  };
  
  const handleCalendarView = () => {
    setIsCalendarOpen(true);
  };
  
  const handleNewCase = () => {
    toast({
      title: "New Case Feature Coming Soon",
      description: "The new case creation functionality is currently under development.",
    });
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.getDate() === date.getDate() && 
             appointmentDate.getMonth() === date.getMonth() && 
             appointmentDate.getFullYear() === date.getFullYear();
    });
  };

  const dateHasAppointment = (date: Date) => {
    return getAppointmentsForDate(date).length > 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-semibold mb-3">
            Lawyer Dashboard
          </h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCalendarView}>
              <CalendarIcon className="mr-2 h-4 w-4" /> View Calendar
            </Button>
            <Button onClick={handleNewCase}>
              <Plus className="mr-2 h-4 w-4" /> New Case
            </Button>
          </div>
        </div>
        <h2 className="text-xl text-muted-foreground mb-6">
          Welcome back, Counselor
        </h2>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards 
        activeCasesCount={activeCasesCount}
        upcomingAppointmentsCount={upcomingAppointmentsCount}
        clientsCount={clients.length}
      />

      {/* Urgent Cases */}
      <UrgentCases 
        urgentCases={urgentCases} 
        getStatusColor={getStatusColor} 
      />

      {/* Main Content Tabs */}
      <Tabs defaultValue="cases" className="w-full">
        <TabsList>
          <TabsTrigger value="cases">Case Management</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="clients">Client Directory</TabsTrigger>
        </TabsList>
        
        {/* Cases Tab */}
        <TabsContent value="cases">
          <CasesManagement 
            cases={cases} 
            getStatusColor={getStatusColor}
            onStatusChange={handleStatusChange}
          />
        </TabsContent>
        
        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <AppointmentsList 
            appointments={appointments}
            setAppointments={setAppointments} 
          />
        </TabsContent>
        
        {/* Clients Tab */}
        <TabsContent value="clients">
          <ClientDirectory clients={clients} />
        </TabsContent>
      </Tabs>

      {/* Calendar Dialog */}
      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Calendar View</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              modifiers={{
                appointment: (date) => dateHasAppointment(date),
              }}
              modifiersStyles={{
                appointment: { fontWeight: 'bold', textDecoration: 'underline', color: 'blue' }
              }}
            />
            
            <div className="mt-6">
              <h3 className="text-lg font-medium">
                Appointments on {format(selectedDate, 'PPP')}
              </h3>
              <div className="space-y-2 mt-2">
                {getAppointmentsForDate(selectedDate).length > 0 ? (
                  getAppointmentsForDate(selectedDate).map(appointment => (
                    <div key={appointment.id} className="p-2 border rounded-md">
                      <div className="font-medium">{appointment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(appointment.date), 'p')} - Client: {appointment.clientName}
                      </div>
                      <Badge 
                        className={
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200 mt-1' : 
                          appointment.status === 'cancelled' ? 'bg-red-100 text-red-800 hover:bg-red-200 mt-1' :
                          'bg-blue-100 text-blue-800 hover:bg-blue-200 mt-1'
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No appointments scheduled for this day.</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LawyerDashboard;
