const fs = require("fs");
const input = fs
  .readFileSync("day9.txt")
  .toString()
  .split("\r\n")
  .map((str) => parseInt(str));

const AreSummingNumbersPresent = (sortedArr, target) => {
  let i = 0,
    j = sortedArr.length - 1;
  while (i < j) {
    let sum = sortedArr[i] + sortedArr[j];
    if (sum == target) {
      return true;
    } else if (sum < target) i++;
    else j--;
  }
  return false;
};
const part1 = (input, preamble) => {
  let i = 0,
    j = preamble - 1;
  while (j < input.length - 1) {
    let sortedArr = input.slice(i, j + 1).sort((a, b) => a - b);
    let res = AreSummingNumbersPresent(sortedArr, input[j + 1]);
    if (!res) return input[j + 1];
    i++;
    j++;
  }
};
const sumSubArray = (arr, i, j) =>
  arr.slice(i, j + 1).reduce((prev, cur) => {
    cur = cur + prev;
    return cur;
  }, 0);

const getSumOfSmallestAndLargestElem = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  return sortedArr[0] + sortedArr[sortedArr.length - 1];
};

const part2 = (input, target) => {
  let i = 0;
  while (i < input.length) {
    let sum = 0;
    for (let j = i + 1; j < input.length && sum <= target; j++) {
      sum = sumSubArray(input, i, j);
      if (sum == target)
        return getSumOfSmallestAndLargestElem(input.slice(i, j + 1));
    }
    i++;
  }
};
console.log(part1(input, 25));
console.log(part2(input, part1(input, 25)));
