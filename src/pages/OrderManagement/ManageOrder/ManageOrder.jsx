import { useState } from "react";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import ToCustomer from "./ToCustomer/ToCustomer";

const ManageOrder = () => {
  const [selectTabOption, setSelectTabOption] = useState("To Customer");

  return (
    <div className="px-5 flex flex-col gap-7">
      <span className="block text-xl font-bold pt-10">Manage Order</span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-x-3">
          <Input
            name="Search"
            type="text"
            placeholder="Search..."
            className="w-60 border bg-transparent"
          />
          <Button className="py-2.5 text-sm px-5">Search</Button>
        </div>
      </div>

      <div className="border shadow-sm flex flex-col gap-5">
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
  );
};

export default ManageOrder;
