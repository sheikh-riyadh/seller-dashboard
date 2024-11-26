import { useState } from "react";
import Button from "../../../../Common/Button";
import PropTypes from "prop-types";
import Modal from "../../../../Modal/Modal";
import SubmitButton from "../../../../Common/SubmitButton";
import SelectInput from "../../../../Common/SelectInput";
import { useGetSeller } from "../../../../../hooks/useGetSeller";
import { useUpdateOrderStatusMutation } from "../../../../../store/service/order/orderApi";
import toast from "react-hot-toast";
const UpdateStatus = ({ orderInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { seller } = useGetSeller();

  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const handleStatus = async (event) => {
    event.preventDefault();

    const form = event.target;
    const status = form.status.value;
    const newData = {
      _id: orderInfo?._id,
      data: {
        status,
        sellerId: seller?._id,
      },
    };

    try {
      const res = await updateOrderStatus(newData);
      if (!res.error) {
        setIsModalOpen(false);
        toast.success("Status updated successfully", { id: "status_updated" });
      } else {
        toast.error("Something went wrong 😓", { id: "status_error" });
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  return (
    <div>
      <Button
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="text-xs"
      >
        Update Status
      </Button>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          title={"Update status"}
          className={"w-[350px]"}
        >
          <form onSubmit={handleStatus} className="flex flex-col text-black gap-4">
            <SelectInput
              label="Status"
              name="status"
              required
              defaultValue={"pending"}
              className={"bg-[#1C2822] text-white rounded-sm"}
            >
              <option value="">Select</option>
              {[
                "pending",
                "processing",
                "ready to ship",
                "delivered",
                "cancelled",
                "completed",
              ].map((status) => (
                <option
                  disabled={orderInfo?.status === status}
                  className="uppercase"
                  value={status}
                  key={status}
                >
                  {status}
                </option>
              ))}
            </SelectInput>
            <SubmitButton isLoading={isLoading}>Update</SubmitButton>
          </form>
        </Modal>
      )}
    </div>
  );
};

UpdateStatus.propTypes = {
  orderInfo: PropTypes.object,
};
export default UpdateStatus;
