import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useDeleteProductMutation } from "../../../store/service/product/productApi";
import DeleteModal from "../../Modal/DeleteModal";

const DeleteProduct = ({ user, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  return (
    <>
      <span
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="text-danger cursor-pointer border border-danger text-center p-2 rounded-full hover:bg-red-300 hover:text-white duration-300"
        title="Delete"
      >
        <FaTrash />
      </span>

      {isModalOpen && (
        <DeleteModal
          deleteData={{ _id: id, sellerId: user?._id }}
          handleDeleteFunction={deleteProduct}
          isLoading={isLoading}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          key={"delete_modal"}
        />
      )}
    </>
  );
};

DeleteProduct.propTypes = {
  user: PropTypes.object,
  id: PropTypes.string,
};

export default DeleteProduct;
