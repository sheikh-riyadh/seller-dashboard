import { useState } from "react";
import ToCustomerTable from "../../../../components/Pages/OrderManagement/ManageOrder/ToCustomer/ToCustomerTable";
import Button from "../../../../components/Common/Button";
import { useGetSeller } from "../../../../hooks/useGetSeller";
import { useGetOrderQuery } from "../../../../store/service/order/orderApi";
import LoadingSpinner from "../../../../components/Common/LoadingSpinner";

const ToCustomer = () => {
  const [status, setStatus] = useState("pending");
  const { seller } = useGetSeller();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    status,
  });

  const { data, isLoading } = useGetOrderQuery(query.toString());

  return (
    <div className="rounded-sm overflow-hidden">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-x-5 p-5 pl-0 pb-0 flex-wrap">
          {[
            "pending",
            "processing",
            "ready to ship",
            "delivered",
            "cancelled",
            "completed",
          ]?.map((item) => (
            <Button
              key={item}
              onClick={() => setStatus(item)}
              className={`text-lg pb-3 text-white cursor-pointer bg-transparent border-0 rounded-none text-start w-auto p-0 py-3 ${
                item === status
                  ? "border-b border-accent"
                  : "border-transparent"
              }`}
            >
              <span className="uppercase">{item} </span>
            </Button>
          ))}
        </div>
        {!isLoading ? (
          <ToCustomerTable data={data} />
        ) : (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ToCustomer;
