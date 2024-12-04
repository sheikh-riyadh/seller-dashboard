import { useState } from "react";
import { useDeleteBrandMutation } from "../../../../store/service/brands/brandsApi";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import DeleteModal from "../../../Modal/DeleteModal";

const DeleteBrand = ({ email, _id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const query = new URLSearchParams({
    email,
    _id,
  }).toString();

  const [brandDelete, { isLoading }] = useDeleteBrandMutation();

  return (
    <>
      <span
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="text-danger cursor-pointer border border-danger text-center p-2 rounded-full hover:bg-red-300 hover:text-white duration-300"
        title="Delete"
      >
        <FaTrash />
      </span>
      <div>
        <DeleteModal
          deleteData={query}
          handleDeleteFunction={brandDelete}
          isLoading={isLoading}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};

DeleteBrand.propTypes = {
  email: PropTypes.string,
  _id: PropTypes.string,
};

export default DeleteBrand;
