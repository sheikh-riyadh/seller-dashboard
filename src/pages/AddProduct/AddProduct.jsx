import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import BasicInfo from "../../components/Pages/AddProduct/BasicInfo";
import DescriptionInfo from "../../components/Pages/AddProduct/DescriptionInfo";
import StockPriceAndQuantity from "../../components/Pages/AddProduct/StockPriceAndQuantity";
import JoditTextArea from "../../components/Common/JoditTextArea";
import DeliveryInfo from "../../components/Pages/AddProduct/DeliveryInfo";
import {
  handleAdditionalInfo,
  handleClearProduct,
  handleSetUpdatedProduct,
} from "../../store/features/product/productSlice";
import SubmitButton from "../../components/Common/SubmitButton";
import { checkValue } from "../../utils/checkInputFieldValue";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useGetUser } from "../../hooks/useGetUser";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../store/service/product/productApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const AddProduct = ({ updateData }) => {
  const { user } = useGetUser();
  const { keyFeatures, description, additionalInfo, productImages } =
    useGetProduct();
  const dispatch = useDispatch();

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();

  const { handleSubmit, register, setValue, watch, reset } = useForm();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleOnSubmit = async (data) => {
    const newData = {
      ...data,
      productImages,
      keyFeatures,
      description,
      additionalInfo,
      sellerId: user?._id,
    };

    if (!checkValue(productImages)) {
      toast.error("Product image is required");
      return;
    } else if (!keyFeatures.length) {
      toast.error("Key features is required");
      return;
    } else if (description?.length < 50) {
      toast.error("Description is short");
      return;
    }

    if (updateData?._id) {
      try {
        const res = await updateProduct({
          _id: updateData?._id,
          data: newData,
        });
        if (!res?.error) {
          toast.success("Product updated successfully", {
            id: "updated_product",
          });
        } else {
          toast.error("Something went wrong 😓", { id: "update_error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    } else {
      try {
        const res = await createProduct(newData);
        if (!res?.error) {
          toast.success("Product created successfully", {
            id: "created_product",
          });
          reset();
          dispatch(handleClearProduct());
        } else {
          toast.error("Something went wrong 😓", { id: "create_error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    }
  };

  useEffect(() => {
    for (const key in updateData) {
      if (Object.prototype.hasOwnProperty.call(updateData, key)) {
        if (key !== "_id") {
          setValue(key, updateData[key]);
        }
      }
    }

    if (updateData?._id) {
      const data = {
        keyFeatures: updateData.keyFeatures,
        description: updateData.description,
        additionalInfo: updateData.additionalInfo,
        productImages: updateData.productImages,
      };
      dispatch(handleSetUpdatedProduct(data));
    }
  }, [setValue, updateData, dispatch]);

  return (
    <div>
      <div className="h-40 bg-primary w-full"></div>
      <div className="p-5">
        <div className="w-full -mt-24 rounded-md overflow-hidden">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            onKeyDown={handleKeyDown}
            className="overflow-hidden flex flex-col gap-5"
          >
            <div className="border rounded-md overflow-hidden shadow bg-white">
              <div className="mb-5 bg-stech text-white p-3">
                <span>Basic Information</span>
              </div>
              <BasicInfo register={register} setValue={setValue} />
            </div>

            <div className="border rounded-md overflow-hidden shadow bg-white">
              <DescriptionInfo register={register} />
            </div>

            <div className="border rounded-md overflow-hidden shadow bg-white">
              <div className="mb-5 bg-stech text-white p-3">
                <span>Price and quantity</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <StockPriceAndQuantity register={register} />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden shadow bg-white">
              <div className="mb-5 bg-stech text-white p-3">
                <span>Additional Information</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <JoditTextArea
                  content={additionalInfo}
                  handleAdditional={handleAdditionalInfo}
                  height={"450px"}
                />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden shadow bg-white">
              <div className="mb-5 bg-stech text-white p-3">
                <span>Delivery Information</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <DeliveryInfo register={register} watch={watch} />
              </div>
            </div>
            <div className="flex flex-col items-end justify-end">
              <SubmitButton
                isLoading={createLoading || updateLoading}
                className="w-32"
              >
                Save
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AddProduct.propTypes = {
  updateData: PropTypes.object,
};

export default AddProduct;
