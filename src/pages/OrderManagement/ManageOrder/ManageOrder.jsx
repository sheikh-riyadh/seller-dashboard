import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import ToCustomer from "./ToCustomer/ToCustomer";

const ManageOrder = () => {
  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <div className="p-5 flex flex-col gap-5 -mt-36">
        <div>
          <div className="flex items-center gap-3 justify-end">
            <Input placeholder="Search not available" className="border bg-white w-full" />
            <Button className="w-36 py-2.5">Find Order</Button>
          </div>
        </div>
        <ToCustomer />
      </div>
    </div>
  );
};

export default ManageOrder;
