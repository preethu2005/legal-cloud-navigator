
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase, Calendar, UserCheck } from 'lucide-react';

interface StatisticsCardsProps {
  activeCasesCount: number;
  upcomingAppointmentsCount: number;
  clientsCount: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  activeCasesCount,
  upcomingAppointmentsCount,
  clientsCount
}) => {
  return (
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
          <div className="text-3xl font-bold text-green-700">{clientsCount}</div>
          <p className="text-green-600 mt-1 text-sm">Active client relationships</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
