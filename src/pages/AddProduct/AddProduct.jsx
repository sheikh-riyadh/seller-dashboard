import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import BasicInfo from "../../components/Pages/AddProduct/BasicInfo";
import DescriptionInfo from "../../components/Pages/AddProduct/DescriptionInfo";
import StockPriceAndQuantity from "../../components/Pages/AddProduct/StockPriceAndQuantity";
import JoditTextArea from "../../components/Common/JoditTextArea";
import DeliveryInfo from "../../components/Pages/AddProduct/DeliveryInfo";
import Button from "../../components/Common/Button";
import { handleAdditionalInfo } from "../../store/features/product/productSlice";

const AddProduct = () => {
  const { keyFeatures, description, additionalInfo } = useSelector(
    (state) => state.session.sellerProductReducer.value
  );

  const { handleSubmit, register, setValue, watch } = useForm();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleOnSubmit = (data) => {
    if (!keyFeatures.length || !description.length > 50) {
      toast.error("Please filup all required value");
      return;
    }
    console.log({ ...data, keyFeatures, description, additionalInfo });
  };

  return (
    <div>
      <div className="h-40 bg-primary w-full"></div>
      <div className="p-5">
        <div className="shadow w-full -mt-24 bg-white rounded-md overflow-hidden p-10">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            onKeyDown={handleKeyDown}
            className="overflow-hidden flex flex-col gap-5"
          >
            <div className="border rounded-md overflow-hidden">
              <div className="mb-5 bg-stech text-white p-3">
                <span>Basic Information</span>
              </div>
              <BasicInfo register={register} setValue={setValue} />
            </div>

            <div className="border rounded-md overflow-hidden">
              <DescriptionInfo register={register} />
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="mb-5 bg-stech text-white p-3">
                <span>Price and quantity</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <StockPriceAndQuantity register={register} />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="mb-5 bg-stech text-white p-3">
                <span>Additional Information</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <JoditTextArea
                  content={additionalInfo}
                  handleAdditional={handleAdditionalInfo}
                />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="mb-5 bg-stech text-white p-3">
                <span>Delivery Information</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <DeliveryInfo register={register} watch={watch} />
              </div>
            </div>
            <Button className="w-32">Upload</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
