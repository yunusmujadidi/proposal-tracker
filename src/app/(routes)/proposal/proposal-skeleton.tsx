import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ProposalTableSkeleton = () => {
  return (
    <div className="p-4 m-2">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Proposal</CardTitle>
          <CardDescription>
            Kelola dan review proposal yang masuk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="border rounded-md">
              <div className="h-12 px-4 border-b flex items-center">
                <Skeleton className="h-4 w-full" />
              </div>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 px-4 flex items-center border-b last:border-0"
                >
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
