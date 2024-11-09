import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useGetUser } from "../hooks/useGetUser";

const PrivateRouter = ({ children }) => {
  const { user } = useGetUser();

  const location = useLocation();

  if (user?.role === "seller" && user?.status == "active") {
    return children;
  } else if (user?.role === "seller" && user?.status === "pending") {
    return <Navigate to="/pending" />;
  } else if (user?.role === "seller" && user?.status === "blocked") {
    return <Navigate to="/blocked" />;
  } else {
    return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  }
};

PrivateRouter.propTypes = {
  children: PropTypes.node,
};

export default PrivateRouter;
