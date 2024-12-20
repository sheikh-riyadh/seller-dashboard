import required from "../../../../assets/required.png";
import PropTypes from "prop-types";
const Required = ({ fileSize }) => {
  return (
    <div className="">
      <img
        className="w-24 h-14 absolute -top-2 -left-[12px]"
        src={required}
        alt="required_img"
      />
      <span className="absolute top-2.5 left-2 text-xs text-white">
        required
      </span>
      <span className="absolute bottom-1 left-1.5 text-sm text-accent">{fileSize}</span>
    </div>
  );
};

Required.propTypes = {
  fileSize: PropTypes.string,
};

export default Required;
