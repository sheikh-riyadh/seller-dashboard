import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import { business } from "../../../data/business/business";
import BusinessInfo from "./BusinessInfo";
import { checkValue } from "../../../utils/checkInputFieldValue";
import { auth } from "../../../firebase/firebase.config";
import { useCreateSellerMutation } from "../../../store/service/seller/sellerApi";
import { addUser } from "../../../store/features/user/userSlice";

const Registrastion = () => {
  const [isNext, setIsNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register, watch } = useForm();
  const values = watch(["fullName", "email", "phoneNumber", "password"]);

  const navigate = useNavigate();
  const disptach = useDispatch();
  const [createSeller] = useCreateSellerMutation();

  const handleRegistration = async (data) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(data?.password)) {
      toast.error(
        "Password must be at least 8 characters,at least one letter, one number, and one special character",
        { id: "validation_error", duration: 7000 }
      );
      return;
    }

    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (result?.user?.accessToken && result.user.email) {
        const res = await createSeller(data);
        if (res?.data?.acknowledged) {
          disptach(addUser({ ...res?.data }));
          setIsLoading(false);
          navigate("/");
        } else {
          toast.error(res?.error?.data?.message, { id: "error" });
          deleteUser(result?.user)
            .then(() => {})
            .catch(() => {});
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        toast.error(`Email ${data?.email} already used`, { id: "email_error" });
      } else {
        toast.error("Something went wrong 😓", { id: "letter" });
      }

      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (checkValue(values)) {
      setIsNext(true);
    } else {
      toast.error("All fields are required", { id: "input_error" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full my_container">
      <div className="md:w-11/12 overflow-x-hidden lg:w-4/6 xl:w-7/12 bg-white border shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-y-auto  h-5/6 md:h-3/6 lg:h-[470px]">
        <div className="bg-stech md:rounded-r-[30%] flex flex-col gap-5 items-center justify-center p-7 text-center text-white relative ltr-animation">
          <Link to="/" title="Return main website">
            <FaHome className="text-5xl border p-2 rounded-full" />
          </Link>
          <h2 className="font-bold text-3xl capitalize">Welcome Back!</h2>
          <span>
            Enter your personal details to use all of the site features
          </span>
          <Link to="/sign-in">
            <Button className="uppercase w-40 bg-transparent border">
              Sign In
            </Button>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="flex flex-col items-center justify-center gap-5 w-full p-7"
        >
          <h1 className="font-bold text-3xl capitalize">Create Account</h1>
          <div className="w-full">
            {!isNext ? (
              <div className="w-full flex flex-col gap-5 rtl-animation">
                {business.registrationData.map(
                  ({ isRequired, placeholder, registerName, type }) => (
                    <Input
                      key={registerName}
                      {...register(registerName)}
                      placeholder={placeholder}
                      type={type}
                      required={isRequired}
                    />
                  )
                )}
              </div>
            ) : (
              <BusinessInfo
                register={register}
                setIsNext={setIsNext}
                watch={watch}
                isLoading={isLoading}
              />
            )}
            <div className={`${isNext?"hidden":"block"}`}>
              <span className="text-xs">
                Password must be at least 8 characters, one letter, one
                number, and one special character
              </span>
            </div>
          </div>
          {!isNext && (
            <div
              onClick={handleNext}
              className="font-medium uppercase text-sm border w-full text-center p-2.5 rounded-md bg-stech text-white cursor-pointer"
            >
              Next
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Registrastion;
