import { useForm } from "react-hook-form";
import ImageUpload from "../../components/Pages/Business/Banner/ImageUpload";
import Button from "../../components/Common/Button";
import SelectInput from "../../components/Common/SelectInput";

const IdentityVerification = () => {
  const { register, handleSubmit } = useForm();

  const handleOnSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="shadow-md m-5 p-5 -mt-28 bg-white border rounded-md flex flex-col">
          <SelectInput
            {...register("type")}
            required
            label={"Select Document types"}
            className="border bg-transparent"
          >
            {["NID", "Passport", " TradeLicense"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
          <ImageUpload />
          <div className="flex flex-col">
            <Button>Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IdentityVerification;
