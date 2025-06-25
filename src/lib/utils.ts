import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Proposal } from "../../generated/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIDR(amount: number): string {
  if (isNaN(amount)) {
    return "";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseIDR(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
}

export const getStatusColor = (status: Proposal["status"]) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "SURVEY":
      return "bg-orange-100 text-orange-800";
    case "ACC":
      return "bg-green-100 text-green-800";
    case "NOACC":
      return "bg-red-100 text-red-800";
    case "ARSIP":
      return "bg-gray-100 text-gray-800";
    case "DISPODIVISI":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusLabel = (status: Proposal["status"]) => {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "SURVEY":
      return "Butuh Survey";
    case "ACC":
      return "Disetujui";
    case "NOACC":
      return "Ditolak";
    case "ARSIP":
      return "Arsip";
    case "DISPODIVISI":
      return "Disposisi Divisi";
    default:
      return status;
  }
};
