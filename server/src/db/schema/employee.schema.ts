import { pgTable, uuid, varchar, date, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const employeeStatusEnum = pgEnum("employee_status", ["active", "inactive", "resigned"]);

export const employee = pgTable("employee", {
  id: uuid("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  position: varchar("position", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }).notNull(),
  joinDate: date("join_date").notNull(),
  status: employeeStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
