import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import Input from "../../components/Common/Input";
import TextArea from "../../components/Common/TextArea";
import Button from "../../components/Common/Button";

const AboutBusiness = () => {
  const [logo, setLogo] = useState();
  const { register, handleSubmit } = useForm();

  const imageLoading = "";

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo("");
    }
  };

  const handleOnSubmit = () => {
    console.log("");
  };

  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="shadow-md m-10 p-7 -mt-28 bg-white rounded-md"
      >
        <div className="mb-5 h-32 w-32 ">
          <label htmlFor="photo" className="rounded-full inline-block my-1">
            <div className="h-32 w-32 border-2 border-primary rounded-full relative flex flex-col items-center justify-center cursor-pointer ">
              {logo ? (
                <img src={logo} alt="logo" />
              ) : (
                <p className="text-4xl font-bold text-secondary">Logo</p>
              )}

              {imageLoading && (
                <div className="absolute h-full w-full bg-black opacity-80 rounded-full">
                  <ImSpinner9 className="h-full w-full animate-spin text-primary" />
                </div>
              )}

              <div className="absolute opacity-0 hover:opacity-100 bg-black flex justify-center items-center h-full w-full rounded-full duration-300">
                <span className="font-bold text-4xl text-white">Logo</span>
              </div>
            </div>
          </label>
          <Input
            onChange={(e) => handleImageChange(e)}
            className="hidden"
            id="photo"
            type="file"
            accept="image/*"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          {/* Business Name */}
          <Input
            {...register("storeName")}
            label={"Name of Store"}
            placeholder="Name of Store"
            required
            defaultValue={""}
            className={"bg-transparent border"}
          />

          {/* Business Email */}
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

        <div className="mt-5 flex flex-col">
          <Button className="px-10 py-2">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default AboutBusiness;
