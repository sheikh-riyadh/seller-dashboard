import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashbaord/Dashboard";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import AddProduct from "../pages/AddProduct/AddProduct";
import PersonalInformation from "../pages/Business/PersonalInformation";
import BusinessInformation from "../pages/Business/BusinessInformation";
import BannerInformation from "../pages/Business/BannerInformation";
import BusinessLocation from "../pages/Business/BusinessLocation";
import BrandInformation from "../pages/Business/BrandInformation";
import ManageOrder from "../pages/OrderManagement/ManageOrder/ManageOrder";
import ManageReviews from "../pages/OrderManagement/ManageReviews/ManageReviews";
import ReturnPolicy from "../pages/ReturnPolicy/ReturnPolicy";
import AboutBusiness from "../pages/Business/AboutBusiness";
import IdentityVerification from "../pages/Business/IdentityVerification";
import Followers from "../pages/Followers/Followers";
import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/Login/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "add-brands",
        element: <BrandInformation />,
      },
      {
        path: "add-return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "about-business",
        element: <AboutBusiness />,
      },
      {
        path: "business-info",
        element: <BusinessInformation />,
      },
      {
        path: "business-location",
        element: <BusinessLocation />,
      },
      {
        path: "banner-info",
        element: <BannerInformation />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "followers",
        element: <Followers />,
      },
      {
        path: "identity-verification",
        element: <IdentityVerification />,
      },

      {
        path: "manage-reviews",
        element: <ManageReviews />,
      },
      {
        path: "order",
        element: <ManageOrder />,
      },
      {
        path: "personal-info",
        element: <PersonalInformation />,
      },
    ],
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
]);

export default router;
