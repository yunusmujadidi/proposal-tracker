import { DashboardCard } from "@/components/dashboard-card";
import { CheckCircle2, Clock2, FileText, Sheet, Target } from "lucide-react";

const Home = () => {
  const data = {
    title: "test",
    icon: Sheet,
    number: 7,
    description: "Hello bang apa kabar",
  };
  return (
    <div className="m-2 p-4">
      <div className="grid grid-cols=1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Proposal"
          description="Jumlah total proposal"
          icon={FileText}
          number={Math.random()}
        />
        <DashboardCard
          title="Menunggu Review"
          description="Jumlah proposal pending"
          icon={Clock2}
          number={Math.random()}
        />
        <DashboardCard
          title="Proposal Disetujui"
          description="Jumlah proposal yang disetujui"
          icon={CheckCircle2}
          number={Math.random()}
        />
        <DashboardCard
          title="Tercapai"
          description="Jumlah presentase proposal keseluruhan"
          icon={Target}
          number={Math.random()}
        />
      </div>
    </div>
  );
};

export default Home;
