import moment from "moment";

export function sum(arr) {
  /*   if (!arr) return undefined;
  if (arr.length === 0) return NaN;
  const sum = arr.reduce((acc, rec) => {
    if (isNaN(rec)) {
      throw new Error(`In getAvg rec is not a number. rec: ${rec}`);
    }
    acc += rec;
  }, 0);
  return sum / arr.length; */
  let sum = arr.reduce(
    (acc, rec) => Number.parseFloat(acc) + Number.parseFloat(rec),
    0.0
  );
  return sum;
}

export function avg(arr) {
  return sum(arr) / arr.length;
}

export function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
}

export function isToday(dateString) {
  return moment().isSame(dateString, "day");
}
export function isYesterday(dateString) {
  return moment()
    .subtract(1, "days")
    .isSame(dateString);
}
export function coloringFunctionFactory(
  rangeValues,
  hslPigmentRange = [0, 120]
) {
  let valueDistance = rangeValues[1] - rangeValues[0];
  let hslPigmentDistance = hslPigmentrange[1] - hslPigmentRange[0];
  return function(value) {
    let hslPigment =
      hslPigmentRange[0] + (value / valueDistance) * hslPigmentDistance;
    return `hsl(${hslPigment}, 50%, 50%, 1)`;
  };
}
