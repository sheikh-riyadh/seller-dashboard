import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useGetUser } from "../hooks/useGetUser";

const BlockedRouter = ({ children }) => {
  const { user } = useGetUser()

  const location = useLocation();

  if (user?.role === "seller" && user?.status == "blocked") {
    return children;
  } else if (user?.role === "seller" && user?.status == "pending") {
    return <Navigate to="/pending" />;
  } else {
    return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  }
};

BlockedRouter.propTypes = {
  children: PropTypes.node,
};

export default BlockedRouter;
