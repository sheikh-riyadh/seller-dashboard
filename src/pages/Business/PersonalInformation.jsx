import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import Input from "../../components/Common/Input";
import SelectInput from "../../components/Common/SelectInput";
import { business } from "../../data/business/business";
import { useUploadImageMutation } from "../../store/service/imageUpload/imageUploadAPI";
import { useEffect, useState } from "react";
import {
  useGetSellerDetailsQuery,
  useUpdateSellerMutation,
} from "../../store/service/seller/sellerApi";
import SubmitButton from "../../components/Common/SubmitButton";
import toast from "react-hot-toast";
import { useGetUser } from "../../hooks/useGetUser";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const PersonalInformation = () => {
  const [photo, setPhoto] = useState("");
  const { handleSubmit, register, setValue } = useForm();

  const { user } = useGetUser();

  const { data: sellerData, isLoading: sellerLoading } =
    useGetSellerDetailsQuery(user?._id);
  const [updateSeller, { isLoading: updateSellerLoading }] =
    useUpdateSellerMutation();
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await uploadImage(formData).unwrap();
      setPhoto(response.data?.display_url);
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  const handleUpdatePersonalInfo = async (data) => {
    if (!photo) {
      toast.error("Photo is required", { id: "submit_error" });
      return;
    }

    try {
      const res = await updateSeller({
        _id: sellerData?._id,
        data: { ...data, photo },
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
        if (key !== "_id") {
          setValue(key, sellerData[key]);
        }
      }
    }
    setPhoto(sellerData?.photo);
  }, [sellerData, setValue]);

  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <form
        onSubmit={handleSubmit(handleUpdatePersonalInfo)}
        className="shadow-md m-5 p-5 -mt-28 bg-white border rounded-md"
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
                  title="Personal photo"
                >
                  {photo ? (
                    <img
                      className="w-full h-full rounded-full object-fill"
                      src={photo}
                      alt="photo"
                    />
                  ) : (
                    <div className="w-full h-full bg-black hover:bg-transparent duration-300 rounded-full flex flex-col items-center justify-center text-white hover:text-stech border text-9xl font-bold overflow-hidden">
                      <FaUserAlt />
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
                required={false}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              {business?.personalData?.map(
                ({
                  registerName,
                  label,
                  isRequired,
                  type,
                  data,
                  placeholder,
                }) =>
                  !data ? (
                    <Input
                    {...register(registerName)}
                      key={registerName}
                      label={label}
                      required={isRequired}
                      type={type}
                      placeholder={placeholder}
                      className={"bg-white border"}
                      disabled={type === "email"}
                      value={type === "email" ? sellerData?.email : undefined}
                    />
                  ) : (
                    <SelectInput
                      {...register(registerName)}
                      label={label}
                      required={isRequired}
                      key={registerName}
                      placeholder={placeholder}
                      className={"bg-white border"}
                    >
                      <option selected disabled value="">
                        Select
                      </option>
                      {data?.map((op) => (
                        <option className="capitalize" value={op} key={op}>
                          {op}
                        </option>
                      ))}
                    </SelectInput>
                  )
              )}
            </div>
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
      </form>
    </div>
  );
};

export default PersonalInformation;
