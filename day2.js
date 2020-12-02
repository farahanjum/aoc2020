const fs = require("fs");
const input = fs
  .readFileSync("day2.txt")
  .toString()
  .split("\n")
  .map((str) => str.replace(/(\r\n|\n|\r)/gm, ""));
console.log(input);

const getFreq = (arr, val) =>
  arr.reduce((prev, cur) => (cur == val ? prev + 1 : prev), 0);

const getData = (line) => {
  const min = line.slice(0, line.indexOf("-"));
  const max = line.slice(line.indexOf("-") + 1, line.indexOf(" "));
  const char = line.slice(line.indexOf(" ") + 1, line.indexOf(":"));
  const pwd = line.slice(line.indexOf(":") + 2);
  return [min, max, char, pwd];
};
const part1 = () =>
  input.filter((line) => {
    const [min, max, char, pwd] = getData(line);
    const freq = getFreq(pwd.split(""), char);
    return freq <= max && freq >= min;
  }).length;

const part2 = () =>
  input.filter((line) => {
    const [a, b, char, pwd] = getData(line);
    return (pwd[parseInt(a) - 1] == char) ^ (pwd[parseInt(b) - 1] == char);
  }).length;

console.log(part2());
