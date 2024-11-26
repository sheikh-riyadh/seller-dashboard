import React from "react";
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
  const { seller } = useGetSeller();

  return (
    <div className="w-full bg-widget text-white md:h-[550px]  col-span-9 gap-5 shadow-md md:pb-28 lg:pb-36 rounded-sm">
      <div className="flex gap-5 p-5 justify-between flex-wrap">
        <div className="flex flex-col gap-2">
          <span title={seller?.fullName} className="font-bold text-2xl">
            Welcome back{" "}
            {seller?.fullName?.length > 15
              ? `${seller?.fullName?.slice(0, 16)}..`
              : seller?.fullName}
          </span>
          <span className="">Take a look at the updated overview</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <FaCircle className="text-md rounded-full text-chart_2" />
            <span className=" text-[#98A4B5]">Order</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCircle className="text-md rounded-full text-chart_1" />
            <h1 className=" text-[#98A4B5]">Cancel order</h1>
          </div>
        </div>
      </div>

      <React.Fragment>
        <ResponsiveContainer>
          <BarChart width={750} height={600} data={analyticeData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} />
            <YAxis axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "var(--widget)",
                borderRadius: "10px",
              }}
            />
            <Bar name="Order" dataKey="pv" fill="#047857" barSize={13} />
            <Bar name="Cancel Order" dataKey="uv" fill="#FCFF66" barSize={13} />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    </div>
  );
};

OrderAndCancelletionGraph.propTypes = {
  analyticeData: PropTypes.array,
};

export default OrderAndCancelletionGraph;
