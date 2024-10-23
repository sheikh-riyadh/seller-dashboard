import { useState } from "react";
import { useForm } from "react-hook-form";
import BasicInfo from "../../components/AddProduct/BasicInfo";
import DescriptionInfo from "../../components/AddProduct/DescriptionInfo";
import StockPriceAndQuantity from "../../components/AddProduct/StockPriceAndQuantity";
import JoditTextArea from "../../components/Common/JoditTextArea";
import DeliveryInfo from "../../components/AddProduct/DeliveryInfo";
import toast from "react-hot-toast";
import Button from "../../components/Common/Button";

const AddProduct = () => {
  const [keyFeatures, setKeyFeatures] = useState([]);
  const [description, setDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const { handleSubmit, register, setValue, watch } = useForm();

  const handleProductKeyFeature = (event) => {
    if (event.key === "Enter") {
      const data = event.target.value;
      if (!keyFeatures.includes(data)) {
        setKeyFeatures((prev) => [...prev, data]);
        setValue("keyFeatures");
      }
    }
  };

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

  const handleDeleteKeyFeatures = (deleteFeatureItem) => {
    const restFeatures = keyFeatures.filter(
      (feature) => feature != deleteFeatureItem
    );
    setKeyFeatures(restFeatures);
  };

  return (
    <div>
      <div className="h-40 bg-primary w-full"></div>
      <div className="my_container">
        <div className="shadow w-full -mt-24 bg-white rounded-md overflow-hidden p-10">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            onKeyDown={handleKeyDown}
            className="overflow-hidden flex flex-col gap-5"
          >
            <div className="border rounded-md overflow-hidden">
              <div className="mb-5 bg-stech text-white p-2">
                <span>Basic Information</span>
              </div>
              <BasicInfo
                handleDeleteKeyFeatures={handleDeleteKeyFeatures}
                handleProductKeyFeature={handleProductKeyFeature}
                productKeyFeatures={keyFeatures}
                register={register}
              />
            </div>

            <div className="border rounded-md overflow-hidden">
              <DescriptionInfo
                content={description}
                register={register}
                setContent={setDescription}
              />
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="mb-5 bg-stech text-white p-2">
                <span>Price and quantity</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <StockPriceAndQuantity register={register} />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="mb-5 bg-stech text-white p-2">
                <span>Additional Information</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <JoditTextArea
                  content={additionalInfo}
                  setContent={setAdditionalInfo}
                />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="mb-5 bg-stech text-white p-2">
                <span>Delivery Information</span>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <DeliveryInfo register={register} watch={watch} />
              </div>
            </div>
            <Button>Upload</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
