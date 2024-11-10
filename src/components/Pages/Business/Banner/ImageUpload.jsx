import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { useUploadImageMutation } from "../../../../store/service/imageUpload/imageUploadAPI";
import {
  handleDeleteBannerImage,
  handleBannerImages,
} from "../../../../store/features/banner/bannerSlice";
import Input from "../../../Common/Input";
import { useGetBanner } from "../../../../hooks/useBanner";
import { useGetProduct } from "../../../../hooks/useGetProduct";
import {
  handleDeleteProductImage,
  handleProductImages,
} from "../../../../store/features/product/productSlice";

const ImageUpload = ({ from = "banner" }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const { bannerImages } = useGetBanner();
  const { productImages } = useGetProduct();

  const dispatch = useDispatch();
  const images = from == "banner" ? bannerImages : productImages;

  const handleImageUpload = async (event, index) => {
    setImageIndex(index);
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadImage(formData).unwrap();
      if (from == "banner") {
        dispatch(
          handleBannerImages({
            index,
            data: response.data?.display_url,
          })
        );
      } else {
        dispatch(
          handleProductImages({
            index,
            data: response.data?.display_url,
          })
        );
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  const handleDelete = (index) => {
    if (from == "banner") {
      dispatch(handleDeleteBannerImage(index));
    } else {
      dispatch(handleDeleteProductImage(index));
    }
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      {[...Array(images?.length).keys()].map((_, index) => (
        <div key={index} className="my-5 h-32 w-full relative">
          {!images[index] ? (
            <label
              htmlFor={`photo-${index}`}
              className="inline-block my-1 w-full"
            >
              <div
                className={`group h-32 w-full border-2 border-stech border-dotted rounded-md relative flex flex-col items-center justify-center cursor-pointer ${
                  isLoading && "cursor-wait"
                }`}
              >
                <p className="flex flex-col gap-1 items-center justify-center text-2xl font-bold text-stech w-full h-full">
                  <FaPlus className="group-hover:rotate-180 duration-1000" />
                  {from === "banner" && index === 0 ? (
                    <span className="text-sm bg-danger w-full capitalize text-white text-center absolute mt-16 p-1">
                      required
                    </span>
                  ) : from === "product" ? (
                    <span className="text-sm bg-danger w-full capitalize text-white text-center absolute mt-16 p-1">
                      required
                    </span>
                  ) : null}
                </p>

                {isLoading && imageIndex === index && (
                  <div className="absolute h-full w-full rounded bg-white flex items-center justify-center">
                    <ImSpinner9 className="animate-spin text-stech text-4xl" />
                  </div>
                )}
              </div>
            </label>
          ) : (
            <div className="h-full w-full absolute border-2 border-dotted border-stech rounded-md my-1">
              <img
                src={images[index]}
                alt={`Uploaded ${index}`}
                className="h-full w-full object-fill rounded-md"
              />

              <div className="absolute top-0 right-0 bg-[#2222228d] hover:bg-[#222222d4] duration-300 text-danger h-full w-full flex flex-col items-center justify-center rounded-md text-2xl cursor-pointer">
                <FaTrash onClick={() => handleDelete(index)} className="" />
              </div>
            </div>
          )}
          <Input
            onChange={(e) => handleImageUpload(e, index)}
            className="hidden z-0"
            id={`photo-${index}`}
            type="file"
            accept="image/*"
            disabled={isLoading || images[index]}
          />
        </div>
      ))}
    </div>
  );
};

ImageUpload.propTypes = {
  from: PropTypes.string,
};

export default ImageUpload;
