import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Input from "../../Common/Input";
import SelectInput from "../../Common/SelectInput";
import ImageUpload from "../Business/Banner/ImageUpload";
import { FaTimes } from "react-icons/fa";
import {
  handleAddKeyFeatures,
  handleRemoveKeyFeatures,
} from "../../../store/features/product/productSlice";

const BasicInfo = ({ register, setValue }) => {

  const dispatch = useDispatch();
  const { keyFeatures } = useSelector(
    (state) => state.session.myselfCaptakeProductReducer.value
  );

  const handleDeleteKeyFeatures = (deleteFeatureItem) => {
    dispatch(handleRemoveKeyFeatures(deleteFeatureItem));
  };

  const handleProductKeyFeature = (event) => {
    if (event.key === "Enter") {
      const data = event.target.value;
      if (!keyFeatures.includes(data)) {
        setValue("keyFeatures");
        dispatch(handleAddKeyFeatures(data));
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 p-5">
      <span className="py-2 block font-medium">Product Image:</span>
      <ImageUpload />
      <div>
        <Input
          label={"Product Title"}
          required
          className={"bg-white border"}
          {...register("productTitle")}
          placeholder="Product title"
        />
      </div>

      <div>
        <SelectInput
          label={"Product Category"}
          required
          {...register("category")}
          className={"bg-white border"}
        >
          <option selected value="">
            Select category
          </option>
          <option>Hello</option>
          <option>Hello</option>
          <option>Hello</option>
        </SelectInput>
      </div>
      <span className="py-2 block font-medium">
        Product key features <span className="text-danger">*</span>
      </span>
      <div>
        <Input
          {...register("keyFeatures")}
          className={"bg-white border"}
          onKeyDown={handleProductKeyFeature}
          placeholder="Enter"
        />

        <div className="flex items-center gap-2 flex-wrap mt-3">
          {keyFeatures?.map((feature) => (
            <div
              key={feature}
              className="px-2 flex items-center gap-2 border rounded-full"
            >
              <span className="text-sm">{feature}</span>
              <span>
                <FaTimes
                  onClick={() => handleDeleteKeyFeatures(feature)}
                  className="text-sm text-danger cursor-pointer bg-gray-200 rounded-full p-0.5 hover:text-white hover:bg-danger duration-300"
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BasicInfo.propTypes = {
  register: PropTypes.func,
  setValue: PropTypes.func,
};
export default BasicInfo;
