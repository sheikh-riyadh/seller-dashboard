import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import Modal from "../../Modal/Modal";

const MessageList = ({ messages = [], setIsModalOpen, isModalOpen }) => {
  const [seeMessageModal, setSeeMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsModalOpen, isModalOpen]);

  return (
    <div className="z-50 absolute right-0 top-10" ref={modalRef}>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-lg bg-[#1c2822] p-5 rounded-lg shadow-lg w-80 md:w-96">
          <div className="max-h-[400px] overflow-y-auto bar-hidden flex flex-col gap-4">
            {messages?.map((message) => (
              <div
                onClick={() => {
                  setSeeMessageModal((prev) => !prev),
                    setSelectedMessage(message);
                }}
                key={message?._id}
                className="p-4 border cursor-pointer border-gray-200 rounded-lg flex items-start space-x-3"
              >
                <div className="flex-shrink-0 mt-1 text-accent">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {message.title?.length > 30
                      ? `${message?.title?.slice(0, 30)}...`
                      : message.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {message.message?.length > 50
                      ? `${message?.message?.slice(0, 50)}...`
                      : message.message}
                  </p>
                  <p className="text-xs text-gray-400">{message.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {seeMessageModal && (
        <Modal
          isOpen={seeMessageModal}
          onClose={setSeeMessageModal}
          className={"md:w-[400px] max-h-[400px]"}
          title={selectedMessage?.title}
        >
          <div className="bg-widget w-full h-full p-5 rounded-md">
            <span className="font-medium text-white">
              {selectedMessage?.message}
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};

export default MessageList;
