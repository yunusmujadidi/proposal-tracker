"use client";

import { useState, useTransition, useRef, useCallback } from "react";
import { Proposal, ProposalStatus } from "../../../../generated/prisma";
import { Card } from "@/components/ui/card";
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
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { updateProposalStatus } from "@/actions/proposal-actions";
import { formatIDR, getStatusColor, getStatusLabel } from "@/lib/utils";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleToggleExpanded = useCallback(() => {
    const currentScrollY = window.scrollY;
    const cardElement = cardRef.current;

    if (cardElement) {
      const cardRect = cardElement.getBoundingClientRect();
      const cardTop = cardRect.top + currentScrollY;

      setIsExpanded((prev) => {
        const newExpanded = !prev;

        // Use setTimeout to ensure the DOM has updated before adjusting scroll
        setTimeout(() => {
          // On mobile, keep the card at the same relative position
          if (window.innerWidth < 768) {
            window.scrollTo({
              top: cardTop - 20, // 20px offset from top
              behavior: "smooth",
            });
          }
        }, 0);

        return newExpanded;
      });
    } else {
      setIsExpanded((prev) => !prev);
    }
  }, []);

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

  const daysSinceSubmission = Math.floor(
    (Date.now() - new Date(proposal.createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Card
        className="border-gray-200 bg-white hover:border-gray-300 transition-colors rounded-2xl shadow-sm"
        ref={cardRef}
      >
        {/* Compact Header - Key Info at Glance */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-2">
                {proposal.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(proposal.createdAt, "dd MMM yyyy", { locale: id })}
                </span>
                <span>{daysSinceSubmission} hari lalu</span>
              </div>
            </div>

            {/* Amount & Status */}
            <div className="flex flex-col sm:items-end gap-2">
              <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900">
                {formatIDR(proposal.amount)}
              </div>
              <Badge
                className={`${getStatusColor(proposal.status)} text-sm w-fit`}
              >
                {getStatusLabel(proposal.status)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions - Most Important */}
        <div className="p-4 sm:p-6 bg-gray-50/50 border-b border-gray-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("ACC")}
              disabled={proposal.status === "ACC" || isPending}
              className="h-10 sm:h-12 text-[#34C759] border-[#34C759]/30 bg-[#34C759]/5 hover:bg-[#34C759]/10 hover:border-[#34C759]/50 disabled:opacity-50 rounded-xl font-medium"
            >
              <CheckCircle className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Setujui</span>
              <span className="sm:hidden">ACC</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("NOACC")}
              disabled={proposal.status === "NOACC" || isPending}
              className="h-10 sm:h-12 text-[#FF3B30] border-[#FF3B30]/30 bg-[#FF3B30]/5 hover:bg-[#FF3B30]/10 hover:border-[#FF3B30]/50 disabled:opacity-50 rounded-xl font-medium"
            >
              <XCircle className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Tolak</span>
              <span className="sm:hidden">NO</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("SURVEY")}
              disabled={proposal.status === "SURVEY" || isPending}
              className="h-10 sm:h-12 text-[#FF9500] border-[#FF9500]/30 bg-[#FF9500]/5 hover:bg-[#FF9500]/10 hover:border-[#FF9500]/50 disabled:opacity-50 rounded-xl font-medium"
            >
              <FileSearch className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Survey</span>
              <span className="sm:hidden">SUR</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("DISPODIVISI")}
              disabled={proposal.status === "DISPODIVISI" || isPending}
              className="h-10 sm:h-12 text-[#007AFF] border-[#007AFF]/30 bg-[#007AFF]/5 hover:bg-[#007AFF]/10 hover:border-[#007AFF]/50 disabled:opacity-50 rounded-xl font-medium"
            >
              <Users className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Disposisi</span>
              <span className="sm:hidden">DIS</span>
            </Button>
          </div>
        </div>

        {/* Expandable Details */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleExpanded}
              className="text-gray-600 hover:text-gray-900 p-0 h-auto font-normal hover:bg-transparent transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Sembunyikan Detail</span>
                  <span className="sm:hidden">Tutup</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Lihat Detail</span>
                  <span className="sm:hidden">Detail</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-[#007AFF] border-[#007AFF]/30 bg-[#007AFF]/5 hover:bg-[#007AFF]/10 hover:border-[#007AFF]/50 rounded-xl"
            >
              <a
                href={proposal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Dokumen</span>
                <span className="sm:hidden">Doc</span>
              </a>
            </Button>
          </div>

          {/* Collapsible Content - Improved mobile handling */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {isExpanded && (
              <div className="mt-4 space-y-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2">
                {proposal.notes && (
                  <div className="bg-[#007AFF]/5 p-4 rounded-xl border border-[#007AFF]/20">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-[#007AFF] mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#007AFF] mb-2">
                          Catatan Pengaju
                        </p>
                        <div className="bg-white p-3 rounded-lg border border-[#007AFF]/10 max-h-32 overflow-y-auto">
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                            {proposal.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded-xl">
                  <p>
                    <span className="font-medium">ID:</span> {proposal.id}
                  </p>
                  <p>
                    <span className="font-medium">Dibuat:</span>{" "}
                    {format(proposal.createdAt, "dd MMMM yyyy, HH:mm", {
                      locale: id,
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[400px] mx-4 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Konfirmasi Keputusan
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              <div className="space-y-2 mt-2">
                <p>
                  <span className="text-gray-500">Proposal:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {proposal.name}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Jumlah:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {formatIDR(proposal.amount)}
                  </span>
                </p>
                {selectedStatus && (
                  <p>
                    <span className="text-gray-500">Status:</span>{" "}
                    <Badge
                      className={`${getStatusColor(
                        selectedStatus
                      )} text-sm ml-2`}
                    >
                      {getStatusLabel(selectedStatus)}
                    </Badge>
                  </p>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-gray-700"
              >
                Catatan Review
              </Label>
              <Textarea
                id="notes"
                placeholder="Tambahkan alasan atau catatan keputusan..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={3}
                className="mt-2 text-sm rounded-xl border-gray-300 focus:border-[#007AFF] focus:ring-[#007AFF]/20"
              />
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={isPending}
              className="rounded-xl border-gray-300"
            >
              Batal
            </Button>
            <Button
              onClick={confirmStatusChange}
              disabled={isPending}
              className="bg-[#007AFF] hover:bg-[#007AFF]/90 text-white rounded-xl"
            >
              {isPending ? "Memproses..." : "Konfirmasi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
