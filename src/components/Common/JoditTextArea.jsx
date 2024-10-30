import { useRef, useMemo } from "react";
import PropTypes from "prop-types";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import {
  handleAdditionalInfo,
  handleDes,
} from "../../store/features/product/productSlice";

const JoditTextArea = ({
  content,
  setContent,
  handleDescription,
  handleAdditional,
  height,
  toolbarStickyOffset,
}) => {
  const editor = useRef(null);

  const dispatch = useDispatch();

  const handleJodit = (newContent) => {
    if (handleAdditional) {
      dispatch(handleAdditionalInfo(newContent));
    } else if (handleDescription) {
      dispatch(handleDes(newContent));
    } else {
      setContent(newContent);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
      required: true,
      height,
      toolbarStickyOffset,
    }),
    [height, toolbarStickyOffset]
  );
  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => handleJodit(newContent)}
    />
  );
};

JoditTextArea.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
  height: PropTypes.string,
  toolbarStickyOffset: PropTypes.number,
  handleDescription: PropTypes.func,
  handleAdditional: PropTypes.func,
};
export default JoditTextArea;
