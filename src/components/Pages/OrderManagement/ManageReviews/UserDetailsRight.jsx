import PropTypes from "prop-types";
import CommonComponent from "../../../Common/CommonComponent";

const UserDetailsRight = ({ data, isReport }) => {
  return (
    <div className="shadow-md rounded-md border overflow-hidden">
      <div className="flex justify-between border-b bg-white p-4">
        <div>
          {!isReport ? (
            <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
              Personal Info
            </h2>
          ) : (
            <p className="font-bold">
              From : <span>{data?.fullName}</span>
            </p>
          )}
        </div>
      </div>
      <div className="p-5 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full rounded-md">
            <CommonComponent name={"Full Name"} value={data?.fullName} />
          </div>
        </div>
      </div>
    </div>
  );
};

UserDetailsRight.propTypes = {
  data: PropTypes.object,
  isReport: PropTypes.bool,
};

export default UserDetailsRight;