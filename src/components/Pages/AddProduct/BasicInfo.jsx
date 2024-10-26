import PropTypes from "prop-types";
import { FaPlus, FaTimes } from "react-icons/fa";
import Input from "../../Common/Input";
import SelectInput from "../../Common/SelectInput";


const BasicInfo = ({
  register,
  handleProductKeyFeature,
  handleDeleteKeyFeatures,
  productKeyFeatures,
}) => {
  return (
    <div className="flex flex-col gap-1 p-5">
      <span className="py-2 block font-medium">Product Image:</span>
      <div className="flex gap-5">
        <div className="flex items-center justify-center w-full h-36 border-2 border-dotted rounded-xl">
          <FaPlus />
        </div>
        <div className="flex items-center justify-center w-full h-36 border-2 border-dotted rounded-xl">
          <FaPlus />
        </div>
        <div className="flex items-center justify-center w-full h-36 border-2 border-dotted rounded-xl">
          <FaPlus />
        </div>
        <div className="flex items-center justify-center w-full h-36 border-2 border-dotted rounded-xl">
          <FaPlus />
        </div>
        <div className="flex items-center justify-center w-full h-36 border-2 border-dotted rounded-xl">
          <FaPlus />
        </div>
      </div>
      <div>
        <Input
          label={"Product Video URL"}
          required
          className={"bg-white border"}
          {...register("productVideoURL")}
          placeholder="Product video url"
        />
      </div>

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
          {productKeyFeatures?.map((feature) => (
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
  handleDeleteKeyFeatures: PropTypes.func,
  handleProductKeyFeature: PropTypes.func,
  productKeyFeatures: PropTypes.array,
};
export default BasicInfo;
