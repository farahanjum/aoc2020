const fs = require("fs");
const input = fs
  .readFileSync("day5.txt")
  .toString()
  .split("\n")
  .map((str) => str.replace(/(\r\n|\n|\r)/gm, ""));

const firstRow = 0,
  lastRow = 127;
const firstSeat = 0,
  lastSeat = 7;

const searchIdx = (beginIdx, endIdx, directions, backwardDir) => {
  if (beginIdx == endIdx) {
    return beginIdx;
  } else if (directions[0] == backwardDir)
    return searchIdx(
      beginIdx,
      beginIdx + Math.floor((endIdx - beginIdx) / 2),
      directions.slice(1, directions.length),
      backwardDir
    );
  else
    return searchIdx(
      beginIdx + Math.floor((endIdx - beginIdx) / 2) + 1,
      endIdx,
      directions.slice(1, directions.length),
      backwardDir
    );
};

const getId = (directions) =>
  searchIdx(firstRow, lastRow, directions.slice(0, 7), "F") * 8 +
  searchIdx(firstSeat, lastSeat, directions.slice(-3), "L");

const part1 = (input) => input.map(getId).sort((a, b) => b - a)[0];

const byEdgeRows = (line) =>
  searchIdx(firstRow, lastRow, line.slice(0, 7), "F") != 0 ||
  searchIdx(firstRow, lastRow, line.slice(0, 7), "F") != 127;

const part2 = (input) => {
  const IDs = input
    .filter(byEdgeRows)
    .map(getId)
    .sort((a, b) => a - b);
  let idx = 1;

  while (idx < IDs.length) {
    if (IDs[idx] - IDs[idx - 1] == 2) {
      return IDs[idx - 1] + (IDs[idx] - IDs[idx - 1]) / 2;
    } else idx++;
  }
};

console.log("Part 1: ", part1(input));

console.log("Part 2: ", part2(input));
