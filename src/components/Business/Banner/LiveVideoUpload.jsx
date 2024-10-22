import PropTypes from "prop-types";
import Input from "../../Common/Input";
import ReactPlayer from "react-player";

const LiveVideoUpload = ({ register, watch }) => {
  const liveUrl = watch("liveUrl");

  return (
    <div>
      <Input
        label={"Live URL"}
        required
        placeholder="https://www.youtube.com/live/WQh7zQQ_3i4"
        {...register("liveUrl")}
      />

      {liveUrl ? (
        <div className="flex justify-center items-center w-full mt-5">
          <ReactPlayer url={liveUrl} controls />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

LiveVideoUpload.propTypes = {
  register: PropTypes.func,
  watch: PropTypes.func,
};

export default LiveVideoUpload;
