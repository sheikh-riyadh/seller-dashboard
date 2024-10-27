import PropTypes from "prop-types";
import { business } from "../../../data/business/business";
import Input from "../../Common/Input";
import Button from "../../Common/Button";

const BusinessInfo = ({ register, setIsNext }) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-5 rtl-animation">
        {business.businessInfoData.map(
          ({ isRequired, placeholder, registerName, type }) => (
            <Input
              key={registerName}
              {...register(registerName)}
              placeholder={placeholder}
              type={type}
              required={isRequired}
            />
          )
        )}
      </div>
      <div className="flex gap-10 items-center justify-between mt-5">
        <div
          onClick={() => setIsNext(false)}
          className="font-medium uppercase text-sm border w-full text-center p-2.5 rounded-md text-danger cursor-pointer"
        >
          Back
        </div>
        <Button className="font-medium uppercase text-sm border w-full text-center p-2.5 rounded-md bg-stech text-white cursor-pointer">
          Submit
        </Button>
      </div>
    </div>
  );
};

BusinessInfo.propTypes = {
  register: PropTypes.func,
  setIsNext: PropTypes.func,
};

export default BusinessInfo;
