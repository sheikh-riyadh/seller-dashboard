import { FaCircle } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";
import { useGetSeller } from "../../../hooks/useGetSeller";

const OrderAndCancelletionGraph = ({ analyticeData }) => {

  const {seller}=useGetSeller()

  return (
    <div className="w-full bg-white h-[500px] col-span-9 gap-5 shadow-md pb-28 rounded-md border">
      <div className="flex gap-5 p-5 justify-between">
        <div className="flex flex-col gap-2">
          <span
          title={seller?.fullName}
          className="font-bold text-2xl">Welcome back {seller?.fullName?.length>15? `${seller?.fullName?.slice(0,16)}..`:seller?.fullName}</span>
          <span className="">Take a look at the updated overview</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <FaCircle className="text-md rounded-full text-[#8559E4]" />
            <span className=" text-[#98A4B5]">Order</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCircle className="text-md rounded-full text-[#E41272]" />
            <h1 className=" text-[#98A4B5]">Cancel order</h1>
          </div>
        </div>
      </div>

      <ResponsiveContainer>
        <BarChart
          width={799}
          height={600}
          data={analyticeData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} padding={{ left: 30 }} />
          <YAxis padding={{ top: 30, bottom: 30 }} axisLine={false} />
          <Tooltip />
          <Bar name="Order" dataKey="pv" fill="#8559E4" barSize={13} />
          <Bar name="Cancel Order" dataKey="uv" fill="#E41272" barSize={13} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

OrderAndCancelletionGraph.propTypes = {
  analyticeData: PropTypes.array,
};

export default OrderAndCancelletionGraph;
