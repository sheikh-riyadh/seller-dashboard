import { useEffect, useState } from "react";
import JoditTextArea from "../../components/Common/JoditTextArea";
import SubmitButton from "../../components/Common/SubmitButton";
import { useGetUser } from "../../hooks/useGetUser";
import {
  useCreateReturnPolicyMutation,
  useGetReturnPolicyQuery,
  useUpdateReturnPolicyMutation,
} from "../../store/service/returnPolicy/returnPolicyApi";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const ReturnPolicy = () => {
  const [content, setContent] = useState();

  const { user } = useGetUser();

  const { data: policyData, isLoading: policyLoading } =
    useGetReturnPolicyQuery(user?._id);
  const [createPolicy, { isLoading: createLoading }] =
    useCreateReturnPolicyMutation();
  const [updatePolicy, { isLoading: updateLoading }] =
    useUpdateReturnPolicyMutation();

  const handleReturnPolicy = async () => {
    if (content?.length <50) {
      toast.error("Policy is required", { id: "policy_error" });
      return;
    }

    const data = { content, sellerId: user?._id };

    if (policyData?._id) {
      try {
        const res = await updatePolicy({ _id: policyData?._id, data });
        if (!res?.error) {
          toast.success("Updated return policy successfully ", {
            id: "success",
          });
        } else {
          toast.error("Something went wrong 😓", { id: "error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    } else {
      try {
        const res = await createPolicy(data);
        if (!res?.error) {
          toast.success("Created return policy successfully ", {
            id: "success",
          });
        } else {
          toast.error("Something went wrong 😓", { id: "error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    }
  };

  useEffect(() => {
    if (policyData?._id) {
      setContent(policyData?.content);
    }
  }, [policyData]);

  return (
    <div className="shadow-md m-5 p-5 bg-white border rounded">
      {!policyLoading ? (
        <div className="flex flex-col gap-5">
          <JoditTextArea
            content={content}
            setContent={setContent}
            height={"500"}
            toolbarStickyOffset={60}
          />

          <div className="mt-5 flex flex-col items-end">
            <SubmitButton
              isLoading={updateLoading || createLoading}
              onClick={handleReturnPolicy}
              className="px-10 py-2 w-32"
            >
              Save
            </SubmitButton>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ReturnPolicy;
