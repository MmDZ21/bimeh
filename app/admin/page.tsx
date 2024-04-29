"use client";
import { useDashboard } from "@/contexts/DashboardContext";
import HomeCard from "@/components/home/cards";
import Overview from "@/components/home/overview";
import Alarms from "@/components/home/alarms";
import RecentPolicies from "@/components/home/recent/policies";
import RecentClients from "@/components/home/recent/clients";
import { LineChart } from "lucide-react";
const Home = () => {
  const { isLoadingCompany, isLoadingClients, clients, policies } =
    useDashboard();
  return (
    <div className="size-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl">
          خانه
        </h1>
      </div>
      <div className="size-full flex flex-col py-6 px-12 justify-center items-center">
        {!isLoadingCompany && !isLoadingClients ? (
          <div className="size-full flex flex-col gap-6">
            <div className="flex flex-col justify-center items-center md:flex-row gap-6 px-6 w-full">
              <div className="w-full">
                <HomeCard title="title 1" data={{}} icon={<LineChart />} />
              </div>
              <div className="w-full">
                <HomeCard title="title 2" data={{}} icon={<LineChart />} />
              </div>
              <div className="w-full">
                <HomeCard title="title 3" data={{}} icon={<LineChart />} />
              </div>
              <div className="w-full">
                <HomeCard title="title 4" data={{}} icon={<LineChart />} />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center md:flex-row gap-6 px-6 flex-1 size-full">
              <div className="w-full md:w-2/3">
                <Overview />
              </div>
              <div className="w-full md:w-1/3">
                <Alarms />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center md:flex-row gap-6 px-6 size-full">
              <div className="w-full md:w-3/5">
                <RecentPolicies />
              </div>
              <div className="w-full md:w-2/5">
                <RecentClients />
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
