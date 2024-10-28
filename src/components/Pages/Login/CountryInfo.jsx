import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { business } from "../../../data/business/business";
import SelectInput from "../../Common/SelectInput";
import Button from "../../Common/Button";
import Input from "../../Common/Input";

const CountryInfo = ({ register, setIsBusinessNext, watch }) => {
  const [cities, setCities] = useState([]);
  const name = watch("state");
  useEffect(() => {
    if (name) {
      const selectedDivision = business.countryInfoData.find(
        (division) =>
          division.name === name[0].toUpperCase() + name.substring(1)
      );
      setCities([...selectedDivision.districts]);
    }
  }, [name]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 rtl-animation">
        <SelectInput {...register("state")} required>
          <option value="" selected disabled>
            Select state
          </option>
          {business?.countryInfoData?.map((state) => (
            <option value={state?.name?.toLowerCase()} key={state.name}>
              {state.name}
            </option>
          ))}
        </SelectInput>
        <SelectInput required {...register("city")}>
          <option value="" selected disabled>
            Select city
          </option>
          {cities?.map((city) => (
            <option value={city?.toLowerCase()} key={city}>
              {city}
            </option>
          ))}
        </SelectInput>
        <Input
          {...register("zipCode")}
          placeholder="Zip code *"
          required
          type="number"
        />
        <Input
          {...register("fullAddress")}
          placeholder="Full address *"
          required
          type="text"
        />
      </div>

      <div className="flex gap-10 items-center justify-between">
        <div
          onClick={() => setIsBusinessNext(false)}
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

CountryInfo.propTypes = {
  register: PropTypes.func,
  setIsBusinessNext: PropTypes.func,
  watch: PropTypes.func,
};

export default CountryInfo;
