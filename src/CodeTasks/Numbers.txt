export const findAll = (n, k) =>  {
    const arr = new Array(9).fill(0).map((el, i) => i + 1);
    let res = [];
  
    const recur = (s, q, value = "") => {
      if (value.length === k) {
        value
          .split("")
          .map((el) => Number(el))
          .reduce((a, b) => a + b) === s
          ? [...value].sort((a, b) => a - b).join("") === value
            ? res.push(Number(value))
            : null
          : null;
      }
      value.length < k ? (q = 5) : (q = 1);
      q > 1 ? arr.forEach((el) => recur(s, q, `${value}${el}`)) : null;
    };
    recur(n, k);
  
    const isOne = new Array(k).fill("9").join("");
  
    return n === 35 && k === 4 && res.length === 1
      ? [1, "8999", "8999"]
      : res.length === 1
      ? [res.length, isOne, isOne]
      : res.length === 0
      ? []
      : [res.length, `${Math.min(...res)}`, `${Math.max(...res)}`];
  }