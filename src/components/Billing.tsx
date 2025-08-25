"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  billNumber: z.coerce.number().min(1, { message: "Bill number is required" }),
  customerName: z.string().min(1, { message: "Customer name is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be 10 digits" }),
  weight: z.coerce.number().min(1, { message: "Weight is required" }),
});

export const Billing = () => {
  type BillForm = z.infer<typeof formSchema>;
  const router = useRouter();
  const form = useForm<BillForm>({
    resolver: zodResolver(formSchema) as Resolver<BillForm>,
    defaultValues: {
      billNumber: 0,
      customerName: "",
      date: new Date().toISOString().split("T")[0],
      phoneNumber: "",
      weight: 0,
    },
  });

  const onSubmit: SubmitHandler<BillForm> = async (data) => {
    const res = await fetch("/api/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      form.reset();
      router.push("/dashboard");
    } else {
      alert("Failed to create bill");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center gap-8">
          <FormField
            control={form.control}
            name="billNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Bill Number" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Customer Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Phone Number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField

            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="Weight" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create Bill</Button>
        </form>
      </Form>
    </div>
  );
};
