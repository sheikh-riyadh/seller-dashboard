import { useState } from "react";
import Button from "../../components/Common/Button";
import Modal from "../../components/Modal/Modal";
import BrandsTable from "../../components/Pages/Business/Brands/BrandsTable";
import BrandForm from "../../components/Pages/Business/Brands/BrandForm";
import { useGetSeller } from "../../hooks/useGetSeller";

const BrandInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { seller } = useGetSeller();

  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex items-end justify-end">
          <div>
            <Button
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="w-36"
            >
              Add Brand
            </Button>
          </div>
        </div>
        <div className="shadow-md rounded-md overflow-hidden">
          <BrandsTable />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={"Add Brand"}
          className="w-[500px]"
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
