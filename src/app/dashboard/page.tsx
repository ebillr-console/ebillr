import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BillsAction } from "@/actions/bills/action";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const bills = await BillsAction.getBills();

  return (
    <div className="px-5">
      <DataTable columns={columns} data={bills} />
  </div>
  )
}