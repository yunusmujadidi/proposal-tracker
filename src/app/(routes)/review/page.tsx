import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProposals } from "@/actions/proposal-actions";
import { Badge } from "@/components/ui/badge";
import { ReviewCard } from "./review-card";

const ReviewPage = async () => {
  const { data = [] } = await getProposals();

  const proposalsToReview = data.filter(
    (proposal) => proposal.status === "PENDING"
  );
  const pendingCount = data.filter(
    (proposal) => proposal.status === "PENDING"
  ).length;
  const surveyCount = data.filter(
    (proposal) => proposal.status === "SURVEY"
  ).length;
  const reviewedCount = data.filter(
    (proposal) =>
      proposal.status === "ACC" ||
      proposal.status === "NOACC" ||
      proposal.status === "DISPODIVISI" ||
      proposal.status === "SURVEY"
  ).length;

  return (
    <div className="p-4 m-2 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Proposal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{proposalsToReview.length}</div>
            <p className="text-xs text-muted-foreground">
              Proposal yang perlu direview
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingCount}
            </div>
            <p className="text-xs text-muted-foreground">Menunggu review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Butuh Survey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {surveyCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Memerlukan survey lapangan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sudah Direview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reviewedCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Proposal yang sudah diproses
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Review Proposal
            <Badge variant="secondary">{proposalsToReview.length}</Badge>
          </CardTitle>
          <CardDescription>
            Review setiap proposal satu per satu dan ubah status sesuai
            keputusan Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {proposalsToReview.length > 0 ? (
              proposalsToReview.map((proposal) => (
                <ReviewCard key={proposal.id} proposal={proposal} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Tidak ada proposal untuk direview
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
