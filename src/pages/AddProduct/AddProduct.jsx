import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import { useGetSeller } from "../../hooks/useGetSeller";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../store/service/product/productApi";

const AddProduct = () => {
  const { seller } = useGetSeller();
  const { keyFeatures, description, additionalInfo, productImages } =
    useGetProduct();
  const dispatch = useDispatch();

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();

  const navigate = useNavigate();

  const { handleSubmit, register, setValue, watch, reset } = useForm();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const location = useLocation();
  const updateData = location?.state?.payload;

  const handleOnSubmit = async (data) => {
    const newData = {
      ...data,
      productImages,
      keyFeatures,
      description,
      additionalInfo,
      sellerId: seller?._id,
      status: updateData?.status ? updateData?.status : "active",
      email: seller?.email,
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
        if (key === "_id" || key === "keyFeatures") {
          continue;
        } else {
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
    } else {
      dispatch(handleClearProduct());
      reset()
    }
  }, [setValue, updateData, dispatch,reset]);

  return (
    <div>
      <div className="p-5">
        <div className="w-full rounded-md overflow-hidden">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            onKeyDown={handleKeyDown}
            className="overflow-hidden flex flex-col gap-5"
          >
            <div className="rounded-md overflow-hidden shadow bg-widget">
              <div className="mb-5 bg-stech text-white p-5 flex items-center justify-between">
                <span>Basic Information</span>
                {updateData?._id && (
                  <span
                    onClick={() => navigate(-1)}
                    className="bg-white px-6 py-1 rounded-sm text-stech cursor-pointer"
                  >
                    Back
                  </span>
                )}
              </div>
              <BasicInfo register={register} setValue={setValue} />
            </div>

            <div className="rounded-md overflow-hidden shadow bg-widget">
              <DescriptionInfo />
            </div>

            <div className="rounded-md overflow-hidden shadow bg-widget">
              <div className="mb-5 bg-stech text-white p-5">
                <span>Price and quantity</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <StockPriceAndQuantity register={register} />
              </div>
            </div>

            <div className="rounded-md overflow-hidden shadow bg-widget">
              <div className="mb-5 bg-stech text-white p-5">
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

            <div className="rounded-md overflow-hidden shadow bg-widget">
              <div className="mb-5 bg-stech text-white p-5">
                <span>Delivery Information</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <DeliveryInfo register={register} watch={watch} />
              </div>
            </div>
            <div className="flex flex-col items-end justify-end">
              <SubmitButton
                isLoading={createLoading || updateLoading}
                className="w-40"
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

export default AddProduct;
