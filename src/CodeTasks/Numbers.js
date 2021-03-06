export const findNumbers = (n, k) => {
  const array = new Array(9).fill(0).map((_, i) => i + 1);
  let result = [];

  const brutforce = (summ, exit, value = "") => {
    if (value.length === k) {
      value
        .split("")
        .map((el) => Number(el))
        .reduce((a, b) => a + b) === summ &&
        [...value].sort((a, b) => a - b).join("") === value &&
        result.push(Number(value));
    }
    value.length < k ? (exit = 5) : (exit = 1);
    exit > 1 && array.forEach((el) => brutforce(summ, exit, `${value}${el}`));
  };
  brutforce(n, k);

  return result.length === 0 ? ["нет чисел"] : result;
};
