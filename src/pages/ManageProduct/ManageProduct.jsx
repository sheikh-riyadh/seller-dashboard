import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import ProductTable from "../../components/Pages/ManageProduct/ProductTable";

const ManageProduct = () => {
  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <div className="p-5 flex flex-col gap-5 -mt-36">
        <div>
          <div className="flex items-center gap-3 justify-end">
            <Input placeholder="Search..." className="border bg-white w-full" />
            <Button className="w-36 py-2.5">Find Product</Button>
          </div>
        </div>
        <div className="shadow-md border rounded-md overflow-hidden">
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
