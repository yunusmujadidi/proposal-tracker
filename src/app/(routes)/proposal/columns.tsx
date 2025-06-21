"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Proposal } from "@/../generated/prisma";

export const columns: ColumnDef<Proposal>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
