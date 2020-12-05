const fs = require("fs");
const input = fs
  .readFileSync("day4.txt")
  .toString()
  .split(/(\r\n\r\n)/g)
  .filter((l) => l !== "\r\n\r\n")
  .filter((l) => l)
  .map((l) => l.replace(/(\r\n)/g, " ").trim());

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].sort();

const areRequiredFieldsPresent = (line) =>
  line
    .split(" ")
    .map((e) => e.split(":")[0])
    .filter((entry) => entry != "cid")
    .sort()
    .join(",") == requiredFields.join(",");

const byPart1Requirements = (line) => areRequiredFieldsPresent(line);

const part1 = (input) => input.filter(byPart1Requirements).length;

const isValidbyr = (val) =>
  /^\d+$/.test(val) && val.length == 4 && val <= 2002 && val >= 1920;
const isValidiyr = (val) =>
  /^\d+$/.test(val) && val.length == 4 && val <= 2020 && val >= 2010;
const isValideyr = (val) =>
  /^\d+$/.test(val) && val.length == 4 && val <= 2030 && val >= 2020;
const isValidhgt = (val) => {
  const num = val.slice(0, val.length - 2);
  const unit = val.slice(-2);
  return (
    (unit == "cm" || unit == "in") &&
    /^\d+$/.test(num) &&
    (unit == "cm"
      ? parseInt(num) >= 150 && parseInt(num) <= 193
      : parseInt(num) >= 59 && parseInt(num) <= 76)
  );
};
const isValidhcl = (val) => /^#[0-9a-f]{6}$/.test(val);
const isValidecl = (val) =>
  ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val);
const isValidpid = (val) => /^[0-9]{9}$/.test(val);

const byPart2Requirements = (line) => {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = line
    .split(" ")
    .reduce((acc, curVal) => {
      acc[curVal.split(":")[0]] = curVal.split(":")[1];
      return acc;
    }, {});
  return (
    areRequiredFieldsPresent(line) &&
    isValidbyr(byr) &&
    isValidiyr(iyr) &&
    isValideyr(eyr) &&
    isValidhgt(hgt) &&
    isValidhcl(hcl) &&
    isValidecl(ecl) &&
    isValidpid(pid)
  );
};

const part2 = (input) => input.filter(byPart2Requirements).length;

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
