import PropTypes from "prop-types";
import JoditTextArea from "../../Common/JoditTextArea";
import { handleDes } from "../../../store/features/product/productSlice";
import { useGetProduct } from "../../../hooks/useGetProduct";

const DescriptionInfo = () => {
  const { description } = useGetProduct()

  return (
    <div>
      <div className="mb-5 bg-stech text-white p-5">
        <span>Description</span>
      </div>
      <div className="flex flex-col gap-1 p-5">
        <span className="py-2 block font-medium text-sm">
          Long Description <span className="text-danger">*</span>
        </span>
        <div>
          <JoditTextArea handleDescription={handleDes} content={description} height={"450px"} />
        </div>
      </div>
    </div>
  );
};
DescriptionInfo.propTypes = {
  setContent: PropTypes.func,
  content: PropTypes.string,
};
export default DescriptionInfo;
