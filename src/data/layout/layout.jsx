import {
  FaBoxOpen,
  FaBriefcase,
  FaBuilding,
  FaCertificate,
  FaFingerprint,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaReply,
  FaShoppingBag,
  FaUserFriends,
  FaUserTie,
} from "react-icons/fa";
import { MdReviews, MdWindow } from "react-icons/md";

export const layout = {
  left_side: [
    {
      name: "Dashboard",
      icon: <MdWindow />,
      link: "/",
    },
    {
      name: "Order",
      icon: <FaShoppingBag />,
      link: "/order",
    },
    {
      name: "Add Product",
      icon: <FaBoxOpen />,
      link: "/add-product",
    },
    {
      name: "Personal Information",
      icon: <FaUserTie />,
      link: "/personal-info",
    },
    {
      name: "Business Information",
      icon: <FaBriefcase />,
      link: "/business-info",
    },
    {
      name: "Banner Information",
      icon: <FaLayerGroup />,
      link: "/banner-info",
    },
    {
      name: "Manage Reviews",
      icon: <MdReviews />,
      link: "/manage-reviews",
    },
    {
      name: "Set Business Location",
      icon: <FaMapMarkerAlt />,
      link: "/business-location",
    },
    {
      name: "Add Your Brands",
      icon: <FaCertificate />,
      link: "/add-brands",
    },
    {
      name: "Add Your Return Policy",
      icon: <FaReply />,
      link: "/add-return-policy",
    },
    {
      name: "About Business",
      icon: <FaBuilding />,
      link: "/about-business",
    },
    {
      name: "Identity Verification",
      icon: <FaFingerprint />,
      link: "/identity-verification",
    },
    {
      name: "Followers",
      icon: <FaUserFriends />,
      link: "/followers",
    },
  ],
};
