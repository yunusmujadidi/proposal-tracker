"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewProposal } from "@/hooks/use-proposal";

export const NewProposalSheet = () => {
  const { isOpen, onClose } = useNewProposal();
  return (
    <Sheet onOpenChange={onClose} open={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tambah Proposal</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
