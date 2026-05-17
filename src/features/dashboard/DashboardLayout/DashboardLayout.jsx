import Spinner from "@/components/Spinner/Spinner";
import Stats from "../Stats/Stats";
import "./dashboardlayout.css";

import useRecentBookings from "../useRecentBookings";
import useRecentStays from "../useRecentStays";
import useLoadCabins from "@/features/cabins/useLoadCabins";

const DashboardLayout = () => {
  const { isLoading: isLoadingBookings, salesData } = useRecentBookings();
  const { isLoading: isLoadingStays, staysData, lastDays } = useRecentStays();
  const { isLoading: isLoadingCabins, cabins } = useLoadCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <div className="dashboard-container">
      <Stats
        salesData={salesData}
        staysData={staysData}
        numDays={lastDays}
        cabinsCount={cabins.length}
      />
      {/* <div>{`Today's activity`}</div>
      <div>Chart stay durations</div>
      <div>Chart</div> */}
    </div>
  );
};

export default DashboardLayout;
