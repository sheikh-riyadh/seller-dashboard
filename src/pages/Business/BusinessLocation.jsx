import { useForm } from "react-hook-form";
import Button from "../../components/Common/Button";
import { useState } from "react";
import SingleImageUpload from "../../components/Common/SingleImageUpload";

const BusinessLocation = () => {
  const { handleSubmit, register } = useForm();
  const [image, setImage] = useState();

  const handleOnSubmit = () => {};

  return (
    <div className="pb-8">
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <div className="-mt-28 bg-white shadow-md border m-5 p-5 rounded-md">
        <span className="text-xl font-semibold text-blue mb-5 block">
          Upload your business location
        </span>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-3"
        >
          <SingleImageUpload
            image={image}
            setImage={setImage}
            register={register}
          />

          <div className="flex flex-col items-end justify-end">
            <Button className="w-36">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessLocation;
