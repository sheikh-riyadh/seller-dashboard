import PropTypes from "prop-types";
import { FaPlus, FaTimes } from "react-icons/fa";
import Input from "../../Common/Input";
import SelectInput from "../../Common/SelectInput";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";
import { useUploadImageMutation } from "../../../store/service/imageUpload/imageUploadAPI";

const BasicInfo = ({
  register,
  handleProductKeyFeature,
  handleDeleteKeyFeatures,
  productKeyFeatures,
}) => {
  // States
  const [images, setImages] = useState(Array(4).fill(null));
  const [imageIndex, setImageIndex] = useState(0);

  // image upload function
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleImageUpload = async (event, index) => {
    setImageIndex(index);
    // getting file from form
    const file = event.target.files[0];
    if (!file) return;

    // add file
    const formData = new FormData();
    formData.append("image", file);

    const response = await uploadImage(formData).unwrap();
    const newImages = [...images];
    newImages[index] = response.data?.display_url;
    setImages(newImages);
  };

console.log(isLoading)


  return (
    <div className="flex flex-col gap-1 p-5">
      <span className="py-2 block font-medium">Product Image:</span>

      <div className="grid grid-cols-4 gap-5">
        {[...Array(4).keys()].map((_, index) => (
          <div key={index} className="mb-5 h-32 ">
            <label
              htmlFor={`photo-${index}`}
              className="rounded-full inline-block my-1 w-full"
            >
              <div className="h-32 border-2 border-primary border-dotted rounded-md relative flex flex-col items-center justify-center cursor-pointer">
                {images[index] ? (
                  <img
                    src={images[index]}
                    alt={`Uploaded ${index}`}
                    className="h-full w-full object-fill rounded-md"
                  />
                ) : (
                  <div>
                    {!isLoading && imageIndex === index && (
                      <p className="text-4xl font-bold text-secondary">
                        <FaPlus />
                      </p>
                    )}
                  </div>
                )}

                {isLoading && imageIndex === index && (
                  <div className="absolute h-full w-full rounded flex items-center justify-center">
                    <ImSpinner9 className="animate-spin text-primary text-4xl" />
                  </div>
                )}
              </div>
            </label>
            <Input
              onChange={(e) => handleImageUpload(e, index)}
              className="hidden"
              id={`photo-${index}`}
              type="file"
              accept="image/*"
              disabled={isLoading}
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
