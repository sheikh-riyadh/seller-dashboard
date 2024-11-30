import { FaBars, FaBell, FaHome, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useGetSeller } from "../../hooks/useGetSeller";
import { useState } from "react";
import { useQuestion } from "../../hooks/useQuestion";
import { MdQuestionAnswer } from "react-icons/md";
import { useDispatch } from "react-redux";
import { handleIsClicked } from "../../store/features/questionAnswer/questionAnswerSlice";
import { useGetAdminMessageQuery } from "../../store/service/adminMessage/adminMessageApi";
import moment from "moment";
import MessageList from "../Pages/AdminMessage/MessageList";
import MobileSidebar from "../Mobile/MobileSidebar";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminMessageModal, setAdminMessageModal] = useState(false);

  const { seller } = useGetSeller();
  const query = new URLSearchParams({
    email: seller?.email,
  }).toString();

  const { data: MessageData, isLoading: MessageLoading } =
    useGetAdminMessageQuery(query);

  const todayMessages = MessageData?.filter(
    (message) => message?.date === moment().format("L")
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showSize, isClicked } = useQuestion();

  return (
    <header className="w-full sticky top-0 bg-widget z-50 p-2.5">
      <nav className="flex items-center justify-between px-8 w-full">
        <div>
          <FaBars
            onClick={() => setIsModalOpen((prev) => !prev)}
            className="block lg:hidden  text-2xl text-white"
          />
        </div>
        <div className="flex items-center gap-3">
          <div
            className="relative cursor-pointer block lg:hidden"
            onClick={() => setAdminMessageModal((prev) => !prev)}
          >
            <div>
              <FaBell className="text-4xl bg-[#171f12] text-white p-2 rounded-full" />
            </div>
            {!MessageLoading && (
              <>
                {todayMessages?.length ? (
                  <div className="absolute -top-4 w-5 h-5 bg-accent flex flex-col items-center justify-center rounded-full text-white">
                    <span>{todayMessages?.length}</span>
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div
            onClick={() => {
              dispatch(handleIsClicked()), navigate("/question-answer");
            }}
            className="relative cursor-pointer block lg:hidden"
          >
            <div>
              <MdQuestionAnswer className="text-4xl bg-[#171f12] p-2 rounded-full text-white" />
            </div>
            <>
              {!isClicked && showSize ? (
                <div className="absolute -top-1 w-5 h-5 bg-accent flex flex-col items-center justify-center rounded-full text-white">
                  <span>{showSize}</span>
                </div>
              ) : showSize ? (
                <div className="absolute -top-1 w-5 h-5 bg-accent flex flex-col items-center justify-center rounded-full text-white">
                  <span>{showSize}</span>
                </div>
              ) : null}
            </>
          </div>

          <div className="flex items-center gap-3">
            <Link to={"/dashboard"}>
              <FaHome className="text-4xl bg-[#171f12] text-white p-2 rounded-full" />
            </Link>
            {seller?.photo ? (
              <div className="bg-[#171f12] w-10 h-10 p-1 rounded-full flex flex-col items-center justify-center">
                <img
                  src={seller?.photo}
                  alt="personal_image"
                  className="h-full w-full rounded-full"
                />
              </div>
            ) : (
              <FaUserCircle className="text-4xl bg-[#171f12] p-2 rounded-full" />
            )}
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <MobileSidebar
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          key={"mobleSidebar"}
          className={"h-screen"}
        />
      )}

      {adminMessageModal && (
        <div className="fixed top-6 right-5 lg:right-12 ">
          <MessageList
            isModalOpen={adminMessageModal}
            setIsModalOpen={setAdminMessageModal}
            messages={MessageData}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
