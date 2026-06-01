import { z } from "zod";

export const appointmentSchema = z.object({
  patient: z.string().min(1),
  service: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  notes: z.string().optional(),
});

export const patientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1),
  dob: z.string().optional(),
  gender: z.string().optional(),
  notes: z.string().optional(),
});

export const serviceSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  duration: z.string().min(1),
  price: z.string().min(1),
  description: z.string().optional(),
});