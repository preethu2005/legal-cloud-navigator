
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: Date;
  casesCount: number;
}

interface ClientDirectoryProps {
  clients: Client[];
}

const ClientDirectory: React.FC<ClientDirectoryProps> = ({ clients }) => {
  const formatDate = (date: Date) => {
    return format(date, 'PPP');
  };

  return (
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
  );
};

export default ClientDirectory;
