import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";
const UserImage = ({ data }) => {
  return (
    <div className="p-7 w-full h-full bg-white border shadow-md rounded-md flex items-center justify-center">
      {data ? (
        <div className="h-32 w-32">
          <img
            className="w-full h-full rounded-full border"
            src={data}
            alt="user_photo"
          />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <FaUserCircle className="w-44 h-44 rounded-full border p-5 border-stech" />
        </div>
      )}
    </div>
  );
};

UserImage.propTypes = {
  data: PropTypes.string,
};
export default UserImage;
