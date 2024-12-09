import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useGetSeller } from "../hooks/useGetSeller";

const PrivateRouter = ({ children }) => {
  const { seller } = useGetSeller();

  const location = useLocation();

  if (
    (seller?.role === "seller" && seller?.status == "active") ||
    seller?.status === "working"
  ) {
    return children;
  } else if (seller?.role === "seller" && seller?.status === "pending") {
    return <Navigate to="/pending" />;
  } else if (seller?.role === "seller" && seller?.status === "blocked") {
    return <Navigate to="/blocked" />;
  } else {
    return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  }
};

PrivateRouter.propTypes = {
  children: PropTypes.node,
};

export default PrivateRouter;
