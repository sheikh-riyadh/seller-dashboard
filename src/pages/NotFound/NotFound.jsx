import { Link } from "react-router-dom";
import not_found from "../../assets/not_found.png"
import Button from "../../components/Common/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen my_container">
      <div className="grid grid-cols-3 items-center justify-items-center">
        <span className="text-9xl md:text-[200px] font-bold text-white">
          4
        </span>
        <img className="w-60" src={not_found} alt="not_found" />
        <span className="text-9xl md:text-[200px] font-bold text-white">
          4
        </span>
      </div>
      <div className="flex flex-col gap-5 md:gap-7 items-center justify-center">
        <span className="text-2xl md:text-4xl font-semibold text-white">
          Oops...! Page Not Found
        </span>
        <Link to="/">
          <Button className="w-36 py-3">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
