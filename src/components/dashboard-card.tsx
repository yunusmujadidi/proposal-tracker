import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Icon, LucideIcon, LucideProps } from "lucide-react";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  number: number;
  description: string;
}

export const DashboardCard = ({
  title,
  icon: Icon,
  number,
  description,
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div>{title}</div>
            <div className="text-muted-foreground">
              <Icon className="h-4 w-4" />
            </div>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">{number}</p>
      </CardContent>
    </Card>
  );
};
