import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Input from "../../Common/Input";
import SelectInput from "../../Common/SelectInput";
import ImageUpload from "../Business/Banner/ImageUpload";
import { FaTimes } from "react-icons/fa";
import {
  handleAddKeyFeatures,
  handleRemoveKeyFeatures,
} from "../../../store/features/product/productSlice";
import { useGetSellerBrandsQuery } from "../../../store/service/brands/brandsApi";
import { useGetProduct } from "../../../hooks/useGetProduct";
import { useGetUser } from "../../../hooks/useGetUser";

const BasicInfo = ({ register, setValue }) => {
  const dispatch = useDispatch();
  const { keyFeatures } = useGetProduct();
  const { user } = useGetUser();

  const { data: sellerBrandsData, isLoading } = useGetSellerBrandsQuery(
    user?._id
  );

  const handleDeleteKeyFeatures = (deleteFeatureItem) => {
    dispatch(handleRemoveKeyFeatures(deleteFeatureItem));
  };

  const handleProductKeyFeature = (event) => {
    if (event.key === "Enter") {
      const data = event.target.value;
      if (!keyFeatures.includes(data)) {
        setValue("keyFeatures", "");
        dispatch(handleAddKeyFeatures(data));
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 p-5">
      <span className="py-2 block font-medium text-sm">Product Image:</span>
      <ImageUpload from="product" />
      <div>
        <Input
          {...register("videoURL")}
          label={"Video URL"}
          className={"bg-white border"}
          placeholder="URL"
        />
      </div>
      <div>
        <Input
          {...register("title")}
          label={"Title"}
          required
          className={"bg-white border"}
          placeholder="Product title"
        />
      </div>

      <div>
        <SelectInput
          {...register("category")}
          label={"Category"}
          required
          className={"bg-white border text-sm"}
        >
          <option selected value="">
            Select category
          </option>
          <option value="hello 1">Hello 1</option>
          <option value="hello 2">Hello 2</option>
          <option value="hello 3">Hello 3</option>
        </SelectInput>
      </div>
      <div>
        <SelectInput
          {...register("brand")}
          label={"Brand"}
          required
          className={"bg-white border text-sm"}
        >
          <option disabled selected value="">
            {`${isLoading ? "Please wait..." : "Select brand"}`}
          </option>

          {sellerBrandsData?.brands?.map(({ brandName }) => (
            <option key={brandName} value={brandName}>
              {brandName}
            </option>
          ))}
          <option value="no brand">No brand</option>
        </SelectInput>
      </div>
      <span className="py-2 block font-medium text-sm">
        Key Features <span className="text-danger">*</span>
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
