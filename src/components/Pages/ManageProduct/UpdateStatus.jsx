import toast from "react-hot-toast";
import { useUpdateProductMutation } from "../../../store/service/product/productApi";
import SelectInput from "../../Common/SelectInput";
import PropTypes from "prop-types";

const UpdateStatus = ({ sellerId, item }) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleUpdateStatus = async (event) => {
    const data = {
      _id: item?._id,
      data: { status: event.target.value, sellerId },
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
    <div>
      <SelectInput
        onChange={handleUpdateStatus}
        className="border bg-transparent rounded-full p-0 px-2 capitalize"
        disabled={isLoading}
      >
        <option selected={item?.status === "active"} value="active">
          active
        </option>
        <option selected={item?.status === "draft"} value="draft">
          draft
        </option>
      </SelectInput>
    </div>
  );
};

UpdateStatus.propTypes = {
  sellerId: PropTypes.string,
  item: PropTypes.object,
};

export default UpdateStatus;
