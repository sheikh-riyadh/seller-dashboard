import { useForm } from "react-hook-form";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import { business } from "../../data/business/business";
import SelectInput from "../../components/Common/SelectInput";

const BusinessInformation = () => {
  const { handleSubmit, register } = useForm();
  return (
    <div>
      <div className="h-44 w-full bg-primary flex flex-col justify-center items-center"></div>

      <form
        onSubmit={handleSubmit()}
        className="shadow-md m-10 p-7 -mt-28 bg-white border rounded-md"
      >
        <div className="grid grid-cols-2 gap-5">
          {business?.businessData?.map(
            ({ registerName, label, isRequired, type, data, placeholder }) =>
              !data ? (
                <Input
                  key={registerName}
                  label={label}
                  {...register(registerName)}
                  required={isRequired}
                  type={type}
                  placeholder={placeholder}
                  className={"bg-white border"}
                />
              ) : (
                <SelectInput
                  label={label}
                  required={isRequired}
                  key={registerName}
                  placeholder={placeholder}
                  className={"bg-white border"}
                >
                  <option selected disabled value="">
                    Select
                  </option>
                  {data?.map((op) => (
                    <option className="capitalize" value={op} key={op}>
                      {op}
                    </option>
                  ))}
                </SelectInput>
              )
          )}
        </div>
        <div className="mt-5 flex flex-col">
          <Button className="px-10 py-2">{"Save"}</Button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInformation;
