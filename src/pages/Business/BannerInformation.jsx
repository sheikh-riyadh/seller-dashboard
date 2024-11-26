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
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import TextArea from "../../components/Common/TextArea";
import SubmitButton from "../../components/Common/SubmitButton";
import ImageUpload from "../../components/Pages/Business/Banner/ImageUpload";
import VideoUpload from "../../components/Pages/Business/Banner/LiveVideoUpload";
import { useGetSeller } from "../../hooks/useGetSeller";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { useGetBanner } from "../../hooks/useBanner";

const BannerInformation = () => {
  const [type, setType] = useState("image");

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      videoURL: "",
    },
  });

  const dispatch = useDispatch();
  const { bannerImages } = useGetBanner();
  const { seller } = useGetSeller();
  const { data: bannerData, isLoading: bannerLoading } = useGetBannerQuery({
    type,
    sellerId: seller?._id,
  });
  const { data: defaultBannerData } = useGetDefaultBannerQuery(seller?._id);
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
          type,
          default: true,
        };
      } else {
        newData = { ...data, sellerId: seller?._id, type, default: true };
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
            {!bannerLoading ? (
              <div>
                {" "}
                <div className="mb-10">
                  <p className=" text-xl font-semibold text-blue">
                    Which one you set as a cover?
                  </p>
                  <div className="flex items-center justify-start mt-4 gap-x-4">
                    {["image", "video"].map((option) => (
                      <Button
                        onClick={() => setType(option)}
                        key={option}
                        className="flex items-center gap-2 cursor-pointer bg-transparent border-none  text-black w-20"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border duration-300 ${
                            type == option && "bg-accent"
                          }`}
                        ></div>
                        <span className="capitalize text-white">{option}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(handleOnSubmit)}
                  className="flex flex-col gap-3"
                >
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
