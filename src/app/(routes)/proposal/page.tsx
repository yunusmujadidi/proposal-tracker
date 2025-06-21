import { columns } from "./columns";
import { DataTable } from "./data-table";
import proposalData from "@/data/proposals.json";

const ProposalPage = () => {
  // Transform the JSON data to match the expected types
  const data = proposalData.map((proposal) => ({
    ...proposal,
    status: proposal.status as any, // Type assertion for status enum
    createdAt: new Date(proposal.createdAt),
    updatedAt: new Date(proposal.updatedAt),
  }));

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ProposalPage;
