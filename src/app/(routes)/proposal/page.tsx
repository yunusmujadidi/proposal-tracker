import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Proposal } from "../../../../generated/prisma";

async function getData(): Promise<Proposal[]> {
  // Dummy data for testing
  return [
    {
      id: "clp1x2y3z4a5b6c7d8e9f0g1",
      name: "Pembangunan Jembatan Penghubung Desa",
      notes:
        "Jembatan untuk menghubungkan dua desa yang terpisah sungai. Estimasi panjang 50 meter.",
      amount: 2500000000,
      link: "https://drive.google.com/proposal/jembatan-desa",
      status: "PENDING",
      createdAt: new Date("2024-01-15T08:30:00Z"),
      updatedAt: new Date("2024-01-15T08:30:00Z"),
    },
    {
      id: "clp2a3b4c5d6e7f8g9h0i1j2",
      name: "Renovasi Sekolah Dasar Negeri 01",
      notes: "Perbaikan atap dan cat ulang 12 ruang kelas",
      amount: 850000000,
      link: "https://docs.google.com/renovasi-sdn01",
      status: "ASSIGNEN_TO_DIVISION",
      createdAt: new Date("2024-01-20T14:15:00Z"),
      updatedAt: new Date("2024-01-22T09:45:00Z"),
    },
    {
      id: "clp3b4c5d6e7f8g9h0i1j2k3",
      name: "Program Beasiswa Mahasiswa Berprestasi",
      notes: null,
      amount: 500000000,
      link: "https://drive.google.com/beasiswa-2024",
      status: "APPROVED",
      createdAt: new Date("2024-02-01T10:00:00Z"),
      updatedAt: new Date("2024-02-05T16:30:00Z"),
    },
    {
      id: "clp4c5d6e7f8g9h0i1j2k3l4",
      name: "Pembangunan Puskesmas Pembantu",
      notes: "Fasilitas kesehatan untuk melayani 3 desa sekitar",
      amount: 1800000000,
      link: "https://docs.google.com/puskesmas-proposal",
      status: "NEEDS_SURVEY",
      createdAt: new Date("2024-02-10T13:20:00Z"),
      updatedAt: new Date("2024-02-12T11:15:00Z"),
    },
    {
      id: "clp5d6e7f8g9h0i1j2k3l4m5",
      name: "Instalasi Jaringan Internet Desa",
      notes: "Pemasangan tower dan jaringan fiber optik untuk 500 KK",
      amount: 750000000,
      link: "https://drive.google.com/internet-desa",
      status: "REJECTED",
      createdAt: new Date("2024-01-25T09:45:00Z"),
      updatedAt: new Date("2024-02-01T14:20:00Z"),
    },
    {
      id: "clp6e7f8g9h0i1j2k3l4m5n6",
      name: "Pembangunan Pasar Tradisional",
      notes: "Pasar dengan 50 kios untuk pedagang lokal",
      amount: 3200000000,
      link: "https://docs.google.com/pasar-tradisional",
      status: "ACHIEVED",
      createdAt: new Date("2023-11-15T16:00:00Z"),
      updatedAt: new Date("2024-01-30T10:45:00Z"),
    },
    {
      id: "clp7f8g9h0i1j2k3l4m5n6o7",
      name: "Program Pelatihan UMKM Digital",
      notes: "Pelatihan untuk 200 pelaku UMKM dalam digitalisasi usaha",
      amount: 300000000,
      link: "https://drive.google.com/pelatihan-umkm",
      status: "ASSIGNEN_TO_DIVISION",
      createdAt: new Date("2024-02-08T11:30:00Z"),
      updatedAt: new Date("2024-02-10T15:00:00Z"),
    },
    {
      id: "clp8g9h0i1j2k3l4m5n6o7p8",
      name: "Pembangunan Gedung Serbaguna",
      notes: null,
      amount: 1500000000,
      link: "https://docs.google.com/gedung-serbaguna",
      status: "CANCELLED",
      createdAt: new Date("2024-01-05T12:00:00Z"),
      updatedAt: new Date("2024-01-18T09:30:00Z"),
    },
    {
      id: "clp9h0i1j2k3l4m5n6o7p8q9",
      name: "Pengadaan Ambulance Desa",
      notes: "Ambulance untuk emergency response 24 jam",
      amount: 450000000,
      link: "https://drive.google.com/ambulance-proposal",
      status: "APPROVED",
      createdAt: new Date("2024-02-05T14:45:00Z"),
      updatedAt: new Date("2024-02-07T16:20:00Z"),
    },
    {
      id: "clp0i1j2k3l4m5n6o7p8q9r0",
      name: "Revitalisasi Taman Kota",
      notes: "Pembuatan taman dengan fasilitas playground dan jogging track",
      amount: 980000000,
      link: "https://docs.google.com/taman-kota",
      status: "PENDING",
      createdAt: new Date("2024-02-12T08:15:00Z"),
      updatedAt: new Date("2024-02-12T08:15:00Z"),
    },
  ];
}

const ReviewPage = async () => {
  const data = await getData();
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
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPage;
