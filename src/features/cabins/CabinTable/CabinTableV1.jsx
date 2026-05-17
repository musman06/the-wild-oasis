import CabinRow from "@/features/cabins/CabinRow/CabinRow";
import Spinner from "@/components/Spinner/Spinner";
import "./cabintable.css";

import useLoadCabins from "../useLoadCabins";

const CabinTable = () => {
  const { isLoading, cabins, error } = useLoadCabins();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) return null;

  return (
    <div className="cabintable" role="table">
      <header className="cabintable-header" role="table-header">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </header>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinTable;
