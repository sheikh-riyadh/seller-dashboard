import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import ToCustomer from "./ToCustomer/ToCustomer";

const ManageOrder = () => {
  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        <div>
          <div className="flex items-center gap-3 justify-end">
            <Input
              placeholder="Search not available"
              className="bg-white w-full rounded-sm"
            />
            <Button className="w-36 py-2.5">Find Order</Button>
          </div>
        </div>
        <ToCustomer />
      </div>
    </div>
  );
};

export default ManageOrder;
