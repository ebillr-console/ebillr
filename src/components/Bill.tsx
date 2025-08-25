"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./ui/card";

const BillDetails = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <span className="">{label}:</span>
      <span className="">{label === "Weight" ? value + " ml" : value}</span>
    </div>
  );
};

export type BillData = {
  id: string;
  billNumber: number;
  customerName: string;
  date: string;
  phoneNumber: string;
  weight: number | string;
};

export const Bill = ({ bill }: { bill: BillData }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    onPrintError: (error) => console.log(error),
  });
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <Card
        className="flex flex-col items-center justify-center gap-2 w-[350px] px-10 font-bank-printer tracking-[-0.1em] border-0 shadow-none"
        ref={componentRef}
      >
        <CardHeader className="flex flex-col items-center justify-center w-full px-0">
          <CardTitle className="text-2xl font-semibold tracking-tighter leading-tight w-full text-center">
            Maa Manasha Die Cutting Center
          </CardTitle>
          <CardDescription className="text-center text-black">
            <p>Plot No - G/59</p>
            <p>C.D.A., Sector - 7</p>
            <p>Cuttack, Odisha</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col border-y-2 py-4 border-dashed max-w-2xs w-full px-0">
          <BillDetails value={bill?.billNumber.toString()} label="Bill No" />
          <BillDetails value={bill?.customerName} label="Customer" />
          <BillDetails value={bill?.date} label="Date" />
          <BillDetails value={bill?.phoneNumber.toString()} label="Phone" />
          <BillDetails value={bill?.weight.toString()} label="Weight" />
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center w-full px-0">
          <p className="text-sm font-medium">Thank you & Visit Again..!!!</p>
        </CardFooter>
      </Card>
      <Button onClick={handlePrint}>Print</Button>
    </div>
  );
};
