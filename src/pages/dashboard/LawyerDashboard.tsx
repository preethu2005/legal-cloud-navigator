
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Plus } from 'lucide-react';

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
          />
        </TabsContent>
        
        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <AppointmentsList appointments={appointments} />
        </TabsContent>
        
        {/* Clients Tab */}
        <TabsContent value="clients">
          <ClientDirectory clients={clients} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LawyerDashboard;
