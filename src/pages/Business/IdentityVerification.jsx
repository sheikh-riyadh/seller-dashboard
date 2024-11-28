import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../../components/Common/SelectInput";
import Input from "../../components/Common/Input";
import Marquee from "../../components/Common/Marquee";
import { useUploadImageMutation } from "../../store/service/imageUpload/imageUploadAPI";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Common/SubmitButton";
import {
  useGetSellerDetailsQuery,
  useUpdateSellerMutation,
} from "../../store/service/seller/sellerApi";
import { useGetSeller } from "../../hooks/useGetSeller";
import { FaTrash } from "react-icons/fa";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const IdentityVerification = () => {
  const [identity, setIdentity] = useState("");
  const { seller } = useGetSeller();
  const { register, handleSubmit, setValue } = useForm();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    email: seller?.email,
  }).toString();

  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const { data: sellerData, isLoading: sellerLoading } =
    useGetSellerDetailsQuery(query);

  const [updateSeller, { isLoading: updateSellerLoading }] =
    useUpdateSellerMutation();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadImage(formData).unwrap();
      setIdentity(res?.data?.display_url);
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  const handleOnSubmit = async (data) => {
    if (!identity) {
      toast.error("Identity image is required", { id: "identity_error" });
      return;
    }

    try {
      const res = await updateSeller({
        _id: sellerData?._id,
        data: { ...data, identity },
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
    if (sellerData?.identity) {
      setIdentity(sellerData?.identity);
      setValue("type", sellerData?.type);
    }
  }, [sellerData, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="shadow-md m-5 p-5 bg-widget rounded-sm">
          {!sellerLoading ? (
            <div className="flex flex-col gap-5">
              <SelectInput
                {...register("type")}
                required
                label={"Select Document types"}
                className="bg-[#1C2822] text-white rounded-sm"
                defaultValue={"NID"}
              >
                {["NID", "Passport", "TradeLicense"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </SelectInput>
              {!isLoading ? (
                <Input
                  type="file"
                  accept="image/*"
                  disabled={isLoading}
                  onChange={(event) => handleImageUpload(event)}
                  className={"bg-[#1C2822] text-white rounded-sm"}
                />
              ) : (
                <Marquee
                  content={
                    <div className="block w-[500px] h-5 rounded-sm bg-accent"></div>
                  }
                />
              )}

              {identity && (
                <div className=" w-36 h-28 flex flex-col  gap-1 border rounded-md overflow-hidden relative">
                  <img
                    className="h-full w-full rounded-sm"
                    src={identity}
                    alt={identity}
                  />

                  <div
                    onClick={() => setIdentity("")}
                    className="absolute top-2 right-2 text-white w-7 h-7 border p-1 rounded-full bg-danger flex flex-col items-center justify-center cursor-pointer hover:opacity-70 duration-300"
                  >
                    <FaTrash />
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-col justify-end items-end">
                <SubmitButton
                  disabled={isLoading}
                  isLoading={updateSellerLoading}
                  className="py-2 w-40"
                >
                  Save
                </SubmitButton>
              </div>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </form>
    </div>
  );
};

export default IdentityVerification;
