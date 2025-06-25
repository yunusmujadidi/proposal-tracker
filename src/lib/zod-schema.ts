import { z } from "zod";
import { ProposalStatus } from "../../generated/prisma";

export const ProposalSchema = z.object({
  name: z.string().min(3, "Nama harus lebih dari 3 huruf"),
  notes: z.string().optional(),
  managerDivisionNotes: z.string().optional(),
  managerAreaNotes: z.string().optional(),
  amount: z.coerce.number().min(1, "Nominal tidak boleh kosong"),
  link: z.string().min(1, "Link google drive proposal tidak boleh kosong"),
  status: z.nativeEnum(ProposalStatus),
});
