import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGooglePlusG, FaHome } from "react-icons/fa";
import Input from "../../Common/Input";
import Button from "../../Common/Button";
import { Link } from "react-router-dom";

const LogIn = () => {
  const { handleSubmit, register } = useForm();

  const handleLogin = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full my_container">
      <div className="md:w-4/5 lg:w-4/6 xl:w-7/12 bg-white border shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden md:h-2/5 lg:h-[420px] xl:h-4/6">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col items-center justify-center gap-5 w-full p-7"
        >
          <h1 className="font-bold text-3xl capitalize">Sign In</h1>
          <div className="flex items-center gap-3">
            <FaGooglePlusG className="border text-3xl p-1 rounded-md" />
            <FaFacebookF className="border text-3xl p-1 rounded-md" />
            <FaGithub className="border text-3xl p-1 rounded-md" />
          </div>
          <div className="w-full flex flex-col gap-5">
            <Input
              {...register("email")}
              placeholder="Email *"
              type="email"
              required
            />
            <Input
              {...register("password")}
              placeholder="*******"
              type="password"
              required
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-sm">Forget Your Password?</span>
            <Button>Sign In</Button>
          </div>
        </form>
        <div className="bg-secondary md:rounded-l-[30%] flex flex-col gap-5 items-center justify-center p-7 text-center text-white order-first md:order-none rtl-animation relative">
          <Link to="/" title="Return main website">
            <FaHome className="text-5xl border p-2 rounded-full" />
          </Link>
          <h2 className="font-bold text-3xl capitalize">Hello, Friend</h2>
          <span>
            Register with your personal details to use all of the site features
          </span>
          <Link to="/sign-up">
            <Button className="uppercase w-32">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
