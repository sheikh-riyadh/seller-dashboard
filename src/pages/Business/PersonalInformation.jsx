import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import Input from "../../components/Common/Input";
import SelectInput from "../../components/Common/SelectInput";
import Button from "../../components/Common/Button";
import { business } from "../../data/business/business";
import { useUploadImageMutation } from "../../store/service/imageUpload/imageUploadAPI";
import { useState } from "react";

const PersonalInformation = () => {
  const [photo, setPhoto] = useState("");
  const { handleSubmit, register } = useForm();

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const response = await uploadImage(formData).unwrap();
    setPhoto(response.data?.display_url);
  };

  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <form
        onSubmit={handleSubmit()}
        className="shadow-md m-5 p-5 -mt-28 bg-white border rounded-md"
      >
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
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          {business?.personalData?.map(
            ({ registerName, label, isRequired, type, data, placeholder }) =>
              !data ? (
                <Input
                  key={registerName}
                  label={label}
                  {...register(registerName)}
                  required={isRequired}
                  type={type}
                  placeholder={placeholder}
                  className={"bg-white border"}
                />
              ) : (
                <SelectInput
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
          <Button className="py-2 w-40">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
