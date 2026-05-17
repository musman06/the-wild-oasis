import { useSearchParams } from "react-router-dom";

import CabinRow from "@/features/cabins/CabinRow/CabinRow";
import Spinner from "@/components/Spinner/Spinner";
import Table from "@/components/Table/Table";
import Menus from "@/components/Menus/Menus";
import Empty from "@/components/Empty/Empty";

import useLoadCabins from "../useLoadCabins";

const CabinTable = () => {
  const { isLoading, cabins, error } = useLoadCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") ?? "all";

  let filteredCabins;
  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => {
      return cabin.discount === 0;
    });
  } else if (filterValue === "discount") {
    filteredCabins = cabins.filter((cabin) => {
      return cabin.discount > 0;
    });
  }

  if (isLoading) return <Spinner />;
  if (error) return null;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
