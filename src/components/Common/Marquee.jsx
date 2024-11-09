import PropTypes from "prop-types";

const Marquee = ({ content, speed = 2 }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap flex w-full h-5 bg-stech rounded-sm">
      <div className="marquee" style={{ animationDuration: `${speed}s` }}>
        {content}
      </div>
      <div className="marquee" style={{ animationDuration: `${speed}s` }}>
        {content}
      </div>
    </div>
  );
};

Marquee.propTypes = {
  content: PropTypes.node,
  speed: PropTypes.number,
};

export default Marquee;
