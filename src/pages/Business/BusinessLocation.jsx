import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SingleImageUpload from "../../components/Common/SingleImageUpload";
import SubmitButton from "../../components/Common/SubmitButton";
import {
  useCreateSellerLocationMutation,
  useGetSellerLocationQuery,
  useUpdateSellerLocationMutation,
} from "../../store/service/businessLocation/businessLocationApi";
import toast from "react-hot-toast";
import { useGetSeller } from "../../hooks/useGetSeller";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const BusinessLocation = () => {
  const [image, setImage] = useState();
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const { handleSubmit, register } = useForm();

  const { seller } = useGetSeller();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    email: seller?.email,
  }).toString();

  const { data: locationData, isLoading } = useGetSellerLocationQuery(query);

  const [updateLocation, { isLoading: updateLoading }] =
    useUpdateSellerLocationMutation();
  const [createLocation, { isLoading: createLoading }] =
    useCreateSellerLocationMutation();

  const handleOnSubmit = async () => {
    const data = {
      locationImage: image,
      sellerId: seller?._id,
      email: seller?.email,
    };
    if (locationData?._id) {
      try {
        const res = await updateLocation({ _id: locationData?._id, data });
        if (!res?.error) {
          toast.success("Updated location successfully", {
            id: "update_location",
          });
        } else {
          toast.error("Something went wrong 😓", { id: "update_error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    } else {
      try {
        const res = await createLocation(data);
        if (!res?.error) {
          toast.success("Created location successfully", {
            id: "created_location",
          });
        } else {
          toast.error("Something went wrong 😓", { id: "create_error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    }
  };

  useEffect(() => {
    if (locationData?._id) {
      setImage(locationData?.locationImage);
    }
  }, [locationData]);

  return (
    <div className="pb-8">
      <div className="bg-widget shadow-md m-5 p-5 rounded-sm">
        <span className="text-xl font-semibold text-white mb-5 block">
          Upload your business location
        </span>
        {!isLoading ? (
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col gap-3"
          >
            <SingleImageUpload
              image={image}
              setImage={setImage}
              register={register}
              setImageUploadLoading={setImageUploadLoading}
            />

            <div className="flex flex-col items-end justify-end">
              <SubmitButton
                disabled={imageUploadLoading}
                isLoading={updateLoading || createLoading}
                className="w-36"
              >
                Save
              </SubmitButton>
            </div>
          </form>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default BusinessLocation;
