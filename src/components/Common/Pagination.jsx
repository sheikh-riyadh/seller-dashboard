import SelectInput from "./SelectInput";
import PropTypes from "prop-types";

const Pagination = ({ pages, setCurrentPage, setLimit, currentPage }) => {
  return (
    <div className="flex gap-3 items-center justify-end p-5 bg-widget">
      {[...Array(pages ? pages : 0).keys()]?.map((page) => (
        <div key={page}>
          <div
            onClick={() => setCurrentPage(page)}
            key={page}
            className={`px-3 py-1 cursor-pointer rounded-md text-black ${
              currentPage == page ? "bg-accent" : "bg-white"
            }`}
          >
            <span className="font-bold">{page + 1}</span>
          </div>
        </div>
      ))}
      <div>
        <SelectInput
          onChange={(event) => {
            setLimit(event.target.value), setCurrentPage(0);
          }}
          className="bg-[#1c2822] text-white p-1.5 rounded-md"
          defaultValue="10"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </SelectInput>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number,
  setCurrentPage: PropTypes.func,
  setLimit: PropTypes.func,
  currentPage: PropTypes.number,
};
export default Pagination;
