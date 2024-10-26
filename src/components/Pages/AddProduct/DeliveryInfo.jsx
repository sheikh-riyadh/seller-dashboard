import PropTypes from "prop-types";
import SelectInput from "../../Common/SelectInput";
import Input from "../../Common/Input";


const DeliveryInfo = ({ register, watch }) => {
  const returnProductAvailable = watch("returnProductAvailable");
  const freeDeliveryAvailable = watch("freeDeliveryAvailable");

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <SelectInput
            label={"Cash on Delivery"}
            required
            {...register("cashOnDeliveryAvailable")}
            className={"bg-white border"}
          >
            <option selected value="" disabled>
              Select
            </option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </SelectInput>
        </div>
        <div className="flex flex-col gap-3">
          <SelectInput
            label={"Return Product"}
            required
            {...register("returnProductAvailable")}
            className={"bg-white border"}
          >
            <option selected value="" disabled>
              Select
            </option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </SelectInput>
          {returnProductAvailable == "yes" ? (
            <Input
              {...register("returnProductConditon")}
              className={"bg-white border"}
              label={"Return Product Within ( x ) Days"}
              placeholder={"Enter days"}
              type="number"
              min={"1"}
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-3">
          <SelectInput
            label={"Free Delivery"}
            required
            {...register("freeDeliveryAvailable")}
            className={"bg-white border"}
          >
            <option selected value="" disabled>
              Select
            </option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </SelectInput>

          {freeDeliveryAvailable == "yes" ? (
            <Input
              {...register("freeDeliveryCondition")}
              className={"bg-white border"}
              label={"Free Delivery Condition If You Have (within 10 words)"}
              placeholder={"Enter if you have any delivery condition"}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

DeliveryInfo.propTypes = {
  register: PropTypes.func,
  watch: PropTypes.func,
};

export default DeliveryInfo;
