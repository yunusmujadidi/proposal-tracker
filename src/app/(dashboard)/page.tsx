import { getProposals } from "@/actions/proposal-actions";
import { DashboardStats } from "@/components/dashboard-stats";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
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
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin size-5 h-screen" />
        </div>
      }
    >
      <Home />
    </Suspense>
  );
}
