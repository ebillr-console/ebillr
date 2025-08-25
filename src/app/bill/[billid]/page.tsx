import { Bill } from "@/components/Bill";
import { BillsAction } from "@/actions/bills/action";

export default async function BillPage({ params }: { params: Promise<{ billid: string }> }) {
  const { billid } = await params;
  const bill = await BillsAction.getBill(billid);
  return (
    <div className="">
      <Bill bill={bill} />
    </div>
  );
}
