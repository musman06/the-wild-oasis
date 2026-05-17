import Heading from "../components/Heading/Heading";
import Row from "../components/Row/Row";
import BookingTable from "@/features/bookings/BookingTable/BookingTable";
import TableOperations from "@/components/TableOperations/TableOperations";
import Filter from "@/components/Filter/Filter";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading Variant="h1" text="All bookings" />
        <TableOperations>
          <Filter
            filterName="status"
            options={[
              { filterValue: "all", filterLabel: "All" },
              { filterValue: "checked-in", filterLabel: "Checked-In" },
              { filterValue: "checked-out", filterLabel: "Checked-Out" },
              { filterValue: "unconfirmed", filterLabel: "Unconfirmed" },
            ]}
          />
        </TableOperations>
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
