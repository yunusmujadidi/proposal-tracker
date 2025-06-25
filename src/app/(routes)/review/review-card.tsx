"use client";

import { useState, useTransition } from "react";
import { Proposal, ProposalStatus } from "../../../../generated/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  XCircle,
  FileSearch,
  Users,
  ExternalLink,
  Calendar,
  DollarSign,
} from "lucide-react";
import { getStatusColor, getStatusLabel } from "@/lib/const";
import { updateProposalStatus } from "@/actions/proposal-actions";
import { formatIDR } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";

interface ReviewCardProps {
  proposal: Proposal;
}

export const ReviewCard = ({ proposal }: ReviewCardProps) => {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ProposalStatus | null>(
    null
  );
  const [reviewNotes, setReviewNotes] = useState("");

  const handleStatusChange = (newStatus: ProposalStatus) => {
    setSelectedStatus(newStatus);
    setShowDialog(true);
  };

  const confirmStatusChange = () => {
    if (!selectedStatus) return;

    startTransition(async () => {
      try {
        const result = await updateProposalStatus(
          proposal.id,
          selectedStatus,
          reviewNotes
        );
        if (result.success) {
          toast.success(
            `Proposal berhasil ${getStatusLabel(selectedStatus).toLowerCase()}`
          );
          setShowDialog(false);
          setReviewNotes("");
          setSelectedStatus(null);
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("Terjadi kesalahan tidak terduga");
        console.error(error);
      }
    });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{proposal.name}</CardTitle>
              <CardDescription className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(proposal.createdAt, "dd MMM yyyy", { locale: id })}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {formatIDR(proposal.amount)}
                </span>
              </CardDescription>
            </div>
            <Badge className={getStatusColor(proposal.status)}>
              {getStatusLabel(proposal.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {proposal.notes && (
            <div>
              <Label className="text-sm font-medium">Catatan</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {proposal.notes}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" size="sm" asChild>
              <a
                href={proposal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Lihat Dokumen
              </a>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("SURVEY")}
                disabled={proposal.status === "SURVEY" || isPending}
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                <FileSearch className="h-4 w-4 mr-1" />
                Survey
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("DISPODIVISI")}
                disabled={proposal.status === "DISPODIVISI" || isPending}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Users className="h-4 w-4 mr-1" />
                Disposisi
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("NOACC")}
                disabled={proposal.status === "NOACC" || isPending}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Tolak
              </Button>
              <Button
                size="sm"
                onClick={() => handleStatusChange("ACC")}
                disabled={proposal.status === "ACC" || isPending}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Setujui
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Perubahan Status</DialogTitle>
            <DialogDescription>
              Anda akan mengubah status proposal {proposal.name} menjadi
              {selectedStatus && (
                <Badge className={getStatusColor(selectedStatus)}>
                  {getStatusLabel(selectedStatus)}
                </Badge>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="notes">Catatan Review (Opsional)</Label>
              <Textarea
                id="notes"
                placeholder="Tambahkan catatan untuk keputusan ini..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={confirmStatusChange}
              disabled={isPending}
            >
              {isPending ? "Memproses..." : "Konfirmasi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
