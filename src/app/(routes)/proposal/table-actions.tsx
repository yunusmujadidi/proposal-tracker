import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useEditProposalSheet,
  useViewProposalDialog,
} from "@/hooks/use-proposal";
import { MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react";
import { Proposal } from "../../../../generated/prisma";

export const ProposalTableAction = (proposal: Proposal) => {
  const { onOpen: onOpenEdit } = useEditProposalSheet();
  const { onOpen: onOpenView } = useViewProposalDialog();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onOpenEdit(proposal)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onOpenView(proposal)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Lihat Detail
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Trash2 className="mr-2 h-4 w-4" />
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
