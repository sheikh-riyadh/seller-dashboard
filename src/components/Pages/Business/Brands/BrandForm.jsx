import { useEffect, useState } from "react";
import { useUploadImageMutation } from "../../../../store/service/imageUpload/imageUploadAPI";
import { useForm } from "react-hook-form";
import {
  useCreateSellerBrandsMutation,
  useUpdateSellerBrandsMutation,
} from "../../../../store/service/brands/brandsApi";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import SubmitButton from "../../../Common/SubmitButton";
import Input from "../../../Common/Input";
import { ImSpinner9 } from "react-icons/im";
import { FaUpload } from "react-icons/fa";

const BrandForm = ({ setIsModalOpen, updateData, seller }) => {
  const [brandPhoto, setBrandPhoto] = useState();
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const [createBrand, { isLoading: brandCreateLoading }] =
    useCreateSellerBrandsMutation();
  const [updateBrand, { isLoading: updateBrandLoading }] =
    useUpdateSellerBrandsMutation();

  const { handleSubmit, register, setValue } = useForm();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadImage(formData).unwrap();
      if (response?.data?.display_url) {
        setBrandPhoto(response.data?.display_url);
      } else {
        toast.error("Something went wrong 😓", { id: "upload_error" });
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  const handleBrand = async (data) => {
    if (!brandPhoto) {
      toast.error("Category image is required", { id: "category_error" });
      return;
    }
    if (!updateData?._id) {
      try {
        const res = await createBrand({
          ...data,
          email: seller?.email,
          sellerId: seller?._id,
          brandPhoto,
        });
        if (!res?.error) {
          toast.success("Category created successfully", { id: "success" });
          setIsModalOpen(false);
        } else {
          toast.error(res?.error?.data.message, {
            id: "brand_error",
          });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    } else {
      try {
        const res = await updateBrand({
          _id: updateData?._id,
          data: {
            ...data,
            email: seller?.email,
            brandPhoto,
            sellerId: updateData?.sellerId,
          },
        });
        if (!res?.error) {
          toast.success("Updated category successfully", { id: "success" });
          setIsModalOpen(false);
        } else {
          toast.error(res?.error?.data.message, {
            id: "update_category_error",
          });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    }
  };

  useEffect(() => {
    if (updateData?._id) {
      setValue("brandName", updateData?.brandName);
      setBrandPhoto(updateData?.brandPhoto);
    }
  }, [setValue, updateData]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleBrand)}
        className="flex flex-col gap-4"
      >
        <Input
          {...register("brandName")}
          label={"Name"}
          placeholder={"Brand Name"}
          required
          className="bg-[#1C2822] text-white rounded-sm"
        />
        <div className={"h-44 w-full"}>
          <label
            htmlFor="location"
            className="rounded-full inline-block my-1 w-full"
          >
            <div
              className={`h-44 w-full border-2 border-stech border-dotted rounded-md relative flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
                isLoading && "cursor-wait"
              }`}
            >
              {brandPhoto ? (
                <img
                  src={brandPhoto}
                  alt="brand_image"
                  className="h-full w-full object-fill rounded-md"
                />
              ) : (
                <p className="flex flex-col gap-1 items-center justify-center font-medium text-accent w-full h-full bg-[#1c2822]">
                  <FaUpload />
                  <span>Click to upload</span>
                </p>
              )}

              {isLoading && (
                <div className="absolute h-full w-full rounded bg-widget flex items-center justify-center">
                  <ImSpinner9 className="animate-spin text-white text-4xl" />
                </div>
              )}
            </div>
          </label>
          <Input
            onChange={(e) => handleImageUpload(e)}
            className="hidden"
            id="location"
            type="file"
            accept="image/*"
            disabled={isLoading}
          />
        </div>

        <SubmitButton
          disabled={isLoading}
          isLoading={updateBrandLoading || brandCreateLoading}
        >
          Save
        </SubmitButton>
      </form>
    </div>
  );
};

BrandForm.propTypes = {
  setIsModalOpen: PropTypes.func,
  updateData: PropTypes.object,
  seller: PropTypes.object,
};

export default BrandForm;
