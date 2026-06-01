"use server";

export async function getClinicInfo() {
  // TODO: Connect to database
  return {
    name: "Hopify Clinic",
    phone: "+880 1711-000000",
    address: "123 Medical Street, Dhaka 1200",
  };
}

export async function updateClinicInfo(data: {
  name: string;
  phone: string;
  address: string;
}) {
  // TODO: Connect to database
  return { success: true };
}