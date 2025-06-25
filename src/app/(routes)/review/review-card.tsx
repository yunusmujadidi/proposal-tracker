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
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg leading-tight">
                {proposal.name}
              </CardTitle>
              <Badge className={`${getStatusColor(proposal.status)} shrink-0`}>
                {getStatusLabel(proposal.status)}
              </Badge>
            </div>
            <CardDescription className="flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" />
                {format(proposal.createdAt, "dd MMM yyyy", { locale: id })}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-semibold text-lg">
                  {formatIDR(proposal.amount)}
                </span>
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {proposal.notes && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <Label className="text-sm font-medium text-gray-700">
                Catatan
              </Label>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {proposal.notes}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button variant="outline" size="lg" className="w-full h-12" asChild>
              <a
                href={proposal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Lihat Dokumen
              </a>
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleStatusChange("SURVEY")}
                disabled={proposal.status === "SURVEY" || isPending}
                className="h-12 text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-100 disabled:opacity-50"
              >
                <FileSearch className="h-5 w-5 mr-2" />
                Perlu Survey
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleStatusChange("DISPODIVISI")}
                disabled={proposal.status === "DISPODIVISI" || isPending}
                className="h-12 text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 disabled:opacity-50"
              >
                <Users className="h-5 w-5 mr-2" />
                Disposisi Divisi
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleStatusChange("NOACC")}
                disabled={proposal.status === "NOACC" || isPending}
                className="h-12 text-red-600 border-red-200 bg-red-50 hover:bg-red-100 disabled:opacity-50"
              >
                <XCircle className="h-5 w-5 mr-2" />
                Tolak Proposal
              </Button>
              <Button
                size="lg"
                onClick={() => handleStatusChange("ACC")}
                disabled={proposal.status === "ACC" || isPending}
                className="h-12 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Setujui Proposal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle>Konfirmasi Perubahan Status</DialogTitle>
            <DialogDescription className="space-y-2">
              <span>
                Anda akan mengubah status proposal {proposal.name} menjadi:{" "}
              </span>
              {selectedStatus && (
                <Badge className={`${getStatusColor(selectedStatus)} text-sm`}>
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
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
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
