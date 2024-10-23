import PropTypes from "prop-types";
import cn from "../../utils/cn";

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        `w-full bg-stech p-2 text-white rounded-md font-medium text-sm border uppercase hover:opacity-85`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
