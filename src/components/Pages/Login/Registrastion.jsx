import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import { business } from "../../../data/business/business";
import BusinessInfo from "./BusinessInfo";
import { checkValue } from "../../../utils/checkInputFieldValue";
import { auth } from "../../../firebase/firebase.config";
import { useCreateSellerMutation } from "../../../store/service/seller/sellerApi";
import { useDispatch } from "react-redux";
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
          toast.error("Something went wrong", { id: "error" });
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        toast.error(`Email ${data?.email} already used`, { id: "email_error" });
      } else {
        toast.error("Something went wrong please try again letter", {
          id: "try_again_letter",
        });
      }

      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (checkValue(values)) {
      setIsNext(true);
    } else {
      toast.error("All field are required", { id: "input_error" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full my_container">
      <div className="md:w-4/5 lg:w-4/6 xl:w-7/12 bg-white border shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden md:h-2/5 lg:h-[420px] xl:h-4/6">
        <div className="bg-secondary md:rounded-r-[30%] flex flex-col gap-5 items-center justify-center p-7 text-center text-white relative ltr-animation">
          <Link to="/" title="Return main website">
            <FaHome className="text-5xl border p-2 rounded-full" />
          </Link>
          <h2 className="font-bold text-3xl capitalize">Welcome Back!</h2>
          <span>
            Enter your personal details to use all of the site features
          </span>
          <Link to="/sign-in">
            <Button className="uppercase w-32">Sign In</Button>
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
