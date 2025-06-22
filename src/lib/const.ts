import { Book, BookCopyIcon, FileText, LayoutDashboard } from "lucide-react";

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
