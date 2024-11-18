import { FaBell, FaPowerOff, FaQuestionCircle } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { Link } from "react-router-dom";

const RightSide = () => {
  return (
    <div className="w-12 h-full bg-white pt-6 border">
      <div className="flex flex-col gap-5 items-center justify-center">
        <Link>
          <FaBell className="text-lg" />
        </Link>
        <Link>
          <FaQuestionCircle className="text-lg" />
        </Link>
        <Link to={"/question-answer"}>
          <MdQuestionAnswer className="text-lg" />
        </Link>
        <Link>
          <FaPowerOff className="text-lg" />
        </Link>
      </div>
    </div>
  );
};

export default RightSide;
