import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { layout } from "../../data/layout/layout";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";

const LeftSide = ({ visibleArrow = true, setIsModalOpen = () => {} }) => {
  const { pathname } = useLocation();
  const [isExtend, setIsExtend] = useState(true);

  const handleArrow = () => {
    setIsExtend((prev) => !prev);
  };

  return (
    <div className="relative z-0">
      <div
        className={`${
          isExtend ? "w-60" : "w-14"
        } h-screen overflow-y-auto bar-hidden duration-300`}
      >
        <div
          className={`sticky top-0 bg-widget ${
            !isExtend && "bg-white w-[176px] h-[60px]"
          }`}
        >
          <img
            className="p-3 bg-widget w-[176px] h-[60px]"
            src="/logo.png"
            alt="logo"
          />
        </div>
        <div className="flex flex-col gap-2 h-full">
          {layout.left_side.map(({ name, icon, link }) => (
            <Link
              onClick={() => setIsModalOpen(false)}
              className={`flex items-center text-white gap-3 ${
                !isExtend && "gap-6 py-3"
              } px-4 py-2 duration-200 text-sm text-slate ${
                pathname == link ? "bg-stech text-white" : ""
              }`}
              to={`${link}`}
              title={name}
              key={name}
            >
              <span className="text-xl">{icon}</span>
              {isExtend && <span>{name}</span>}
            </Link>
          ))}
        </div>
      </div>
      <div
        onClick={handleArrow}
        className={`absolute top-[73px] -right-[10px] w-6 h-6 bg-accent rounded-full border flex items-center justify-center z-40 cursor-pointer ${
          !visibleArrow ? "hidden" : "block"
        }`}
      >
        {isExtend ? (
          <FaAngleLeft className="text-lg text-white" />
        ) : (
          <FaAngleRight className="text-lg text-white" />
        )}
      </div>
    </div>
  );
};

LeftSide.propTypes = {
  visibleArrow: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};

export default LeftSide;
