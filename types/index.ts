export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone: string;
  dob?: string;
  gender?: string;
  notes?: string;
  status: "active" | "inactive";
}

export interface Appointment {
  id: string;
  patientId: string;
  service: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: string;
  description?: string;
  status: "active" | "inactive";
}

export interface Invoice {
  id: string;
  patientId: string;
  amount: string;
  date: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}