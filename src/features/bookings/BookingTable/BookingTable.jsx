import BookingRow from "../BookingRow/BookingRow";
import Table from "@/components/Table/Table";
import Menus from "@/components/Menus/Menus";
import Spinner from "@/components/Spinner/Spinner";
import Empty from "@/components/Empty/Empty";
import Pagination from "@/components/Pagination/Pagination";

import useLoadBookings from "../useLoadBookings";

function BookingTable() {
  const { isLoading, bookings, count } = useLoadBookings();

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>{<Pagination resultsCount={count} />}</Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
