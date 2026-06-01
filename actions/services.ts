"use server";

export async function getServices() {
  // TODO: Connect to database
  return [];
}

export async function createService(data: {
  name: string;
  category: string;
  duration: string;
  price: string;
  description?: string;
}) {
  // TODO: Connect to database
  return { success: true, id: `SRV-${Date.now()}` };
}