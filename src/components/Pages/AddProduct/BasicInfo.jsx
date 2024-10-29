import PropTypes from "prop-types";
import { FaPlus, FaTimes } from "react-icons/fa";
import Input from "../../Common/Input";
import SelectInput from "../../Common/SelectInput";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";

const BasicInfo = ({
  register,
  handleProductKeyFeature,
  handleDeleteKeyFeatures,
  productKeyFeatures,
}) => {
  const imageLoading = "";

  const [logo, setLogo] = useState();

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];

    console.log({ file, index });

    if (file) {
      setLogo("");
    }
  };

  return (
    <div className="flex flex-col gap-1 p-5">
      <span className="py-2 block font-medium">Product Image:</span>

      <div className="grid grid-cols-4 gap-5">
        {[...Array(4).keys()].map((imbBox, index) => (
          <div key={imbBox} className="mb-5 h-32 ">
            <label
              htmlFor={`photo-${index}`}
              className="rounded-full inline-block my-1 w-full"
            >
              <div className="h-32 border-2 border-primary border-dotted rounded-md relative flex flex-col items-center justify-center cursor-pointer ">
                {logo ? (
                  <img src={logo} alt="logo" />
                ) : (
                  <div>
                    {!imageLoading && (
                      <p className="text-4xl font-bold text-secondary">
                        <FaPlus />
                      </p>
                    )}
                  </div>
                )}

                {imageLoading && (
                  <div className="absolute h-full w-full rounded">
                    <ImSpinner9 className="h-full w-full animate-spin text-primary" />
                  </div>
                )}
              </div>
            </label>
            <Input
              onChange={(e) => handleImageChange(e, index+1)}
              className="hidden"
              id={`photo-${index}`}
              type="file"
              accept="image/*"
              disabled={imageLoading}
            />
          </div>
        ))}
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
