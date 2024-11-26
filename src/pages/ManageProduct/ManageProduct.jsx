import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import ProductTable from "../../components/Pages/ManageProduct/ProductTable";

const ManageProduct = () => {
  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        <div>
          <div className="flex items-center gap-3 justify-end">
            <Input
              placeholder="Search not available"
              className="bg-white w-full"
            />
            <Button className="w-36 py-2.5">Find Product</Button>
          </div>
        </div>
        <div className="shadow-md overflow-hidden">
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
