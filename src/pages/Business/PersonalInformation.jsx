import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import Input from "../../components/Common/Input";
import SelectInput from "../../components/Common/SelectInput";
import Button from "../../components/Common/Button";
import { business } from "../../data/business/business";

const PersonalInformation = () => {
  const { handleSubmit, register } = useForm();
  const demo = "";

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("");
    }
  };

  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <form
        onSubmit={handleSubmit()}
        className="shadow-md m-10 p-7 -mt-28 bg-white border rounded-md"
      >
        <div className="rounded-full">
          <label
            htmlFor="photo"
            className="mb-1 inline-block rounded-full h-32 w-32 relative"
          >
            <div
              className="h-32 w-32 border-2 border-primary rounded-full relative flex flex-col items-center justify-center cursor-pointer"
              title="Personal photo"
            >
              {demo ? (
                <img className="w-full h-full" src="" alt="" />
              ) : (
                <FaUserAlt className="absolute w-full h-full p-2 rounded-full" />
              )}
              {demo && (
                <div className="absolute h-full w-full bg-black opacity-100 rounded-full">
                  <ImSpinner9 className="h-full w-full animate-spin text-primary" />
                </div>
              )}

              <div className="absolute h-full w-full rounded-full z-50">
                <FaUserAlt className="h-full w-full text-primary rounded-full opacity-0 hover:opacity-100 bg-black duration-300 p-2" />
              </div>
            </div>
          </label>

          <Input
            onChange={(e) => handleImageChange(e)}
            className="hidden"
            id="photo"
            type="file"
            accept="image/*"
            required={false}
            label="Select your photo"
          />
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5">
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
