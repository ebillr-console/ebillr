import { db } from "@/db";
import { bills as billTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Session } from "next-auth";
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
  let session: Session | null = null;
  try {
    session = await auth();
  } catch {
    return NextResponse.json(
      { error: "Auth misconfigured or failed" },
      { status: 500 }
    );
  }

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  let limiterOk = true;
  try {
    const { success } = await rateLimiter.limit(ip);
    limiterOk = success;
  } catch {
    limiterOk = true;
  }

  if (!limiterOk) {
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
  let session: Session | null = null;
  try {
    session = await auth();
  } catch {
    return NextResponse.json(
      { error: "Auth misconfigured or failed" },
      { status: 500 }
    );
  }

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await db.select().from(billTable);
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch bills" },
      { status: 500 }
    );
  }
}
