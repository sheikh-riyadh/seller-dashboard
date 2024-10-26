import { useState } from "react";
import ToCustomerTable from "../../../../components/Pages/OrderManagement/ManageOrder/ToCustomer/ToCustomerTable";
import Button from "../../../../components/Common/Button";

const ToCustomer = () => {
  const [productStatusOption, setProductStatusOption] = useState("pending");

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-x-5 px-5 pb-0 border-b">
          {["pending", "processing", "ready to ship", "delivered"]?.map(
            (item) => (
              <Button
                key={item}
                onClick={() => setProductStatusOption(item)}
                className={`border-b pb-3 cursor-pointer bg-transparent border-0 text-black rounded-none text-start w-auto p-0 py-3 ${
                  item === productStatusOption
                    ? "border-b border-primary text-primary"
                    : "border-transparent"
                }`}
              >
                <span className="uppercase">{item} </span>
              </Button>
            )
          )}
        </div>
        <ToCustomerTable />
      </div>
    </div>
  );
};

export default ToCustomer;
