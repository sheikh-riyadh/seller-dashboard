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

const OrderAndCancelletionGraph = () => {
  const data = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "March", uv: 2000, pv: 9800, amt: 2290 },
    { name: "May", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Jun", uv: 1890, pv: 4800, amt: 2181 },
    { name: "July", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Oct", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Nov", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Dec", uv: 3490, pv: 4300, amt: 2100 },
  ];
  return (
    <div className="w-full bg-white h-[500px] col-span-9 gap-5 shadow-md pb-28 rounded-md border">
      <div className="flex gap-5 p-5 justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">Welcome back Sheikh Riyadh</span>
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
          data={data}
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

export default OrderAndCancelletionGraph;
