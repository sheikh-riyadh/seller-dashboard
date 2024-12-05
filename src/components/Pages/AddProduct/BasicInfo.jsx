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
import { useGetSeller } from "../../../hooks/useGetSeller";
import { useGetCategoriesQuery } from "../../../store/service/category/categoryApi";

const BasicInfo = ({ register, setValue }) => {
  const dispatch = useDispatch();
  const { keyFeatures } = useGetProduct();
  const { seller } = useGetSeller();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    email: seller?.email,
  }).toString();

  const { data: sellerBrandsData, isLoading } = useGetSellerBrandsQuery(query);

  const { data: catgories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(query);

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
      <span className="py-2 block font-medium text-sm text-white">
        Product Image:
      </span>
      <ImageUpload from="product" />
      <div>
        <Input
          {...register("videoURL")}
          label={"Video URL"}
          className={"bg-[#1C2822] text-white rounded-sm"}
          placeholder="URL"
        />
      </div>
      <div>
        <Input
          {...register("title")}
          label={"Title"}
          required
          className={"bg-[#1C2822] text-white rounded-sm"}
          placeholder="Product title"
        />
      </div>

      <div>
        <SelectInput
          {...register("category")}
          label={"Category"}
          required
          className={"bg-[#1C2822] text-white rounded-sm text-sm"}
          disabled={categoriesLoading}
        >
          <option selected value="">
            Select category
          </option>
          {catgories?.map((category) => (
            <option value={category?.category} key={category?._id}>
              {category?.category}
            </option>
          ))}
        </SelectInput>
      </div>
      <div>
        <SelectInput
          {...register("brand")}
          label={"Brand"}
          required
          className={"bg-[#1C2822] text-white rounded-sm text-sm"}
        >
          <option disabled selected value="">
            {`${isLoading ? "Please wait..." : "Select brand"}`}
          </option>

          {sellerBrandsData?.data?.map(({ brandName }) => (
            <option key={brandName} value={brandName}>
              {brandName}
            </option>
          ))}
          <option value="no brand">No brand</option>
        </SelectInput>
      </div>
      <span className="py-2 block font-medium text-sm text-white">
        Key Features <span className="text-danger">*</span>
      </span>
      <div>
        <Input
          {...register("keyFeatures")}
          className={"bg-[#1C2822] text-white rounded-sm"}
          onKeyDown={handleProductKeyFeature}
          placeholder="Enter"
        />

        <div className="flex items-center gap-2 flex-wrap mt-3">
          {keyFeatures?.map((feature) => (
            <div
              key={feature}
              className="px-2 flex items-center gap-2 bg-accent rounded-full"
            >
              <span className="text-sm font-bold">{feature}</span>
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
