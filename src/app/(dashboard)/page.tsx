import { getProposals } from "@/actions/proposal-actions";
import { DashboardStats } from "@/components/dashboard-stats";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { ProposalTableSkeleton } from "@/components/table/proposal-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

const Home = async () => {
  const { data = [] } = await getProposals();

  return (
    <div className="m-2 p-4 space-y-6">
      <DashboardStats proposals={data} />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Proposal</CardTitle>
          <CardDescription>
            Kelola dan review proposal yang masuk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<ProposalTableSkeleton />}>
      <Home />
    </Suspense>
  );
}
