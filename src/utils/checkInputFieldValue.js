export const checkValue = (values) => {
  let result=true;
  for (let i = 0; i < 4; i++) {
    if (!values[i]?.length) {
      result = false;
      break;
    }
  }
  console.log(values)
  return result;
};
