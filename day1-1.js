const fs = require("fs");
const input = fs
  .readFileSync("day1.txt")
  .toString()
  .split("\n")
  .map((num) => parseInt(num));

const data = input.sort((a, b) => a - b);

const part1 = (i, j, target) => {
  while (i < j) {
    let sum = data[i] + data[j];
    if (sum == target) {
      return data[i] * data[j];
    } else if (sum < target) i++;
    else j--;
  }
  return -1;
};

const part2 = (target) => {
  for (let k = 0; k < data.length; k++) {
    let res = part1(k + 1, data.length - 1, target - data[k]);
    if (res != -1) return res * data[k];
  }
};
console.log(part1(0, data.length - 1, 2020));
console.log(part2(2020));
