import { useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import { ImSpinner10 } from "react-icons/im";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [isHoverImage, setIsHoverImage] = useState(null);
  const isLoading = "";
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("");
    }
  };

  return (
    <div>
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
            <input
              type="file"
              accept={"image/*"}
              className="hidden size-0 overflow-hidden"
              id="upload_image_input"
              onChange={handleImageChange}
            />
            <FaUpload className="text-xl" />
            <p>click to upload</p>
          </label>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-5">
        {images?.map((image, index) => (
          <div
            key={index}
            className="size-20 border flex justify-center items-center relative p-1 overflow-hidden"
            onMouseEnter={() => setIsHoverImage(index)}
          >
            <img src={image} alt="Media Image" className="object-cover" />

            {isHoverImage === index ? (
              <div
                onMouseLeave={() => setIsHoverImage(null)}
                onClick={() =>
                  setImages(images?.filter((_, idx) => idx !== index))
                }
                className="absolute backdrop-blur inset-0 text-red-500 flex justify-center items-center text-xl cursor-pointer"
              >
                <FaTrash />
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
