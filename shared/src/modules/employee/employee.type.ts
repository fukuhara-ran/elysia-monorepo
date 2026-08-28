import { z } from "zod";

export const employeeSchema = z.object({
  id: z.uuid(),
  fullName: z.string().min(1).max(255),
  email: z.email(),
  position: z.string().min(1),
  department: z.string().min(1),
  joinDate: z.iso.date(),
  status: z.enum(["active", "inactive", "resigned"]),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
});

export const createEmployeeSchema = employeeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export type Employee = z.infer<typeof employeeSchema>;
export type CreateEmployee = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployee = z.infer<typeof updateEmployeeSchema>;
