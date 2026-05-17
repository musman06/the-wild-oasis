import DashboardLayout from "@/features/dashboard/DashboardLayout/DashboardLayout";
import Heading from "../components/Heading/Heading";
import Row from "../components/Row/Row";
import TableOperations from "@/components/TableOperations/TableOperations";
import Filter from "@/components/Filter/Filter";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading Variant="h1" text="Dashboard" />
        <TableOperations>
          <Filter
            filterName="last"
            options={[
              { filterValue: "7", filterLabel: "Last 7 days" },
              { filterValue: "30", filterLabel: "Last 30 days" },
              { filterValue: "90", filterLabel: "Last 90 days" },
            ]}
          />
        </TableOperations>
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
