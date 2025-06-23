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
import { proposalSchema } from "@/lib/zod-schema";
import { useTransition } from "react";

export const EditProposalSheet = () => {
  const { isOpen, onClose } = useNewProposalSheet();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof proposalSchema>) => {
    console.log(values);
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
          <Button type="submit" form="proposal-form">
            Save changes
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
