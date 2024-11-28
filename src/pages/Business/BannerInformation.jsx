import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  useCreateBannerMutation,
  useGetBannerQuery,
  useGetDefaultBannerQuery,
  useUpdateBannerMutation,
} from "../../store/service/banner/bannerApi";
import toast from "react-hot-toast";
import { handleSetBannerImage } from "../../store/features/banner/bannerSlice";
import Input from "../../components/Common/Input";
import TextArea from "../../components/Common/TextArea";
import SubmitButton from "../../components/Common/SubmitButton";
import ImageUpload from "../../components/Pages/Business/Banner/ImageUpload";
import VideoUpload from "../../components/Pages/Business/Banner/LiveVideoUpload";
import { useGetSeller } from "../../hooks/useGetSeller";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { useGetBanner } from "../../hooks/useBanner";
import SelectInput from "../../components/Common/SelectInput";

const BannerInformation = () => {
  const [type, setType] = useState("image");

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      videoURL: "",
      type: "image",
    },
  });

  const dispatch = useDispatch();
  const { bannerImages } = useGetBanner();
  const { seller } = useGetSeller();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    type,
    email: seller?.email,
  }).toString();

  const { data: bannerData, isLoading: bannerLoading } =
    useGetBannerQuery(query);

  const { data: defaultBannerData, isLoading:defaultBannerLoading } = useGetDefaultBannerQuery(query);
  const [createBanner, { isLoading }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: updateLoading }] =
    useUpdateBannerMutation();

  const handleOnSubmit = async (data) => {
    let newData;

    if (type == "image" && !bannerImages[0]) {
      toast.error("Banner image is required", { id: "empty_error" });
      return;
    } else {
      if (type == "image") {
        delete data.videoURL;
        newData = {
          ...data,
          sellerId: seller?._id,
          bannerImages,
          default: true,
          email: seller?.email,
        };
      } else {
        newData = { ...data, sellerId: seller?._id, default: true };
      }
    }

    if (!bannerData?._id) {
      const res = await createBanner(newData);
      if (!res?.error) {
        toast.success("Banner created successfully", { id: "success" });
      } else {
        toast.error("Something went wrong 😓", { id: "create_error" });
      }
    } else {
      if (type == "image") {
        delete data.videoURL;
        const res = await updateBanner({
          _id: bannerData?._id,
          data: { ...newData },
          email: seller?.email,
        });
        if (!res?.error) {
          toast.success("Updated banner successfully");
        } else {
          toast.error("Something went wrong 😓", { id: "update_error" });
        }
      } else {
        const res = await updateBanner({
          _id: bannerData?._id,
          data: { ...newData },
          email: seller?.email,
        });
        if (!res?.error) {
          toast.success("Updated banner successfully");
        } else {
          toast.error("Something went wrong 😓", { id: "update_error" });
        }
      }
    }
  };

  useEffect(() => {
    if (defaultBannerData?.type) {
      setType(defaultBannerData?.type);
    }
  }, [defaultBannerData]);

  useEffect(() => {
    reset();
    if (bannerData?.type) {
      for (const key in bannerData) {
        if (Object.prototype.hasOwnProperty.call(bannerData, key)) {
          if (key === "_id") {
            continue;
          } else {
            setValue(key, bannerData[key]);
          }
        }
      }
      if (bannerData?.bannerImages) {
        dispatch(handleSetBannerImage(bannerData?.bannerImages));
      }
    }
  }, [bannerData, setValue, reset, dispatch]);

  return (
    <div className="pb-8">
      <div>
        <div className="bg-widget text-white shadow-md p-5 m-5 rounded-sm">
          <div>
            {!bannerLoading || defaultBannerLoading ? (
              <div>
                {" "}
                <div className="mb-10">
                  <p className=" text-xl font-semibold text-blue">
                    Which one you set as a cover?
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(handleOnSubmit)}
                  className="flex flex-col gap-3"
                >
                  <SelectInput
                    {...register("type")}
                    onChange={(event) => setType(event.target.value)}
                    className="bg-[#1C2822] text-white rounded-sm text-sm"
                    defaultValue={type}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </SelectInput>

                  <Input
                    label={"Title"}
                    required={true}
                    placeholder="Enter title"
                    {...register("title")}
                    className={"bg-[#1C2822] text-white rounded-sm"}
                  />
                  <TextArea
                    label={"Description"}
                    placeholder="Enter description"
                    required={true}
                    {...register("description")}
                    className={"bg-[#1C2822] text-white rounded-sm h-36"}
                  />
                  {type == "image" ? (
                    <ImageUpload />
                  ) : (
                    <VideoUpload register={register} watch={watch} />
                  )}

                  <div className="flex flex-col items-end justify-end">
                    <SubmitButton
                      isLoading={isLoading || updateLoading}
                      className="w-36"
                    >
                      {type == "image" ? "Save image" : "Save video"}
                    </SubmitButton>
                  </div>
                </form>
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerInformation;
