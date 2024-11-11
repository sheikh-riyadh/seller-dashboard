import { FaClipboard, FaTrash } from "react-icons/fa";
import Button from "../../components/Common/Button";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/Common/SubmitButton";
import TextArea from "../../components/Common/TextArea";
import { useGetUser } from "../../hooks/useGetUser";
import {
  useCreateAnnoucementMutation,
  useDeleteAnnoucementMutation,
  useGetAnnoucementQuery,
  useUpdateAnnoucementMutation,
} from "../../store/service/announcement/annoucementApi";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import DeleteModal from "../../components/Modal/DeleteModal";

const Announcement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useGetUser();

  const { data: announcementData, isLoading } = useGetAnnoucementQuery(
    user?._id
  );
  const [updateAnnouncement, { isLoading: updateLoading }] =
    useUpdateAnnoucementMutation();
  const [createAnnouncement, { isLoading: createLoading }] =
    useCreateAnnoucementMutation();
  const [deleteAnnouncement, { isLoading: deleteLoading }] =
    useDeleteAnnoucementMutation();

  const handleAnnouncement = async (data) => {
    if (announcementData?._id) {
      try {
        const res = await updateAnnouncement({
          _id: announcementData?._id,
          data: { ...data, sellerId: user?._id },
        });

        if (!res?.error) {
          toast.success("Updated announment successfully", {
            id: "success_announement",
          });
          setIsModalOpen(false);
        } else {
          toast.error("Something went wrong 😓", { id: "error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    } else {
      try {
        const res = await createAnnouncement({
          ...data,
          sellerId: user?._id,
        });

        if (!res?.error) {
          toast.success("Created announment successfully", {
            id: "success_announement",
          });
          setIsModalOpen(false);
        } else {
          toast.error("Something went wrong 😓", { id: "error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    }
  };

  useEffect(() => {
    setValue("announcement", announcementData?.announcement);
  }, [announcementData, setValue]);

  return (
    <div className="pb-8">
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>
      <div className="-mt-28 bg-white shadow-md border m-5 p-5 rounded-md">
        {!isLoading ? (
          <>
            <div className="flex flex-col items-end mb-5">
              <Button
                onClick={() => setIsModalOpen((prev) => !prev)}
                className="w-56"
              >
                {`${
                  announcementData?._id
                    ? "Update announcement"
                    : "Create announcement"
                }`}
              </Button>
            </div>
            {!announcementData?._id ? (
              <div className="flex gap-5 flex-col items-center justify-center w-full h-60 bg-white">
                <FaClipboard className="text-8xl text-slate" />
                <span className="font-medium text-xl text-danger capitalize">
                  No data found
                </span>
              </div>
            ) : (
              <div className="flex gap-5 flex-col items-center w-full h-80 bg-white">
                <div className="border w-full h-full p-5 rounded-md relative">
                  <span>{announcementData?.announcement}</span>

                  <div className="flex flex-col border justify-center items-center duration-300 absolute top-2 right-2 text-white w-7 h-7 p-1 bg-danger hover:opacity-70 rounded-full cursor-pointer">
                    <FaTrash
                      onClick={() => setIsDeleteModalOpen((prev) => !prev)}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          title={"Create announcement"}
          className="w-[450px]"
        >
          <form
            onSubmit={handleSubmit(handleAnnouncement)}
            className="flex flex-col gap-5"
          >
            <TextArea
              {...register("announcement")}
              label={"Announcement"}
              className="border bg-transparent h-36"
              required
            />
            <SubmitButton isLoading={createLoading || updateLoading}>
              {`${announcementData?._id ? "Update" : "Create"}`}
            </SubmitButton>
          </form>
        </Modal>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          deleteData={{ _id: announcementData?._id, sellerId: user?._id }}
          handleDeleteFunction={deleteAnnouncement}
          isLoading={deleteLoading}
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          key={"announcementDelete"}
        />
      )}
    </div>
  );
};

export default Announcement;
