import { useSelector } from "react-redux";

export const useGetSeller = () => {
  return useSelector((state) => state?.session?.sellerUserReducer?.value);
};
