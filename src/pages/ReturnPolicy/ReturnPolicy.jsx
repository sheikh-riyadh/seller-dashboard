import { useState } from "react";
import JoditTextArea from "../../components/Common/JoditTextArea";
import SubmitButton from "../../components/Common/SubmitButton";
import { useGetUser } from "../../hooks/useGetUser";

const ReturnPolicy = () => {
  const [content, setContent] = useState();

  const { user } = useGetUser();

  const handleReturnPolicy = () => {
    
  };

  return (
    <div className="flex flex-col gap-5 shadow-md m-5 p-5 bg-white border rounded">
      <JoditTextArea
        content={content}
        setContent={setContent}
        height={"500"}
        toolbarStickyOffset={60}
      />

      <div className="mt-5 flex flex-col items-end">
        <SubmitButton onClick={handleReturnPolicy} className="px-10 py-2 w-32">
          Save
        </SubmitButton>
      </div>
    </div>
  );
};

export default ReturnPolicy;
