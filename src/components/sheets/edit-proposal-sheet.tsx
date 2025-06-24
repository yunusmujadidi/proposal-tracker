"use client";

import { ProposalForm } from "@/components/forms/proposal-form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEditProposalSheet } from "@/hooks/use-proposal";
import { Button } from "../ui/button";
import { z } from "zod";
import { ProposalSchema } from "@/lib/zod-schema";
import { useTransition } from "react";
import { updateProposal } from "@/actions/proposal-actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const EditProposalSheet = () => {
  const { isOpen, onClose, proposal } = useEditProposalSheet();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof ProposalSchema>) => {
    if (!proposal?.id) return;
    startTransition(async () => {
      try {
        const result = await updateProposal(proposal.id, values);
        if (result.success) {
          onClose();
          toast.success("Proposal berhasil diedit");
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <Sheet onOpenChange={onClose} open={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Proposal</SheetTitle>
          <SheetDescription>
            Fill out the form below to create a new proposal.
          </SheetDescription>
        </SheetHeader>
        {proposal && <ProposalForm onSubmit={onSubmit} data={proposal} />}
        <SheetFooter>
          <Button disabled={isPending} type="submit" form="proposal-form">
            {isPending ? (
              <>
                Menyimpan Perubahan...
                <Loader2 className="size-4 animate-spin ml-2" />
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
