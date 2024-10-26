import PropTypes from "prop-types";
import Input from "../../Common/Input";


const StockPriceAndQuantity = ({ register }) => {
  return (
    <div className="grid grid-cols-4 gap-5">
      <Input
        required
        className={"bg-white border"}
        placeholder={"Price"}
        label={"Price"}
        {...register("price")}
        type="number"
        min={"1"}
      />
      <Input
        className={"bg-white border"}
        placeholder={"Special Price"}
        label={"Special Price"}
        {...register("specialPrice")}
        type="number"
        min={"0"}
      />
      <Input
        required
        className={"bg-white border"}
        placeholder={"Stock / Quantity"}
        label={"Stock"}
        {...register("stock")}
        type="number"
        min={"1"}
      />
      <Input
        className={"bg-white border"}
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
