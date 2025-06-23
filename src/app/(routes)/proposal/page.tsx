import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getProposals } from "@/actions/proposal-actions";
import { Suspense } from "react";
import { ProposalTableSkeleton } from "./proposal-skeleton";

const ReviewPage = async () => {
  const { data = [] } = await getProposals();

  return (
    <Suspense fallback={<ProposalTableSkeleton />}>
      <div className="p-4 m-2">
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
    </Suspense>
  );
};

export default ReviewPage;
