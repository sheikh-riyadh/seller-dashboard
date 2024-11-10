import { useSelector } from "react-redux";

export const useGetBanner = () => {
  return useSelector((state) => state.session.sellerBannerReducer.value);
};
