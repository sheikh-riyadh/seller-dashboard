import { useForm } from "react-hook-form";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import { ImSpinner10 } from "react-icons/im";
import { FaUpload } from "react-icons/fa";

const BusinessLocation = () => {
  const { handleSubmit } = useForm();

  const isLoading = "";
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("");
    }
  };

  const handleOnSubmit = () => {};

  return (
    <div>
      <div className="pb-8">
        <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
        <div className="-mt-28 bg-white shadow-md border m-10 p-5 rounded-md">
          <span className=" text-xl font-semibold text-blue">
            Upload your business location
          </span>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col gap-3"
          >
            <div
              className={`bg-sky-100 border border-dashed border-primary rounded-sm h-60 mt-5 flex justify-center items-center ${
                isLoading && "cursor-wait"
              }`}
            >
              {isLoading ? (
                <div className=" grid grid-cols-1 justify-center">
                  {" "}
                  <ImSpinner10 className="animate-spin text-3xl mx-auto" />
                  <p className="mt-2">Uploading</p>
                </div>
              ) : (
                <label
                  htmlFor="upload_image_input"
                  className="flex justify-center items-center flex-col gap-2 text-gray-700 mb-3 size-full cursor-pointer"
                >
                  <Input
                    type="file"
                    accept={"image/*"}
                    className="hidden size-0 overflow-hidden"
                    id="upload_image_input"
                    onChange={handleImageChange}
                  />
                  <FaUpload className="text-xl" />
                  <p>click to upload your google map location</p>
                </label>
              )}
            </div>

            <div className="flex flex-col items-end justify-end">
              <Button className="w-36">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessLocation;
