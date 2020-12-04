const fs = require("fs");
const input = fs
  .readFileSync("day3.txt")
  .toString()
  .split("\n")
  .map((str) => str.replace(/(\r\n|\n|\r)/gm, ""));

const part1 = (rightStep, downStep) => {
  const map = new Array(input.length);
  for (let i = 0; i < map.length; i++) {
    map[i] = Array(Math.ceil((323 * rightStep) / 31))
      .fill(input[i].split(""))
      .flat();
  }
  let trees = 0,
    i = 0,
    j = 0;
  for (; i < map.length; j += rightStep, i += downStep)
    if (map[i][j] == "#") trees++;

  return trees;
};

console.log(
  part1(1, 1),
  part1(3, 1),
  part1(5, 1),
  part1(7, 1),
  part1(1, 2),
  part1(1, 1) * part1(3, 1) * part1(5, 1) * part1(7, 1) * part1(1, 2)
);
