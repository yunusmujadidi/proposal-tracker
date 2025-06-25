"use client";

import { ViewProposalDialog } from "@/components/dialogs/view-proposal-dialog";
import { useEffect, useState } from "react";

export const DialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ViewProposalDialog />
    </>
  );
};
