export default (value: number | string) => {
  if (Number(value).toString() === "NaN") {
    return value;
  } else {
    return value + "px";
  }
};
