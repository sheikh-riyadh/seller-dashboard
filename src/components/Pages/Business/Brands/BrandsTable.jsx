import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import Table from "../../../Common/Table";
import { useGetSellerBrandsQuery } from "../../../../store/service/brands/brandsApi";
import { useGetSeller } from "../../../../hooks/useGetSeller";
import UpdateBrand from "./UpdateBrand";
import DeleteBrand from "./DeleteBrand";
import PropTypes from "prop-types";
import Pagination from "../../../Common/Pagination";

const BrandsTable = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { seller } = useGetSeller();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    email: seller?.email,
    search,
    page: currentPage,
    limit,
  }).toString();
  const { data, isLoading } = useGetSellerBrandsQuery(query);
  const pages = Math.ceil(Math.abs(data?.total ?? 0) / parseInt(limit));

  return (
    <div>
      <div className="rounded-md shadow-md">
        {!isLoading ? (
          <Table
            className="font-normal"
            tableData={data?.data}
            columns={[
              {
                name: "Brand Name",
                dataIndex: "brandName",
                key: "brandName",
              },
              {
                name: "Image",
                render: ({ item }) => {
                  return (
                    <div className="flex items-center gap-2 w-12 h-12">
                      <img
                        className="h-full w-full"
                        src={item?.brandPhoto}
                        alt="brand"
                      />
                    </div>
                  );
                },
              },

              {
                name: "Actions",
                render: ({ item }) => {
                  return (
                    <div className="flex items-center gap-2">
                      <UpdateBrand item={item} seller={seller} />
                      <DeleteBrand email={seller?.email} _id={item?._id} />
                    </div>
                  );
                },
              },
            ]}
          />
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center h-screen bg-widget">
            <ImSpinner9 className="text-6xl animate-spin text-white" />
            <span className="font-medium text-accent">Loading...</span>
          </div>
        )}
      </div>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
        key={"order_pagination"}
      />
    </div>
  );
};

BrandsTable.propTypes = {
  search: PropTypes.string,
};

export default BrandsTable;
