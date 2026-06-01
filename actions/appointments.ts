"use server";

export async function getAppointments() {
  // TODO: Connect to database
  return [];
}

export async function createAppointment(data: {
  patient: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}) {
  // TODO: Connect to database
  return { success: true, id: `APT-${Date.now()}` };
}

export async function updateAppointmentStatus(id: string, status: string) {
  // TODO: Connect to database
  return { success: true };
}