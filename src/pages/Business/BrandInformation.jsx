import { useForm } from "react-hook-form";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import ImageUpload from "../../components/Pages/Business/Banner/ImageUpload";

const BrandInformation = () => {
  const { register, handleSubmit } = useForm();

  const handleOnSubmit = () => {};

  return (
    <div className="pb-8">
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <div className="-mt-28 bg-white shadow-md border m-10 p-7 rounded-md">
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
          <ImageUpload />

          <div className="flex flex-col items-end justify-end">
            <Button className="w-36">save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandInformation;
