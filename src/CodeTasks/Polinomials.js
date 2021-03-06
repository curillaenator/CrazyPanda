export const simplify = (polinomial) => {
  polinomial = polinomial[0] !== "-" ? "+" + polinomial : "" + polinomial;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const cache = {};

  const maper = (el) => polinomial.match(new RegExp(`[+-]${el}`)).index;

  const monomials = polinomial
    .split(/[-+]/)
    .filter((el) => el !== "")
    .map((el) => polinomial[maper(el)] + el);

  monomials.forEach((el) => {
    const mCache = { num: "", mono: "" };
    mCache.mono = el
      .replace(/[^a-z]/g, "")
      .split("")
      .map((el) => alphabet.indexOf(el))
      .sort((a, b) => a - b)
      .map((el) => alphabet[el])
      .join("");
    mCache.num = el.replace(/[a-z]/g, "");

    cache[mCache.mono] =
      (cache[mCache.mono] || 0) +
      Number(mCache.num === "-" ? -1 : mCache.num === "+" ? 1 : mCache.num);
  });

  Object.keys(cache).forEach((el) =>
    cache[el] === 0
      ? delete cache[el]
      : (cache[el] = cache[el] > 0 ? `+${cache[el]}` : `${cache[el]}`)
  );

  const check = (number) => {
    return number.match(/\d/g).join("") === "1"
      ? number.replace(/\d/g, "")
      : number;
  };

  const simple = Object.keys(cache)
    .sort()
    .map((el) => `${cache[el]}${el}`)
    .sort((a, b) => a.length - b.length)
    .map((el) => check(el))
    .join("");

  return simple[0] === "+" ? simple.slice(1) : simple;
};