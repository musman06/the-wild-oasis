import { useSearchParams } from "react-router-dom";
import "./filter.css";

const Filter = ({ filterName, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilter(filterValue) {
    searchParams.set(filterName, filterValue);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div className="filter">
      {options.map((option) => {
        return (
          <button
            key={option.filterValue}
            className={`filter-button ${searchParams.get(filterName) === option.filterValue ? "active" : ""}`}
            onClick={() => handleFilter(option.filterValue)}
          >
            {option.filterLabel}
          </button>
        );
      })}
    </div>
  );
};

export default Filter;
