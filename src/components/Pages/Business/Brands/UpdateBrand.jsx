import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../../../Modal/Modal";
import BrandForm from "./BrandForm";
import PropTypes from "prop-types";

const UpdateBrand = ({ item,seller }) => {
  const [isModalOpen, setIsModalOpen] = useState();
  return (
    <>
      <span
        onClick={() => {
          setIsModalOpen((prev) => !prev);
        }}
        className="text-stech cursor-pointer border border-stech text-center p-2 rounded-full"
        title="Update"
      >
        <FaEdit />
      </span>
      <div>
        {isModalOpen && (
          <Modal
            title={"Add Brand"}
            className="w-[350px] lg:w-[500px]"
            onClose={setIsModalOpen}
            isOpen={isModalOpen}
          >
            <BrandForm setIsModalOpen={setIsModalOpen} updateData={item} seller={seller} />
          </Modal>
        )}
      </div>
    </>
  );
};

UpdateBrand.propTypes = {
  item: PropTypes.object,
  seller:PropTypes.object
};

export default UpdateBrand;
