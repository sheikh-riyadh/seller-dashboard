import { useState } from "react";
import JoditTextArea from "../../components/Common/JoditTextArea";

const ReturnPolicy = () => {
  const [content, setContent] = useState();

  return (
    <div>
      <JoditTextArea
        content={content}
        setContent={setContent}
        height={"1000"}
        toolbarStickyOffset={60}
      />
    </div>
  );
};

export default ReturnPolicy;
