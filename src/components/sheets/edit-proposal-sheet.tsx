"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEditProposal } from "@/hooks/use-proposal";

export const EditProposalSheet = () => {
  const { isOpen, onClose } = useEditProposal();
  return (
    <Sheet onOpenChange={onClose} open={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Proposal</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
