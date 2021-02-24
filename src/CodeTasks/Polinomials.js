export const simplify = (poly) => {
  poly = poly[0] !== "-" ? "+" + poly : "" + poly;
  const alp = "abcdefghijklmnopqrstuvwxyz";
  const CC = {};

  const maper = (el) => poly.match(new RegExp(`[+-]${el}`)).index;

  const mons = poly
    .split(/[-+]/)
    .filter((el) => el !== "")
    .map((el) => poly[maper(el)] + el);

  mons.forEach((el) => {
    const c = { n: "", m: "" };
    c.m = el
      .replace(/[^a-z]/g, "")
      .split("")
      .map((el) => alp.indexOf(el))
      .sort((a, b) => a - b)
      .map((el) => alp[el])
      .join("");
    c.n = el.replace(/[a-z]/g, "");

    CC[c.m] = (CC[c.m] || 0) + Number(c.n === "-" ? -1 : c.n === "+" ? 1 : c.n);
  });

  Object.keys(CC).forEach((el) =>
    CC[el] === 0
      ? delete CC[el]
      : (CC[el] = CC[el] > 0 ? `+${CC[el]}` : `${CC[el]}`)
  );

  const check = (num) => {
    return num.match(/\d/g).join("") === "1" ? num.replace(/\d/g, "") : num;
  };

  const simple = Object.keys(CC)
    .sort()
    .map((el) => `${CC[el]}${el}`)
    .sort((a, b) => a.length - b.length)
    .map((el) => check(el))
    .join("");

  return simple[0] === "+" ? simple.slice(1) : simple;
};
