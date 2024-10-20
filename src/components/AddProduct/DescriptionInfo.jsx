import PropTypes from "prop-types";
import JoditTextArea from "../Common/JoditTextArea";
import TextArea from "../Common/TextArea";
const DescriptionInfo = ({ register, content, setContent }) => {
  return (
    <div>
      <div className="mb-5 bg-stech text-white p-2">
        <span>Description</span>
      </div>
      <div className="flex flex-col gap-1 p-5">
        <div>
          <TextArea
            className={"bg-white border h-36"}
            {...register("short-description")}
            required
            label={"Short Description (within 50 words)"}
          />
        </div>
        <span className="py-2 block font-medium">
          Product Description <span className="text-danger">*</span>
        </span>
        <div>
          <JoditTextArea content={content} setContent={setContent} />
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
