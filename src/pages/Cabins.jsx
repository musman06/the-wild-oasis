import Heading from "@/components/Heading/Heading";
import Row from "@/components/Row/Row";
import CabinTable from "@/features/cabins/CabinTable/CabinTable";
import AddCabin from "@/features/cabins/AddCabin/AddCabin";
import TableOperations from "@/components/TableOperations/TableOperations";
import Filter from "@/components/Filter/Filter";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading Variant="h1" text="All cabins" />
        <TableOperations>
          <Filter
            filterName="discount"
            options={[
              { filterValue: "all", filterLabel: "All" },
              { filterValue: "no-discount", filterLabel: "No discount" },
              { filterValue: "discount", filterLabel: "Discount" },
            ]}
          />
        </TableOperations>
      </Row>

      <Row type="vertical">
        <CabinTable />
      </Row>

      <Row type="vertical" align="end">
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
