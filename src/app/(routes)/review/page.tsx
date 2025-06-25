import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProposals, getProposalStats } from "@/actions/proposal-actions";
import { Badge } from "@/components/ui/badge";
import { ReviewCard } from "./review-card";
import { Clock, FileSearch, CheckCircle, Eye } from "lucide-react";
import { formatIDR } from "@/lib/utils";

const ReviewPage = async () => {
  const [proposalsResult, statsResult] = await Promise.all([
    getProposals(),
    getProposalStats(),
  ]);

  const { data = [] } = proposalsResult;
  const { data: stats } = statsResult;

  const proposalsToReview = data.filter(
    (proposal) => proposal.status === "PENDING"
  );

  const pendingCount = stats?.pendingCount || 0;
  const pendingAmount = stats?.pendingAmount || 0;
  const surveyCount = stats?.surveyCount || 0;
  const reviewedCount = stats?.reviewedCount || 0;

  return (
    <div className="p-4 m-2 space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Review Proposal
            </h1>
            <p className="text-gray-600 mt-1">
              Kelola dan review proposal yang masuk untuk persetujuan
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-[#FF9500]/10 text-[#FF9500] border-[#FF9500]/20"
            >
              {proposalsToReview.length} Menunggu
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-gray-200 rounded-2xl shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Perlu Review
                </p>
                <p className="text-2xl font-semibold text-[#FF9500]">
                  {pendingCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatIDR(pendingAmount)}
                </p>
              </div>
              <div className="h-12 w-12 bg-[#FF9500]/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#FF9500]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 rounded-2xl shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Perlu Survey
                </p>
                <p className="text-2xl font-semibold text-[#FF9500]">
                  {surveyCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">Survey lapangan</p>
              </div>
              <div className="h-12 w-12 bg-[#FF9500]/10 rounded-full flex items-center justify-center">
                <FileSearch className="h-6 w-6 text-[#FF9500]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 rounded-2xl shadow-sm bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Sudah Review
                </p>
                <p className="text-2xl font-semibold text-[#34C759]">
                  {reviewedCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">Proposal diproses</p>
              </div>
              <div className="h-12 w-12 bg-[#34C759]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-[#34C759]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Section */}
      <Card className="border-gray-200 rounded-2xl shadow-sm bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Eye className="h-5 w-5 text-[#007AFF]" />
            Daftar Review
            {proposalsToReview.length > 0 && (
              <Badge className="bg-[#007AFF]/10 text-[#007AFF] border-[#007AFF]/20">
                {proposalsToReview.length}
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-gray-600">
            Review setiap proposal satu per satu dan tentukan status yang sesuai
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proposalsToReview.length > 0 ? (
              proposalsToReview.map((proposal) => (
                <ReviewCard key={proposal.id} proposal={proposal} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Semua Proposal Sudah Direview
                </p>
                <p className="text-gray-500">
                  Tidak ada proposal yang menunggu review saat ini
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPage;
