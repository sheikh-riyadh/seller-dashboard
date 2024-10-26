import { useState } from "react";
import Button from "../../../components/Common/Button";
import Input from "../../../components/Common/Input";
import ManageReviewTable from "../../../components/Pages/OrderManagement/ManageReviews/ManageReviewTable";

const ManageReviews = () => {
  const [selectTabOption, setSelectTabOption] = useState(5);

  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <div className="p-5 flex flex-col gap-5 -mt-36">
        <div>
          <div className="flex items-center gap-3 justify-end">
            <Input placeholder="Search..." className="border bg-white w-full" />
            <Button className="w-36 py-2.5">Find review</Button>
          </div>
        </div>
        <div className="shadow-md border rounded-md overflow-hidden bg-white">
          <div className="flex flex-col gap-5">
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
      </div>
    </div>
  );
};

export default ManageReviews;