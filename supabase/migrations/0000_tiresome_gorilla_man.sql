CREATE TABLE "bills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bill_number" integer NOT NULL,
	"customer_name" text NOT NULL,
	"date" text NOT NULL,
	"phone_number" text NOT NULL,
	"weight" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
