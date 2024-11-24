import PropTypes from "prop-types";
import { useState } from "react";
import { FaBinoculars } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import Modal from "../../../Modal/Modal";
import UserImage from "./UserImage";
import UserDetailsRight from "./UserDetailsRight";

const ReviewView = ({ item }) => {
  const [isView, setIsView] = useState(false);

  const newData = {
    fullName: item?.userInfo.fName + "" + item?.userInfo?.lName,
    phone: item?.userInfo.phone,
    status: item?.userInfo?.status,
    role: item?.userInfo.role,
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <span
          title="Review Overview"
          onClick={() => setIsView((prev) => !prev)}
          className="text-stech cursor-pointer border border-stech text-center p-2 rounded-full"
        >
          <FaBinoculars />
        </span>
      </div>

      {isView && (
        <Modal
          isOpen={isView}
          onClose={setIsView}
          title={"Review overview"}
          key={"order_manage"}
          className={"w-[900px] h-[470px]"}
        >
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-3">
                <UserImage data={item?.userInfo?.photo} />
              </div>
              <div className="col-span-9">
                <UserDetailsRight data={newData} />
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(item?.rating?.rating).keys()]?.map((rating) => (
                <FaStar key={rating} className="text-stech" />
              ))}
            </div>

            <div className="border h-32 rounded-md p-3 font-bold shadow-md">
              <span>{item?.reviewMessage}</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

ReviewView.propTypes = {
  item: PropTypes.object,
};
export default ReviewView;
