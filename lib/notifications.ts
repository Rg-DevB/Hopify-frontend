// Notification utilities - placeholder
export async function sendEmailNotification(to: string, subject: string, body: string) {
  console.log(`[Notification] Email to ${to}: ${subject}`);
  return { success: true };
}

export async function sendAppointmentReminder(appointmentId: string) {
  console.log(`[Reminder] Sending reminder for appointment ${appointmentId}`);
  return { success: true };
}