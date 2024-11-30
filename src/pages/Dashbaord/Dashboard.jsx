import moment from "moment";
import CircleProgressbar from "../../components/Common/CircleProgressbar";
import OrderAndCancelletionGraph from "../../components/Pages/Dashboard/OrderAndCancelletionGraph";
import { useGetSeller } from "../../hooks/useGetSeller";
import { useGetAnalyticeDataQuery } from "../../store/service/order/orderApi";

const Dashboard = () => {
  const { seller } = useGetSeller();
  const query = new URLSearchParams({
    sellerId: seller?._id,
    email:seller?.email
  }).toString();
  const { data } = useGetAnalyticeDataQuery(query);

  const cancelledOrder = data?.filter((order) => order?.status === "cancelled");
  const order = data?.filter((order) => order?.status !== "cancelled");

  const todayCancelled = cancelledOrder?.reduce((total, item) => {
    if (item?.date === moment().format("D")) {
      return total + 1;
    }
    return total;
  }, 0);

  const todayOrder = order?.reduce((total, item) => {
    if (item?.date === moment().format("D")) {
      return total + 1;
    }
    return total;
  }, 0);

  const analytice = [
    { name: "Jan", uv: 0, pv: 0 },
    { name: "Feb", uv: 0, pv: 0 },
    { name: "Mar", uv: 0, pv: 0 },
    { name: "Apr", uv: 0, pv: 0 },
    { name: "May", uv: 0, pv: 0 },
    { name: "Jun", uv: 0, pv: 0 },
    { name: "Jul", uv: 0, pv: 0 },
    { name: "Aug", uv: 0, pv: 0 },
    { name: "Sep", uv: 0, pv: 0 },
    { name: "Oct", uv: 0, pv: 0 },
    { name: "Nov", uv: 0, pv: 0 },
    { name: "Dec", uv: 0, pv: 0 },
  ];

  data?.forEach((order) => {
    const monthData = analytice.find(
      (month) =>
        month.name === order.month && order?.year === moment().format("YYYY")
    );

    if (monthData) {
      monthData.pv += 1;

      if (order.status === "cancelled") {
        monthData.uv += 1;
      }
    }
  });

  return (
    <div>
      <div className="mb-10 grid xl:grid-cols-12 gap-5 h-full p-5">
        <div className="xl:col-span-9">
          <OrderAndCancelletionGraph analyticeData={analytice} />
        </div>
        <div className="xl:col-span-3 grid grid-cols-2 xl:grid-cols-1 gap-5 h-full">
          <div className="shadow-md bg-widget w-full h-full rounded-sm flex flex-col items-center justify-center gap-3 p-5">
            <CircleProgressbar
              className={"text-4xl font-bold  text-white"}
              data={todayOrder}
              color="#047857"
            />
            <p className="text-center font-medium text-sm text-white">
              {"New Order"}
            </p>
          </div>
          <div className="shadow-md bg-widget w-full h-full rounded-sm flex flex-col items-center justify-center gap-3 p-5">
            <CircleProgressbar
              className={"text-4xl font-bold text-white"}
              data={todayCancelled}
              color="#fcff66"
            />
            <p className="text-center font-medium text-sm text-white">
              {"Cancel order"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
