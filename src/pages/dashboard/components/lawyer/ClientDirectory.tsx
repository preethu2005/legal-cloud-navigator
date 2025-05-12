
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientDirectory;
