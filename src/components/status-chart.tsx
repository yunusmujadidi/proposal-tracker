"use client";

import { Proposal, ProposalStatus } from "../../generated/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getStatusLabel } from "@/lib/const";

interface StatusChartProps {
  proposals: Proposal[];
}

export const StatusChart = ({ proposals }: StatusChartProps) => {
  const statusCounts = proposals.reduce((acc, proposal) => {
    acc[proposal.status] = (acc[proposal.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    label: getStatusLabel(status as ProposalStatus),
  }));

  const chartConfig: ChartConfig = {
    count: {
      label: "Jumlah",
    },
    PENDING: {
      label: "Pending",
      color: "#fbbf24",
    },
    SURVEY: {
      label: "Survey",
      color: "#fb923c",
    },
    ACC: {
      label: "Disetujui",
      color: "#22c55e",
    },
    NOACC: {
      label: "Ditolak",
      color: "#ef4444",
    },
    DISPODIVISI: {
      label: "Disposisi",
      color: "#3b82f6",
    },
    ARSIP: {
      label: "Arsip",
      color: "#6b7280",
    },
  };

  const COLORS = {
    PENDING: "#fbbf24",
    SURVEY: "#fb923c",
    ACC: "#22c55e",
    NOACC: "#ef4444",
    DISPODIVISI: "#3b82f6",
    ARSIP: "#6b7280",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Proposal</CardTitle>
        <CardDescription>Distribusi status semua proposal</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                label={({ label, count }) => `${label}: ${count}`}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.status as keyof typeof COLORS]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
