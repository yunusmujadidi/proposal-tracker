import { useForm } from "react-hook-form";
import { z } from "zod";
import { Proposal, ProposalStatus } from "../../../generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Proposal as ProposalType } from "../../../generated/prisma";
import { formatIDR, parseIDR } from "@/lib/utils";
import { ProposalSchema } from "@/lib/zod-schema";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

export const ProposalForm = ({
  onSubmit,
  data,
}: {
  onSubmit: (values: z.infer<typeof ProposalSchema>) => void;
  data?: Proposal;
}) => {
  const form = useForm<z.infer<typeof ProposalSchema>>({
    resolver: zodResolver(ProposalSchema),
    defaultValues: {
      name: data?.name || "",
      notes: data?.notes || "",
      managerDivisionNotes: data?.managerDivisionNotes || "",
      managerAreaNotes: data?.managerAreaNotes || "",
      amount: data?.amount || 0,
      link: data?.link || "",
      status: data?.status || Object.values(ProposalStatus)[0],
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        notes: data.notes || "",
        managerDivisionNotes: data.managerDivisionNotes || "",
        managerAreaNotes: data.managerAreaNotes || "",
        amount: data.amount,
        link: data.link,
        status: data.status,
      });
    }
  }, [data, form]);

  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      <Form {...form}>
        <form
          id="proposal-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Proposal</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Proposal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Dana</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Rp 5.000.000"
                    {...field}
                    value={formatIDR(field.value)}
                    onChange={(e) => field.onChange(parseIDR(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Google Drive</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://drive.google.com/..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status proposal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {Object.values(ProposalStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        <Badge
                          className={getStatusColor(
                            status as ProposalType["status"]
                          )}
                        >
                          {getStatusLabel(status as ProposalType["status"])}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl>
                  <Textarea placeholder="Catatan..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="managerDivisionNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan Manager Divisi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Catatan dari manager divisi..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="managerAreaNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan Manager Area</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Catatan dari manager area..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
