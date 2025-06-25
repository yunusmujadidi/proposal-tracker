"use client";

import { Proposal } from "../../generated/prisma";
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
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatIDR } from "@/lib/utils";

interface AmountChartProps {
  proposals: Proposal[];
}

export const AmountChart = ({ proposals }: AmountChartProps) => {
  // Group proposals by month
  const monthlyData = proposals.reduce((acc, proposal) => {
    const month = format(proposal.createdAt, "MMM yyyy", { locale: id });
    if (!acc[month]) {
      acc[month] = { month, total: 0, count: 0 };
    }
    acc[month].total += proposal.amount;
    acc[month].count += 1;
    return acc;
  }, {} as Record<string, { month: string; total: number; count: number }>);

  const chartData = Object.values(monthlyData).sort(
    (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
  );

  const chartConfig: ChartConfig = {
    total: {
      label: "Total Dana",
      color: "#3b82f6",
    },
    count: {
      label: "Jumlah Proposal",
      color: "#10b981",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dana Proposal Per Bulan</CardTitle>
        <CardDescription>Total dana yang diajukan setiap bulan</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="month"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatIDR(value)}
              />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [
                      name === "total" ? formatIDR(value as number) : value,
                      name === "total" ? "Total Dana" : "Jumlah",
                    ]}
                  />
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
