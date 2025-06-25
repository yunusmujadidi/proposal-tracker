import { BookCopyIcon, FileText, LayoutDashboard } from "lucide-react";
import { Proposal } from "../../generated/prisma";

export const navigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Proposal",
    url: "/proposal",
    icon: BookCopyIcon,
  },
  {
    title: "Review Proposal",
    url: "/review",
    icon: FileText,
  },
];

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
