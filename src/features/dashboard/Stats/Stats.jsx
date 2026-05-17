import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "../Stat/Stat";
import { formatCurrency } from "@/utils/helpers";

const Stats = ({ salesData, staysData, numDays, cabinsCount }) => {
  const totalBookings = salesData.length;
  const totalSales = salesData.reduce((acc, curr) => {
    return acc + curr.total_price;
  }, 0);

  const totalCheckins = staysData.length;
  const occupancyRate =
    staysData.reduce((acc, curr) => {
      return acc + curr.number_nights;
    }, 0) /
    (numDays * cabinsCount);

  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        value={totalBookings}
        color="blue"
      />

      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
        color="green"
      />

      <Stat
        title="Check-ins"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckins}
        color="indigo"
      />

      <Stat
        title="Occupancy Rate"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
        color="yellow"
      />
    </>
  );
};

export default Stats;
