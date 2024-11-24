import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useGetSeller } from "../hooks/useGetSeller";

const BlockedRouter = ({ children }) => {
  const { seller } = useGetSeller()

  const location = useLocation();

  if (seller?.role === "seller" && seller?.status == "blocked") {
    return children;
  } else if (seller?.role === "seller" && seller?.status == "pending") {
    return <Navigate to="/pending" />;
  } else {
    return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  }
};

BlockedRouter.propTypes = {
  children: PropTypes.node,
};

export default BlockedRouter;
