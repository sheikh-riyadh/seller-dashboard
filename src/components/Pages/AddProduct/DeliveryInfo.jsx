import PropTypes from "prop-types";
import SelectInput from "../../Common/SelectInput";
import Input from "../../Common/Input";

const DeliveryInfo = ({ register, watch }) => {
  const returnProductAvailable = watch("returnProductAvailable");
  const freeDeliveryAvailable = watch("freeDeliveryAvailable");

  return (
    <div>
      <div className="flex flex-col gap-5">
        <Input
          {...register("warranty")}
          key="warranty"
          className="bg-[#1C2822] text-white rounded-sm"
          label="Warranty"
          placeholder="warranty"
          required
        />
        <div>
          <SelectInput
            {...register("cashOnDeliveryAvailable")}
            label="Cash on Delivery"
            required
            className="bg-[#1C2822] text-white rounded-sm"
            defaultValue="yes"
          >
            <option selected value="yes">
              Yes
            </option>
          </SelectInput>
        </div>
        <div className="flex flex-col gap-3">
          <SelectInput
            {...register("returnProductAvailable")}
            label="Return Product"
            required
            className="bg-[#1C2822] text-white rounded-sm"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </SelectInput>
          {returnProductAvailable === "yes" ? (
            <Input
              {...register("returnDays")}
              key="returnDays"
              className="bg-[#1C2822] text-white rounded-sm"
              label="Return Product Within ( x ) Days"
              placeholder="Enter days"
              type="number"
              min={1}
              required
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-3">
          <SelectInput
            {...register("freeDeliveryAvailable")}
            label="Free Delivery"
            required
            className="bg-[#1C2822] text-white rounded-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Select
            </option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </SelectInput>

          {freeDeliveryAvailable === "no" ? (
            <Input
              {...register("deliveryCharge")}
              key="deliveryCharge"
              className="bg-[#1C2822] text-white rounded-sm"
              required
              label="Delivery Charge"
              placeholder="Enter delivery charge"
              type="number"
              min={1}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

DeliveryInfo.propTypes = {
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};

export default DeliveryInfo;
