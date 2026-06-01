"use server";

export async function getSettings() {
  // TODO: Connect to database
  return {
    clinicName: "Hopify Clinic",
    timezone: "Asia/Dhaka",
  };
}

export async function updateSettings(data: Record<string, unknown>) {
  // TODO: Connect to database
  return { success: true };
}