import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const bills = pgTable("bills", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  billNumber: integer("bill_number").notNull(),
  customerName: text("customer_name").notNull(),
  date: text("date").notNull(),
  phoneNumber: text("phone_number").notNull(),
  weight: text("weight").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type InsertBill = typeof bills.$inferInsert;
export type SelectBill = typeof bills.$inferSelect;