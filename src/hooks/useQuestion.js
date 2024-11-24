import { useSelector } from "react-redux";

export const useQuestion = () => {
  return useSelector((state) => state?.local?.sellerQuestionReducer?.value);
};
