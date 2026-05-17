import { useSearchParams } from "react-router-dom";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";

import { PAGE_SIZE } from "@/utils/constants";
import "./pagination.css";

const Pagination = ({ resultsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const pagesCount = Math.ceil(resultsCount / PAGE_SIZE);

  function handleNextPage() {
    if (currentPage < pagesCount) currentPage = currentPage + 1;

    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
  }

  function handlePreviousPage() {
    if (currentPage > 1) currentPage = currentPage - 1;

    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
  }

  return (
    <div className="pagination">
      <p className="pagination-info">
        Showing results <span>{(currentPage - 1) * 10 + 1}</span> to{" "}
        <span>
          {currentPage !== pagesCount ? currentPage * 10 : resultsCount}
        </span>{" "}
        out of <span>{resultsCount}</span>
      </p>

      <div className="pagination-buttons-container">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          <HiChevronDoubleLeft /> <span>Previous</span>
        </button>
        <button
          className="pagination-button"
          disabled={currentPage === pagesCount}
          onClick={handleNextPage}
        >
          <HiChevronDoubleRight /> <span>Next</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
