import { db } from "@/db";
import { bills as billTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

import { rateLimiter } from "@/lib/rate-limit";

const billSchema = z.object({
  billNumber: z.number().int().positive(),
  customerName: z.string().min(1).max(200),
  date: z.string().min(1).max(50),
  phoneNumber: z.string().min(5).max(30),
  weight: z.string().min(1).max(50),
});

export async function POST(request: NextRequest) {
  // Require authenticated session
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await rateLimiter.limit(ip);

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Validate content type
  const contentType = request.headers.get("content-type") || "";
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Unsupported Media Type" },
      { status: 415 }
    );
  }

  try {
    const body = await request.json();
    const parsed = billSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { billNumber, customerName, date, phoneNumber, weight } = parsed.data;

    const newBill = await db.insert(billTable).values({
      billNumber,
      customerName,
      date,
      phoneNumber,
      weight,
    });

    return NextResponse.json({ success: true, data: newBill }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create bill" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await db.select().from(billTable);
  return NextResponse.json({ success: true, data });
}
