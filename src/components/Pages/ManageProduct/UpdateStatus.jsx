import toast from "react-hot-toast";
import { useUpdateProductMutation } from "../../../store/service/product/productApi";
import SelectInput from "../../Common/SelectInput";
import PropTypes from "prop-types";

const UpdateStatus = ({ sellerId, item, email, sellerStatus }) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleUpdateStatus = async (event) => {
    const data = {
      _id: item?._id,
      data: { status: event.target.value, sellerId, email },
    };
    try {
      const res = await updateProduct(data);
      if (!res?.error) {
        toast.success("Update status successfully", { id: "status_success" });
      } else {
        toast.error("Something went wrong 😓", { id: "error" });
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };
  return (
    <div
      className={`${
        item?.status === "blocked"
          ? "hidden"
          : sellerStatus === "working"
          ? "hidden"
          : null
      }`}
    >
      <SelectInput
        onChange={handleUpdateStatus}
        className="border bg-widget rounded-full p-0 px-2 capitalize text-white"
        disabled={isLoading}
      >
        <option selected={item?.status === "active"} value="active">
          active
        </option>
        <option
          selected={item?.status === "draft" || item?.status === "working"}
          value="draft"
        >
          draft
        </option>
      </SelectInput>
    </div>
  );
};

UpdateStatus.propTypes = {
  sellerId: PropTypes.string,
  item: PropTypes.object,
  email: PropTypes.string,
  sellerStatus: PropTypes.string,
};

export default UpdateStatus;
