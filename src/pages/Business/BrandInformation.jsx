import { useForm } from "react-hook-form";
import Input from "../../components/Common/Input";
import { useDispatch } from "react-redux";
import { useUploadImageMutation } from "../../store/service/imageUpload/imageUploadAPI";
import {
  addBrand,
  removeBrand,
  setBrands,
} from "../../store/features/brands/brandsSlice";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import Marquee from "../../components/Common/Marquee";
import SubmitButton from "../../components/Common/SubmitButton";
import { useGetSeller } from "../../hooks/useGetSeller";
import { useGetBrands } from "../../hooks/useGetBrands";
import {
  useCreateSellerBrandsMutation,
  useGetSellerBrandsQuery,
  useUpdateSellerBrandsMutation,
} from "../../store/service/brands/brandsApi";
import { useEffect } from "react";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const BrandInformation = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const { seller } = useGetSeller();
  const { brands } = useGetBrands();

  const dispatch = useDispatch();
  const { data: sellerBrandsData, isLoading: sellerBrandLoading } =
    useGetSellerBrandsQuery(seller?._id);
  const [updateSellerBrands, { isLoading: updateSellerBrandLoading }] =
    useUpdateSellerBrandsMutation();

  const [createSellerBrands, { isLoading: createSellerBrandsLoading }] =
    useCreateSellerBrandsMutation();

  const brandName = watch("brandName");

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (!brandName) {
      toast.error("Please enter brand name", { id: "brand_error" });
      reset();
      return;
    } else if (!file) {
      toast.error("Please enter brand image name", { id: "brand_error" });
      reset();
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadImage(formData).unwrap();
      dispatch(addBrand({ brandName, brandPhoto: response.data?.display_url }));
      reset();
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  const handleOnSubmit = async () => {
    if (!brands.length) {
      toast.error("Brand is required", { id: "submit_error" });
      return;
    }

    const data = { brands, sellerId: seller?._id };
    if (sellerBrandsData?._id) {
      try {
        const res = await updateSellerBrands({
          _id: sellerBrandsData?._id,
          data,
        });

        if (!res?.error) {
          toast.success("Brands updated successfully", { id: "success" });
        } else {
          toast.error("Something went wrong 😓", { id: "error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    } else {
      try {
        const res = await createSellerBrands(data);

        if (!res?.error) {
          toast.success("Brands created successfully", { id: "success" });
        } else {
          toast.error("Something went wrong 😓", { id: "error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    }
  };

  useEffect(() => {
    dispatch(setBrands(sellerBrandsData?.brands));
  }, [dispatch, sellerBrandsData]);

  return (
    <div className="pb-8">
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <div className="-mt-28 bg-white shadow-md border m-5 p-5 rounded-md">
        <div>
          {!sellerBrandLoading ? (
            <form
              onSubmit={handleSubmit(handleOnSubmit)}
              className="flex flex-col gap-5"
            >
              <Input
                label={"Brand name *"}
                placeholder="Enter brand name"
                {...register("brandName")}
                className={"bg-transparent border"}
                disabled={isLoading}
              />
              {!isLoading ? (
                <Input
                  {...register("brandImage")}
                  type="file"
                  accept="image/*"
                  disabled={isLoading}
                  onChange={(event) => handleImageUpload(event)}
                  className={"bg-transparent border"}
                />
              ) : (
                <Marquee
                  content={
                    <div className="block w-[500px] h-5 rounded-sm bg-green-500"></div>
                  }
                />
              )}

              <div className="grid grid-cols-6 gap-5">
                {brands?.map((brand, index) => (
                  <div
                    className="flex flex-col gap-1 border rounded-md overflow-hidden relative"
                    key={brand.brandName}
                  >
                    <img
                      className="w-full h-24"
                      src={brand.brandPhoto}
                      alt={brand.brandName}
                    />
                    <span className="font-medium text-sm p-1">
                      {brand.brandName}
                    </span>
                    <div
                      onClick={() => dispatch(removeBrand(index))}
                      className="absolute top-2 right-2 text-white w-7 h-7 border p-1 rounded-full bg-danger flex flex-col items-center justify-center cursor-pointer hover:opacity-70 duration-300"
                    >
                      <FaTrash />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-end justify-end">
                <SubmitButton
                  isLoading={
                    createSellerBrandsLoading || updateSellerBrandLoading
                  }
                  disabled={isLoading}
                  className="w-36"
                >
                  save
                </SubmitButton>
              </div>
            </form>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandInformation;
