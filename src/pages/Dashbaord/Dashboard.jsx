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
              className={"text-4xl font-bold  text-stech"}
              data={10}
              color="#081621"
            />
            <p className="text-center font-medium text-sm">
              {"New Order (Today)"}
            </p>
          </div>
          <div className="shadow-md border bg-white w-full h-full rounded-md flex flex-col items-center justify-center gap-3">
            <CircleProgressbar
              className={"text-4xl font-bold text-stech"}
              data={20}
              color="#081621"
            />
            <p className="text-center font-medium text-sm">
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
