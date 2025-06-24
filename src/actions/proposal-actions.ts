"use server";

import { prisma } from "@/lib/prisma";
import { ProposalSchema } from "@/lib/zod-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const revalidateProposals = async () => {
  revalidatePath("/proposal");
  revalidatePath("/");
  revalidatePath("/review");
};

export const getProposals = async () => {
  try {
    const result = await prisma.proposal.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch data", error);
    return { success: false, error: "Failed to fetch proposals" };
  }
};

export const createProposal = async (data: z.infer<typeof ProposalSchema>) => {
  try {
    const validatedData = ProposalSchema.parse(data);

    const result = await prisma.proposal.create({
      data: validatedData,
    });

    revalidateProposals();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to create proposal:", error);
    return { success: false, error: "Failed to create proposal" };
  }
};

export const deleteProposal = async (id: string) => {
  try {
    const result = await prisma.proposal.delete({
      where: {
        id,
      },
    });

    revalidateProposals();

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to delete proposal:", error);
    return { success: false, error: "Failed to delete proposal" };
  }
};

export const deleteProposals = async (ids: string[]) => {
  try {
    const result = await prisma.proposal.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    revalidateProposals();

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to delete proposals:", error);
    return { success: false, error: "Failed to delete proposals" };
  }
};

export const updateProposal = async (
  id: string,
  data: z.infer<typeof ProposalSchema>
) => {
  try {
    const validatedData = ProposalSchema.parse(data);
    const result = await prisma.proposal.update({
      data: validatedData,
      where: {
        id,
      },
    });
    revalidateProposals();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update proposal:", error);
    return { success: false, error: "Failed to update proposal" };
  }
};
