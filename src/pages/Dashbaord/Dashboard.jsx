import CircleProgressbar from "../../components/Common/CircleProgressbar";
import OrderAndCancelletionGraph from "../../components/Pages/Dashboard/OrderAndCancelletionGraph";

const Dashboard = () => {
  return (
    <div>
      <div className="mb-10 grid grid-cols-12 gap-5 h-full p-5">
        <div className="col-span-9">
          <OrderAndCancelletionGraph />
        </div>
        <div className="col-span-3 flex flex-col gap-5 h-full">
          <div className="shadow-md border bg-white w-full h-full rounded-md flex flex-col items-center justify-center gap-3">
            <CircleProgressbar
              className={"text-4xl font-bold  text-[#8559E4]"}
              data={10}
              color="#8559E4"
            />
            <p className="text-center font-medium text-xl">
              {"New Order (Today)"}
            </p>
          </div>
          <div className="shadow-md border bg-white w-full h-full rounded-md flex flex-col items-center justify-center gap-3">
            <CircleProgressbar
              className={"text-4xl font-bold text-[#E41272]"}
              data={20}
              color="#E41272"
            />
            <p className="text-center font-medium text-xl">
              {"Cancel order (Today)"}
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
