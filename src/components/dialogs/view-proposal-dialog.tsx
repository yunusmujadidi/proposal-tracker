import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useViewProposalDialog } from "@/hooks/use-proposal";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { formatIDR } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ExternalLink,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const ViewProposalDialog = () => {
  const { isOpen, onClose, proposal } = useViewProposalDialog();

  if (!proposal) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
        <DialogHeader className="pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900 pr-8">
            {proposal.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Detail proposal yang diajukan pada{" "}
            {format(new Date(proposal.createdAt), "dd MMMM yyyy", {
              locale: id,
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
          {/* Status Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Status</h3>
                <Badge className={`${getStatusColor(proposal.status)} mt-1`}>
                  {getStatusLabel(proposal.status)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Amount Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Jumlah Dana</h3>
                <p className="text-lg font-bold text-green-600 mt-1">
                  {formatIDR(proposal.amount)}
                </p>
              </div>
            </div>
          </div>

          {/* Document Link Section */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg">
                <ExternalLink className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Dokumen</h3>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300"
                >
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
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {proposal.notes && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shrink-0">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-2">Catatan</h3>
                  <div className="bg-white p-3 rounded-lg border border-blue-100 max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                      {proposal.notes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manager Division Notes Section */}
          {proposal.managerDivisionNotes && (
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shrink-0">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Catatan Manager Divisi
                  </h3>
                  <div className="bg-white p-3 rounded-lg border border-orange-100 max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                      {proposal.managerDivisionNotes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manager Area Notes Section */}
          {proposal.managerAreaNotes && (
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shrink-0">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Catatan Manager Area (Keputusan Akhir)
                  </h3>
                  <div className="bg-white p-3 rounded-lg border border-green-100 max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                      {proposal.managerAreaNotes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Division Manager Notes Section */}
          {proposal.divisionManagerNotes && (
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shrink-0">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Catatan Division Manager
                  </h3>
                  <div className="bg-white p-3 rounded-lg border border-purple-100 max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                      {proposal.divisionManagerNotes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Division Area Notes Section */}
          {proposal.divisionAreaNotes && (
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shrink-0">
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Catatan Division Area
                  </h3>
                  <div className="bg-white p-3 rounded-lg border border-indigo-100 max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                      {proposal.divisionAreaNotes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 space-y-1">
              <p>
                <span className="font-medium">ID Proposal:</span> {proposal.id}
              </p>
              <p>
                <span className="font-medium">Terakhir diperbarui:</span>{" "}
                {format(new Date(proposal.updatedAt), "dd MMMM yyyy, HH:mm", {
                  locale: id,
                })}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
