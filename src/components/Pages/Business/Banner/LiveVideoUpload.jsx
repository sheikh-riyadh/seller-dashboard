import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import Input from "../../../Common/Input";

const VideoUpload = ({ register, watch }) => {
  const videoURL = watch("videoURL");

  return (
    <div>
      <Input
        label={"Vdeo URL"}
        required
        placeholder="https://www.youtube.com/live/WQh7zQQ_3i4"
        {...register("videoURL")}
        className={"bg-[#1C2822] text-white rounded-sm"}
      />

      {videoURL ? (
        <div className="flex justify-center items-center w-full mt-5 h-[550px] object-cover">
          <ReactPlayer width={"100%"} height={"100%"} url={videoURL} />
        </div>
      ) : null}
    </div>
  );
};

VideoUpload.propTypes = {
  register: PropTypes.func,
  watch: PropTypes.func,
};

export default VideoUpload;
