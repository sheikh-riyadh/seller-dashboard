import PropTypes from "prop-types";
import { business } from "../../../data/business/business";
import Input from "../../Common/Input";
import SelectInput from "../../Common/SelectInput";
import { useState } from "react";
import { checkValue } from "../../../utils/checkInputFieldValue";
import toast from "react-hot-toast";
import CountryInfo from "./CountryInfo";

const BusinessInfo = ({ register, setIsNext, watch, isLoading }) => {
  const [isBusinessNext, setIsBusinessNext] = useState(false);
  const values = watch([
    "businessNumber",
    "businessNumber",
    "businessEmail",
    "country",
  ]);

  const handleBusinessInfo = () => {
    if (checkValue(values)) {
      setIsBusinessNext(true);
    } else {
      toast.error("All field are required", { id: "input_error" });
    }
  };

  return (
    <div>
      {!isBusinessNext ? (
        <div className="w-full flex flex-col gap-5 rtl-animation">
          {business.businessInfoData.map(
            ({ isRequired, placeholder, registerName, type, data }) => (
              <div key={registerName}>
                {!data ? (
                  <Input
                    {...register(registerName)}
                    placeholder={placeholder}
                    type={type}
                    required={isRequired}
                  />
                ) : (
                  <SelectInput {...register("country")} required={isRequired}>
                    <option selected value={data[0].toLowerCase()}>{data[0]}</option>
                  </SelectInput>
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <CountryInfo
          register={register}
          setIsBusinessNext={setIsBusinessNext}
          watch={watch}
          isLoading={isLoading}
        />
      )}
      {!isBusinessNext && (
        <div className="flex gap-10 items-center justify-between mt-5">
          <div
            onClick={() => setIsNext(false)}
            className="font-medium uppercase text-sm border w-full text-center p-2.5 rounded-md text-danger cursor-pointer"
          >
            Back
          </div>
          <div
            onClick={handleBusinessInfo}
            className="font-medium uppercase text-sm border w-full text-center p-2.5 rounded-md bg-stech text-white cursor-pointer"
          >
            Next
          </div>
        </div>
      )}
    </div>
  );
};

BusinessInfo.propTypes = {
  register: PropTypes.func,
  setIsNext: PropTypes.func,
  watch: PropTypes.func,
  isLoading: PropTypes.bool
};

export default BusinessInfo;
