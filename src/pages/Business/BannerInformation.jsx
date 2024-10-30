import { useState } from "react";
import ImageUpload from "../../components/Pages/Business/Banner/ImageUpload";
import LiveVideoUpload from "../../components/Pages/Business/Banner/LiveVideoUpload";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import TextArea from "../../components/Common/TextArea";
import { useForm } from "react-hook-form";

const BannerInformation = () => {
  const [coverType, setCoverType] = useState("image");
  const [images, setImages] = useState(Array(4).fill(null));

  const { register, handleSubmit, watch } = useForm();

  const handleOnSubmit = () => {};

  return (
    <div className="pb-8">
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <div className="-mt-28 bg-white shadow-md m-5 p-5 border rounded-md">
        <div className="mb-10">
          <p className=" text-xl font-semibold text-blue">
            Which one you set as a cover?
          </p>
          <div className="flex items-center justify-start mt-4 gap-x-4">
            {["image", "live"].map((option) => (
              <Button
                onClick={() => setCoverType(option)}
                key={option}
                className="flex items-center gap-2 cursor-pointer bg-transparent border-none  text-black w-20"
              >
                <div
                  className={`w-4 h-4 rounded-full border duration-300 ${
                    coverType == option && "bg-secondary"
                  }`}
                ></div>
                <span className="capitalize">{option}</span>
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
            className={"bg-transparent border"}
          />
          <TextArea
            label={"Description"}
            placeholder="Enter description"
            required={true}
            {...register("description")}
            className={"bg-transparent border"}
          />
          {coverType == "image" ? (
            <ImageUpload images={images} setImages={setImages} />
          ) : (
            <LiveVideoUpload register={register} watch={watch} />
          )}

          <div className="flex flex-col items-end justify-end">
            <Button className="w-36">
              {coverType == "image" ? "Save image" : "Save live"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerInformation;
