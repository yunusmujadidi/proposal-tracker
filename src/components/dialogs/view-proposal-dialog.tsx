import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useViewProposalDialog } from "@/hooks/use-proposal";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusLabel } from "@/lib/const";
import { formatIDR } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const ViewProposalDialog = () => {
  const { isOpen, onClose, proposal } = useViewProposalDialog();

  if (!proposal) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{proposal.name}</DialogTitle>
          <DialogDescription>
            Detail proposal yang diajukan pada{" "}
            {format(new Date(proposal.createdAt), "dd MMMM yyyy", {
              locale: id,
            })}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Status</h3>
            <Badge className={getStatusColor(proposal.status)}>
              {getStatusLabel(proposal.status)}
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold">Jumlah Dana</h3>
            <p>{formatIDR(proposal.amount)}</p>
          </div>
          <div>
            <h3 className="font-semibold">Link Dokumen</h3>
            <a
              href={proposal.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Lihat Dokumen
            </a>
          </div>
          {proposal.notes && (
            <div>
              <h3 className="font-semibold">Catatan</h3>
              <p className="text-sm text-gray-500">{proposal.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
