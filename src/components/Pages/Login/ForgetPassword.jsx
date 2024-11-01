import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import PropTypes from "prop-types";
import SubmitButton from "../../Common/SubmitButton";
import Input from "../../Common/Input";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebase/firebase.config";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleForgetPassword = async ({ email }) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(`Please check your email ${email}`, {
        id: "send_success",
        duration: 4000,
      });
      setIsLoading(false);
    } catch (error) {
      if (error.message)
        toast.error("Something went wrong please try again letter.", {
          id: "send_faild",
        });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleForgetPassword)}>
        <Input
          {...register("email")}
          label="Please enter your email"
          required
          placeholder="example@gmail.com"
          type="email"
        />
        <SubmitButton isLoading={isLoading} className="mt-4">
          send
        </SubmitButton>
      </form>
    </div>
  );
};

ForgetPassword.propTypes = {
  isLoading: PropTypes.bool,
};
export default ForgetPassword;
