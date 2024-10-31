import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashbaord/Dashboard";
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
import NotFound from "../pages/NotFound/NotFound";
import PrivateRouter from "./PrivateRouter";
import Pending from "../pages/Pending/Pending";
import Block from "../pages/Pending/Block";
import BlockedRouter from "./BlockedRouter";
import PendingRouter from "./PendingRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <MainLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRouter>
            <AddProduct />
          </PrivateRouter>
        ),
      },
      {
        path: "add-brands",
        element: (
          <PrivateRouter>
            <BrandInformation />
          </PrivateRouter>
        ),
      },
      {
        path: "add-return-policy",
        element: (
          <PrivateRouter>
            <ReturnPolicy />
          </PrivateRouter>
        ),
      },
      {
        path: "about-business",
        element: (
          <PrivateRouter>
            <AboutBusiness />
          </PrivateRouter>
        ),
      },
      {
        path: "business-info",
        element: (
          <PrivateRouter>
            <BusinessInformation />
          </PrivateRouter>
        ),
      },
      {
        path: "business-location",
        element: (
          <PrivateRouter>
            <BusinessLocation />
          </PrivateRouter>
        ),
      },
      {
        path: "banner-info",
        element: (
          <PrivateRouter>
            <BannerInformation />
          </PrivateRouter>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },
      {
        path: "followers",
        element: (
          <PrivateRouter>
            <Followers />
          </PrivateRouter>
        ),
      },
      {
        path: "identity-verification",
        element: (
          <PrivateRouter>
            <IdentityVerification />
          </PrivateRouter>
        ),
      },

      {
        path: "manage-reviews",
        element: (
          <PrivateRouter>
            <ManageReviews />
          </PrivateRouter>
        ),
      },
      {
        path: "order",
        element: (
          <PrivateRouter>
            <ManageOrder />
          </PrivateRouter>
        ),
      },
      {
        path: "personal-info",
        element: (
          <PrivateRouter>
            <PersonalInformation />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "blocked",
    element: (
      <BlockedRouter>
        <Block />
      </BlockedRouter>
    ),
  },
  {
    path: "pending",
    element: (
      <PendingRouter>
        <Pending />
      </PendingRouter>
    ),
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
