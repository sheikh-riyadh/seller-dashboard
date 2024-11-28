import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import Input from "../../components/Common/Input";
import TextArea from "../../components/Common/TextArea";
import { useUploadImageMutation } from "../../store/service/imageUpload/imageUploadAPI";
import SubmitButton from "../../components/Common/SubmitButton";
import {
  useGetSellerDetailsQuery,
  useUpdateSellerMutation,
} from "../../store/service/seller/sellerApi";
import toast from "react-hot-toast";
import { useGetSeller } from "../../hooks/useGetSeller";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const AboutBusiness = () => {
  const [logo, setLogo] = useState();
  const { register, handleSubmit, setValue } = useForm();

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const { seller } = useGetSeller();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    email: seller?.email,
  }).toString();

  const { data: sellerData, isLoading: sellerLoading } =
    useGetSellerDetailsQuery(query);
  const [updateSeller, { isLoading: updateSellerLoading }] =
    useUpdateSellerMutation();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Logo is required", { id: "logo" });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await uploadImage(formData).unwrap();
      setLogo(response.data?.display_url);
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  const handleOnSubmit = async (data) => {
    if (!logo) {
      toast.error("Logo is required", { id: "logo" });
      return;
    }

    delete data?._id;
    try {
      const res = await updateSeller({
        _id: sellerData?._id,
        data: { ...data, logo },
        email: sellerData?.email,
      });
      if (!res?.error) {
        toast.success("Updated successfully", { id: "update_seller" });
      } else {
        toast.error(res?.error?.data?.message, { id: "update_error" });
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  useEffect(() => {
    for (const key in sellerData) {
      if (Object.prototype.hasOwnProperty.call(sellerData, key)) {
        setValue(key, sellerData[key]);
      }
    }
    setLogo(sellerData?.logo);
  }, [sellerData, setValue, seller]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="shadow-md bg-widget m-5 p-5 rounded-sm"
      >
        {!sellerLoading ? (
          <div>
            <div className="rounded-full">
              <label
                htmlFor="photo"
                className="mb-1 inline-block rounded-full h-32 w-32 relative"
              >
                <div
                  className="h-32 w-32 border-2 border-stech rounded-full relative flex flex-col items-center justify-center cursor-pointer"
                  title="Business logo"
                >
                  {logo ? (
                    <img
                      className="w-full h-full rounded-full object-fill"
                      src={logo}
                      alt="logo"
                    />
                  ) : (
                    <div className="w-full h-full bg-black hover:bg-transparent duration-300 rounded-full flex flex-col items-center justify-center text-white hover:text-stech border text-4xl font-bold overflow-hidden">
                      <span>Logo</span>
                    </div>
                  )}
                  {isLoading && (
                    <div className="absolute h-full w-full bg-black opacity-100 rounded-full">
                      <ImSpinner9 className="h-full w-full animate-spin text-white" />
                    </div>
                  )}
                </div>
              </label>

              <Input
                onChange={(e) => handleImageUpload(e)}
                className="hidden"
                id="photo"
                type="file"
                accept="image/*"
              />
            </div>
            <div className="grid gap-5">
              <Input
                {...register("businessName")}
                label={"Name of Store"}
                placeholder="Name of Store"
                required
                className={"bg-[#1C2822] text-white rounded-sm"}
                value={sellerData?.businessName}
                disabled
              />

              <Input
                {...register("_id")}
                label={"Store ID"}
                placeholder="Store ID"
                className={"bg-[#1C2822] text-white rounded-sm"}
                value={sellerData?._id}
                disabled
              />
            </div>
            <div className="mt-3">
              <TextArea
                {...register("description")}
                label="Description"
                required
                className={"bg-[#1C2822] text-white rounded-sm h-28"}
              />
            </div>

            <div className="mt-5 flex flex-col items-end">
              <SubmitButton
                disabled={isLoading}
                isLoading={updateSellerLoading}
                className="px-10 py-2 w-32"
              >
                Save
              </SubmitButton>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </form>
    </div>
  );
};

export default AboutBusiness;
