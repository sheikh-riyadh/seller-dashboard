import { useNavigate } from "react-router-dom";
import { FaBinoculars } from "react-icons/fa";
import toast from "react-hot-toast";
import Table from "../../Common/Table";
import { useGetProductsQuery } from "../../../store/service/product/productApi";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { useGetSeller } from "../../../hooks/useGetSeller";
import DeleteProduct from "./DeleteProduct";
import { numberWithCommas } from "../../../utils/numberWithComma";
import UpdateStatus from "./UpdateStatus";

const ProductTable = () => {
  const navigate = useNavigate();
  const { seller } = useGetSeller();
  const { data, isLoading } = useGetProductsQuery(seller?._id);

  const redirectUserDetailsHandler = (items) => {
    if (items) {
      navigate("/update-product", {
        state: {
          payload: { ...items },
        },
      });
    } else {
      toast.error("Data missing!. Please try again!");
    }
  };

  return (
    <div className="rounded-sm shadow-md">
      {!isLoading ? (
        <Table
          className="font-normal"
          tableData={data}
          columns={[
            {
              name: "Images",
              render: ({ item }) => {
                return (
                  <div className="flex items-center gap-2">
                    {item?.productImages?.slice(0, 2)?.map((image, index) => (
                      <img
                        className="w-12 h-12 border rounded-sm"
                        key={index}
                        src={image}
                        alt="product_image"
                      />
                    ))}
                  </div>
                );
              },
            },
            {
              name: "Title",
              dataIndex: "title",
              key: "title",
            },
            {
              name: "Price",
              render: ({ item }) => {
                return <div>{numberWithCommas(item?.price)}</div>;
              },
            },
            {
              name: "Stock",
              dataIndex: "stock",
              key: "stock",
            },
            {
              name: "Brand",
              dataIndex: "brand",
              key: "brand",
            },
            {
              name: "Status",
              render: ({ item }) => {
                return <UpdateStatus item={item} sellerId={seller?._id} />;
              },
            },
            {
              name: "Actions",
              render: ({ item }) => {
                return (
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => redirectUserDetailsHandler(item)}
                      className="text-stech cursor-pointer border border-stech text-center p-2 rounded-full"
                      title="View"
                    >
                      <FaBinoculars />
                    </span>
                    <DeleteProduct user={seller} id={item?._id} />
                  </div>
                );
              },
            },
          ]}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ProductTable;
