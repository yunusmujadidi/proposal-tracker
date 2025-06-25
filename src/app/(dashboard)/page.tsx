import { getProposals } from "@/actions/proposal-actions";
import { AmountChart } from "@/components/amount-chart";
import { DashboardStats } from "@/components/dashboard-stats";
import { StatusChart } from "@/components/status-chart";

const Home = async () => {
  const { data = [] } = await getProposals();

  return (
    <div className="m-2 p-4 space-y-6">
      <DashboardStats proposals={data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusChart proposals={data} />
        <AmountChart proposals={data} />
      </div>
    </div>
  );
};

export default Home;
