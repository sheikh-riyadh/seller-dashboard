import { ImSpinner9 } from "react-icons/im";
import Table from "../../../Common/Table";
import { useGetSellerBrandsQuery } from "../../../../store/service/brands/brandsApi";
import { useGetSeller } from "../../../../hooks/useGetSeller";
import UpdateBrand from "./UpdateBrand";
import DeleteBrand from "./DeleteBrand";

const BrandsTable = () => {
  const { seller } = useGetSeller();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    email: seller?.email,
  }).toString();
  const { data, isLoading } = useGetSellerBrandsQuery(query);
  console.log(data)

  return (
    <div>
      <div className="rounded-md shadow-md">
        {!isLoading ? (
          <Table
            className="font-normal"
            tableData={data}
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
                      <img className="h-full w-full" src={item?.brandPhoto} alt="brand" />
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
    </div>
  );
};

export default BrandsTable;
