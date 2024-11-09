import Button from "../../components/Common/Button";
import { SiAdblock } from "react-icons/si";
// import { useGetSellerQuery } from "../../store/service/seller/sellerApi";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Block = () => {
  // const navigate = useNavigate();
  // const { user } = useSelector(
  //   (state) => state?.local?.sellerUserReducer?.value || {}
  // );
  // const { data } = useGetSellerQuery(user?.email);
  // data?.status === "active" && navigate("/sign-in");

  return (
    <div className="flex flex-col items-center justify-center h-svh bg-primary">
      <div className="grid md:grid-cols-2 w-7/12 md:w-11/12 lg:w-9/12 xl:w-7/12 items-center justify-center">
        <div className="w-full h-full">
          <SiAdblock className="text-[350px] text-white" />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold leading-snug text-white">{`Account is currently blocked`}</h1>
          <span className="text-white text-lg">
            {`Your account is currently blocked, and we'll notify you once it's fully activated.`}
          </span>
          <Button className="p-3 cursor-default">blocked</Button>
        </div>
      </div>
    </div>
  );
};

export default Block;
