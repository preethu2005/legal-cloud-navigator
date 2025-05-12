
export enum CaseStatus {
  NEW = "new",
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: Date;
  casesCount: number;
}

export interface LegalCase {
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

export interface Appointment {
  id: string;
  title: string;
  lawyerName: string;
  date: Date;
  status: 'scheduled' | 'confirmed' | 'cancelled';
  clientName?: string;
}
