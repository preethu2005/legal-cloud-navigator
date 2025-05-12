
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import { format, addDays } from 'date-fns';
import { CalendarClock } from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  lawyerName: string;
  date: Date;
  status: 'scheduled' | 'confirmed' | 'cancelled';
  clientName?: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
  setAppointments?: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments, setAppointments }) => {
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentAppointmentId, setCurrentAppointmentId] = useState<string | null>(null);

  const formatDateTime = (date: Date) => {
    return format(date, 'PPP p');
  };

  const handleReschedule = (appointmentId: string) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      setSelectedDate(appointment.date);
      setCurrentAppointmentId(appointmentId);
      setIsRescheduleDialogOpen(true);
    }
  };

  const confirmReschedule = () => {
    if (currentAppointmentId && selectedDate && setAppointments) {
      setAppointments(appointments.map(appointment => 
        appointment.id === currentAppointmentId 
          ? { ...appointment, date: selectedDate, status: 'scheduled' } 
          : appointment
      ));
      
      toast({
        title: "Appointment Rescheduled",
        description: "The appointment has been rescheduled successfully.",
      });
      
      setIsRescheduleDialogOpen(false);
      setCurrentAppointmentId(null);
    }
  };

  const handleCancel = (appointmentId: string) => {
    if (setAppointments) {
      setAppointments(appointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: 'cancelled' } 
          : appointment
      ));

      toast({
        title: "Appointment Cancelled",
        description: "The appointment has been cancelled successfully.",
      });
    } else {
      toast({
        title: "Cancel Appointment",
        description: "This feature will be available in the next update.",
      });
    }
  };

  return (
    <>
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
                        {appointment.status !== 'cancelled' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleReschedule(appointment.id)}
                            >
                              Reschedule
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-600" 
                              onClick={() => handleCancel(appointment.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === 'cancelled' && (
                          <span className="text-sm text-muted-foreground">No actions available</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Please select a new date and time for this appointment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
            
            <div className="text-center mt-4">
              <CalendarClock className="inline-block mr-2" />
              {selectedDate ? (
                <span>Selected: {format(selectedDate, 'PPP')}</span>
              ) : (
                <span>No date selected</span>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmReschedule} disabled={!selectedDate}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentsList;
