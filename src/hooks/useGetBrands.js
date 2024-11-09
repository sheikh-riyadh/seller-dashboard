import { useSelector } from "react-redux";

export const useGetBrands = () => {
  return useSelector((state) => state.session.sellerBrandsReducer || {});
};
