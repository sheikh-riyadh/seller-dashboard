import { ImSpinner9 } from "react-icons/im";
import { FaUpload } from "react-icons/fa";
import PropTypes from "prop-types";
import Input from "./Input";
import { useUploadImageMutation } from "../../store/service/imageUpload/imageUploadAPI";
import cn from "../../utils/cn";

const SingleImageUpload = ({ image, setImage, register, className }) => {
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const response = await uploadImage(formData).unwrap();
    setImage(response.data?.display_url);
  };

  return (
    <div className={cn("mb-5 h-96 w-full", className)}>
      <label
        htmlFor="location"
        className="rounded-full inline-block my-1 w-full"
      >
        <div
          className={`h-96 w-full border-2 border-stech border-dotted rounded-md relative flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
            isLoading && "cursor-wait"
          }`}
        >
          {image ? (
            <img
              src={image}
              alt="location_image"
              className="h-full w-full object-fill rounded-md"
            />
          ) : (
            <p className="flex flex-col gap-1 items-center justify-center font-medium text-stech w-full h-full bg-sky-100">
              <FaUpload />
              <span>Click to upload your google map photo</span>
            </p>
          )}

          {isLoading && (
            <div className="absolute h-full w-full rounded bg-white flex items-center justify-center">
              <ImSpinner9 className="animate-spin text-stech text-4xl" />
            </div>
          )}
        </div>
      </label>
      <Input
        {...register("image")}
        onChange={(e) => handleImageUpload(e)}
        className="hidden"
        id="location"
        type="file"
        accept="image/*"
        disabled={isLoading}
        required
      />
    </div>
  );
};

SingleImageUpload.propTypes = {
  image: PropTypes.string,
  setImage: PropTypes.func,
  register: PropTypes.func,
  className: PropTypes.string,
};

export default SingleImageUpload;
