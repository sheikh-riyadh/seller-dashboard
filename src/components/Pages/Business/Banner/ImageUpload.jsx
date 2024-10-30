import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { useUploadImageMutation } from "../../../../store/service/imageUpload/imageUploadAPI";
import Input from "../../../Common/Input";
import { useDispatch, useSelector } from "react-redux";
import { handleImages } from "../../../../store/features/product/productSlice";

const ImageUpload = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.session.productReducer.value);

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleImageUpload = async (event, index) => {
    setImageIndex(index);
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const response = await uploadImage(formData).unwrap();

    dispatch(
      handleImages({
        index,
        data: {
          display_url: response.data?.display_url,
          delete_url: response.data?.delete_url,
        },
      })
    );
  };

  return (
    <div className="grid grid-cols-4 gap-5 mt-3">
      {[...Array(images.length).keys()].map((_, index) => (
        <div key={index} className="mb-5 h-32 w-full">
          <label
            htmlFor={`photo-${index}`}
            className="rounded-full inline-block my-1 w-full"
          >
            <div
              className={`h-32 w-full border-2 border-stech border-dotted rounded-md relative flex flex-col items-center justify-center cursor-pointer ${
                isLoading && "cursor-wait"
              }`}
            >
              {images[index] ? (
                <img
                  src={images[index].display_url}
                  alt={`Uploaded ${index}`}
                  className="h-full w-full object-fill rounded-md"
                />
              ) : (
                <p className="flex flex-col items-center justify-center text-2xl font-bold text-stech w-full h-full">
                  <FaPlus />
                </p>
              )}

              {isLoading && imageIndex === index && (
                <div className="absolute h-full w-full rounded bg-white flex items-center justify-center">
                  <ImSpinner9 className="animate-spin text-stech text-4xl" />
                </div>
              )}
            </div>
          </label>
          <Input
            onChange={(e) => handleImageUpload(e, index)}
            className="hidden"
            id={`photo-${index}`}
            type="file"
            accept="image/*"
            disabled={isLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
