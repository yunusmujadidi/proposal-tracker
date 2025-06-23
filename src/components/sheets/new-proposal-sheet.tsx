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
import { useNewProposalSheet } from "@/hooks/use-proposal";
import { Button } from "../ui/button";
import { z } from "zod";
import { ProposalSchema } from "@/lib/zod-schema";
import { useTransition } from "react";
import { createProposal } from "@/actions/proposal-actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const NewProposalSheet = () => {
  const { isOpen, onClose } = useNewProposalSheet();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof ProposalSchema>) => {
    startTransition(async () => {
      try {
        const result = await createProposal(values);

        if (result.success) {
          toast.success("Proposal berhasil dibuat");
          onClose();
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
          <SheetTitle>Add New Proposal</SheetTitle>
          <SheetDescription>
            Fill out the form below to create a new proposal.
          </SheetDescription>
        </SheetHeader>
        <ProposalForm onSubmit={onSubmit} />
        <SheetFooter>
          <Button disabled={isPending} type="submit" form="proposal-form">
            {isPending ? (
              <>
                Membuat...
                <Loader2 className="ml-2 size-4 animate-spin" />
              </>
            ) : (
              "Buat Proposal"
            )}
          </Button>
          <SheetClose asChild>
            <Button disabled={isPending} type="button" variant="outline">
              Tutup
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
