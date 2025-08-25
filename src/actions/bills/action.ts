import { db } from "@/db";
import { bills as billTable, InsertBill, SelectBill } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Bill } from "@/components/columns"; // Import Bill type

export class BillsAction {
    static async createBill(bill: InsertBill) {
        const data = await db.insert(billTable).values(bill);
        return data;
    }

    static async getBills(): Promise<Bill[]> { // Explicitly define return type
        const bills = await db.select().from(billTable).orderBy(desc(billTable.createdAt));
        return bills.map((bill: SelectBill) => ({
            id: bill.id,
            billNumber: bill.billNumber,
            customerName: bill.customerName,
            date: bill.date,
            phoneNumber: bill.phoneNumber,
            weight: parseFloat(bill.weight), // Convert weight to number
        }));
    }

  static async getBill(billid: string) {
    const data = await db.select().from(billTable).where(eq(billTable.id, billid));
    return data[0];
  }
}