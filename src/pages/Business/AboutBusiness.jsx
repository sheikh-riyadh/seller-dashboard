import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import Input from "../../components/Common/Input";
import TextArea from "../../components/Common/TextArea";
import Button from "../../components/Common/Button";
import { useUploadImageMutation } from "../../store/service/imageUpload/imageUploadAPI";

const AboutBusiness = () => {
  const [logo, setLogo] = useState();
  const { register, handleSubmit } = useForm();

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const response = await uploadImage(formData).unwrap();
    setLogo(response.data?.display_url);
  };

  const handleOnSubmit = () => {
    console.log("");
  };

  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="shadow-md m-5 p-5 -mt-28 bg-white border rounded-md"
      >
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
                  <span >
                    Logo
                  </span>
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
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input
            {...register("storeName")}
            label={"Name of Store"}
            placeholder="Name of Store"
            required
            defaultValue={""}
            className={"bg-transparent border"}
          />

          <Input
            {...register("storeId")}
            label={"Store ID"}
            placeholder="Store ID"
            className={"bg-transparent border"}
          />
        </div>
        <div className="mt-3">
          <TextArea
            {...register("description")}
            label="Description"
            required
            className={"bg-transparent border h-28"}
          />
        </div>

        <div className="mt-5 flex flex-col items-end">
          <Button className="px-10 py-2 w-32">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default AboutBusiness;
