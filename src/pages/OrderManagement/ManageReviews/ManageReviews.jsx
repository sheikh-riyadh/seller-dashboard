import { useState } from "react";
import Button from "../../../components/Common/Button";
import Input from "../../../components/Common/Input";
import ManageReviewTable from "../../../components/OrderManagement/ManageReviews/ManageReviewTable";

const ManageReviews = () => {
  const [selectTabOption, setSelectTabOption] = useState(5);

  return (
    <div className="px-5 flex flex-col gap-7">
      <span className="block text-xl font-bold pt-10">Manage Reviews</span>
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
        <div className="flex items-center border-b">
          {[5, 4, 3, 2, 1].map((option) => (
            <Button
              key={option}
              className={`cursor-pointer p-5 bg-transparent border-0 rounded-none text-stech ${
                selectTabOption === option
                  ? "border-b-4 border-stech text-stech font-bold bg-gray-300"
                  : null
              }`}
              onClick={() => setSelectTabOption(option)}
            >
              <div className="flex items-center justify-center gap-3 text-md font-bold ">
                <p className="text-center w-8 h-8 border flex items-center justify-center rounded-full bg-stech text-white">
                  <span>{option}</span>
                </p>
                <span className="flex items-center gap-2">Star</span>
              </div>
            </Button>
          ))}
        </div>
        <div className="p-5">
          <ManageReviewTable />
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;
