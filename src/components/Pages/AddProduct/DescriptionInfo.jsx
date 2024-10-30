import PropTypes from "prop-types";
import TextArea from "../../Common/TextArea";
import JoditTextArea from "../../Common/JoditTextArea";
import { handleDes } from "../../../store/features/product/productSlice";
import { useSelector } from "react-redux";

const DescriptionInfo = ({ register }) => {
  const { description } = useSelector(
    (state) => state.session.productReducer.value
  );

  return (
    <div>
      <div className="mb-5 bg-stech text-white p-3">
        <span>Description</span>
      </div>
      <div className="flex flex-col gap-1 p-5">
        <div>
          <TextArea
            className={"bg-white border h-36"}
            {...register("shortDescription")}
            required
            label={"Short Description (within 50 words)"}
          />
        </div>
        <span className="py-2 block font-medium">
          Product Description <span className="text-danger">*</span>
        </span>
        <div>
          <JoditTextArea handleDescription={handleDes} content={description} />
        </div>
      </div>
    </div>
  );
};
DescriptionInfo.propTypes = {
  register: PropTypes.func,
  setContent: PropTypes.func,
  content: PropTypes.string,
};
export default DescriptionInfo;
