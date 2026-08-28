import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { employee } from "../../db/schema";
import type { CreateEmployee, UpdateEmployee } from "@elysia-monorepo/shared";
import { NotFoundException } from "../../errors/HTTPExceptions/NotFoundException";
import { v7 as uuidv7 } from "uuid";

export const employeeService = {
  list: () => db.select().from(employee),

  getById: async (id: string) => {
    const [row] = await db.select().from(employee).where(eq(employee.id, id));
    if (!row) throw new NotFoundException("employee not found");
    return row;
  },

  create: async (data: CreateEmployee) => {
    const [row] = await db.insert(employee).values({ id: uuidv7(), ...data }).returning();
    return row;
  },

  update: async (id: string, data: UpdateEmployee) => {
    const [row] = await db
      .update(employee)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(employee.id, id))
      .returning();
    if (!row) throw new NotFoundException("employee not found");
    return row;
  },

  remove: async (id: string) => {
    const [row] = await db.delete(employee).where(eq(employee.id, id)).returning();
    if (!row) throw new NotFoundException("employee not found");
    return row;
  }
};
