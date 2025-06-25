import { Proposal } from "../../generated/prisma";
import { CheckCircle2, Clock2, FileText, DollarSign } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

interface DashboardStats {
  totalProposals: number;
  pendingCount: number;
  approvedCount: number;
  totalAmount: number;
  approvedAmount: number;
}

interface DashboardStatsProps {
  proposals: Proposal[];
  stats?: DashboardStats;
}

export const DashboardStats = ({ proposals, stats }: DashboardStatsProps) => {
  const totalProposals = stats?.totalProposals || proposals.length;
  const pendingCount =
    stats?.pendingCount ||
    proposals.filter((p) => p.status === "PENDING").length;
  const approvedCount =
    stats?.approvedCount || proposals.filter((p) => p.status === "ACC").length;
  const totalAmount =
    stats?.totalAmount || proposals.reduce((sum, p) => sum + p.amount, 0);
  const approvedAmount =
    stats?.approvedAmount ||
    proposals
      .filter((p) => p.status === "ACC")
      .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-gray-200 rounded-2xl bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Proposal
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalProposals}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatIDR(totalAmount)}
              </p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending */}
      <Card className="border-gray-200 rounded-2xl bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Menunggu Review
              </p>
              <p className="text-2xl font-semibold text-[#FF9500]">
                {pendingCount}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Perlu ditindaklanjuti
              </p>
            </div>
            <div className="h-12 w-12 bg-[#FF9500]/10 rounded-full flex items-center justify-center">
              <Clock2 className="h-6 w-6 text-[#FF9500]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approved */}
      <Card className="border-gray-200 rounded-2xl bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Disetujui</p>
              <p className="text-2xl font-semibold text-[#34C759]">
                {approvedCount}
              </p>
              <p className="text-xs text-gray-500 mt-1">Proposal diterima</p>
            </div>
            <div className="h-12 w-12 bg-[#34C759]/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-[#34C759]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approved Amount */}
      <Card className="border-gray-200 rounded-2xl bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Dana Disetujui
              </p>
              <p className="text-xl font-semibold text-[#34C759]">
                {formatIDR(approvedAmount)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Total dana disalurkan
              </p>
            </div>
            <div className="h-12 w-12 bg-[#34C759]/10 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-[#34C759]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
