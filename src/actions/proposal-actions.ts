"use server";

import { prisma } from "@/lib/prisma";
import { ProposalSchema } from "@/lib/zod-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ProposalStatus } from "../../generated/prisma";

export const revalidateProposals = async () => {
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

export const updateProposalStatus = async (
  id: string,
  status: ProposalStatus,
  notes?: string
) => {
  try {
    const data: { status: ProposalStatus; notes?: string } = {
      status,
    };

    const trimmedNotes = notes?.trim();
    if (trimmedNotes) {
      data.notes = trimmedNotes;
    }

    const result = await prisma.proposal.update({
      data,
      where: {
        id,
      },
    });
    revalidateProposals();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update proposal status:", error);
    return { success: false, error: "Failed to update proposal status" };
  }
};

export const getProposalStats = async () => {
  try {
    // Get counts by status
    const statusCounts = await prisma.proposal.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      },
    });

    // Transform the results into a more usable format
    const stats = statusCounts.reduce((acc, item) => {
      acc[item.status] = {
        count: item._count.id,
        totalAmount: item._sum.amount || 0,
      };
      return acc;
    }, {} as Record<string, { count: number; totalAmount: number }>);

    // Calculate additional metrics
    const pendingCount = stats.PENDING?.count || 0;
    const pendingAmount = stats.PENDING?.totalAmount || 0;
    const surveyCount = stats.SURVEY?.count || 0;
    const reviewedCount =
      (stats.ACC?.count || 0) +
      (stats.NOACC?.count || 0) +
      (stats.DISPODIVISI?.count || 0) +
      (stats.SURVEY?.count || 0);

    return {
      success: true,
      data: {
        pendingCount,
        pendingAmount,
        surveyCount,
        reviewedCount,
        statusBreakdown: stats,
      },
    };
  } catch (error) {
    console.error("Failed to fetch proposal stats:", error);
    return { success: false, error: "Failed to fetch proposal stats" };
  }
};
