import { Proposal } from "../../generated/prisma";
import { DashboardCard } from "./dashboard-card";
import { CheckCircle2, Clock2, FileText, DollarSign } from "lucide-react";
import { formatIDR } from "@/lib/utils";

interface DashboardStatsProps {
  proposals: Proposal[];
}

export const DashboardStats = ({ proposals }: DashboardStatsProps) => {
  const totalProposals = proposals.length;
  const pendingCount = proposals.filter((p) => p.status === "PENDING").length;
  const approvedCount = proposals.filter((p) => p.status === "ACC").length;
  const totalAmount = proposals.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard
        title="Total Proposal"
        description="Jumlah keseluruhan proposal"
        icon={FileText}
        number={totalProposals}
      />
      <DashboardCard
        title="Menunggu Review"
        description="Proposal yang belum direview"
        icon={Clock2}
        number={pendingCount}
      />
      <DashboardCard
        title="Disetujui"
        description="Proposal yang sudah disetujui"
        icon={CheckCircle2}
        number={approvedCount}
      />
      <DashboardCard
        title="Total Dana"
        description="Total dana yang diajukan"
        icon={DollarSign}
        number={formatIDR(totalAmount)}
      />
    </div>
  );
};
