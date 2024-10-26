import { useState } from "react";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import ToCustomer from "./ToCustomer/ToCustomer";

const ManageOrder = () => {
  const [selectTabOption, setSelectTabOption] = useState("To Customer");

  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <div className="p-5 flex flex-col gap-5 -mt-36">
        <div>
          <div className="flex items-center gap-3 justify-end">
            <Input placeholder="Search..." className="border bg-white w-full" />
            <Button className="w-36 py-2.5">Find Order</Button>
          </div>
        </div>
        <div className="shadow-md border rounded-md overflow-hidden">
          <div className="flex flex-col gap-5 bg-white rounded-md border shadow-md">
            <div className="grid grid-cols-3 border-b">
              {["To Customer", "Back to You", "Closed"].map((option) => (
                <Button
                  key={option}
                  className={`cursor-pointer p-5 bg-transparent border-0 rounded-none text-stech ${
                    selectTabOption === option
                      ? "border-b-4 border-stech text-stech font-bold bg-gray-300"
                      : null
                  }`}
                  onClick={() => setSelectTabOption(option)}
                >
                  <span className="block text-center">{option}</span>
                </Button>
              ))}
            </div>
            <div className="p-5">
              {selectTabOption === "To Customer" ? (
                <ToCustomer />
              ) : selectTabOption === "Back to You" ? (
                <ToCustomer />
              ) : (
                <ToCustomer />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
