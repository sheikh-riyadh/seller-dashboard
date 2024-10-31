import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const PrivateRouter = ({ children }) => {
  const { user } = useSelector(
    (state) => state?.local?.myselfCaptakeUserReducer?.value || {}
  );

  const location = useLocation();

  if (user?.role === "seller" && user?.status == "active") {
    return children;
  } else if (user?.status === "pending") {
    return <Navigate to="/pending" />;
  }
  return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
};

PrivateRouter.propTypes = {
  children: PropTypes.node,
};

export default PrivateRouter;
