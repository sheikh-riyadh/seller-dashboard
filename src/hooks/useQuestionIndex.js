import { useSelector } from "react-redux";

export const useQuestionIndex = () => {
  return useSelector((state) => state?.local?.sellerQuestionReducer?.value);
};
