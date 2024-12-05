import { useState } from "react";
import Button from "../../components/Common/Button";
import Modal from "../../components/Modal/Modal";
import BrandsTable from "../../components/Pages/Business/Brands/BrandsTable";
import BrandForm from "../../components/Pages/Business/Brands/BrandForm";
import { useGetSeller } from "../../hooks/useGetSeller";
import Input from "../../components/Common/Input";
import { useSearchDelay } from "../../hooks/useSearchDelay";

const BrandInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { seller } = useGetSeller();

  const { handleChange, searchValue } = useSearchDelay();

  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex items-end justify-end">
          <div className="flex items-center gap-5">
            <Input
              onChange={handleChange}
              placeholder="Search..."
              className="bg-white w-full"
            />
            <Button
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="w-36"
            >
              Add Brand
            </Button>
          </div>
        </div>
        <div className="shadow-md rounded-md overflow-hidden">
          <BrandsTable search={searchValue} />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={"Add Brand"}
          className="w-[350px] lg:w-[500px]"
          onClose={setIsModalOpen}
          isOpen={isModalOpen}
        >
          <BrandForm seller={seller} setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </div>
  );
};

export default BrandInformation;
