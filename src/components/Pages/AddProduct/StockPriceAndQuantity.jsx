import PropTypes from "prop-types";
import Input from "../../Common/Input";


const StockPriceAndQuantity = ({ register }) => {
  return (
    <div className="grid lg:grid-cols-4 gap-5">
      <Input
        required
        className={"bg-[#1C2822] text-white rounded-sm"}
        placeholder={"Price"}
        label={"Price"}
        {...register("price")}
        type="number"
        min={"1"}
      />
      <Input
        className={"bg-[#1C2822] text-white rounded-sm"}
        placeholder={"Special Price"}
        label={"Special Price"}
        {...register("specialPrice")}
        type="number"
        min={"0"}
      />
      <Input
        required
        className={"bg-[#1C2822] text-white rounded-sm"}
        placeholder={"Stock / Quantity"}
        label={"Stock"}
        {...register("stock")}
        type="number"
        min={"0"}
      />
      <Input
        className={"bg-[#1C2822] text-white rounded-sm"}
        placeholder={"Discount"}
        label={"Discount"}
        {...register("discount")}
        type="number"
        min={"0"}
      />
    </div>
  );
};

StockPriceAndQuantity.propTypes = {
  register: PropTypes.func,
};

export default StockPriceAndQuantity;
