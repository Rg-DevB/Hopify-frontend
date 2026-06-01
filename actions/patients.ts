"use server";

export async function getPatients() {
  // TODO: Connect to database
  return [];
}

export async function createPatient(data: {
  name: string;
  email?: string;
  phone: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  insurance?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  allergies?: string;
  antecedents?: string;
  notes?: string;
}) {
  // TODO: Connect to database (Supabase/Prisma)
  console.log("Creating patient:", data);
  return { success: true, id: `PAT-${Math.floor(Math.random() * 9000) + 1000}` };
}