const fs = require("fs");
let input = fs.readFileSync("day8.txt").toString().split("\r\n");

const getArgs = (input) => [input.slice(0, 3), input.slice(4)];

const part1 = (input) => {
  let instructionsData = new Array(input.length).fill(0);
  let i = 0,
    acc = 0;
  while (i < input.length) {
    const [instruction, arg] = getArgs(input[i]);
    if (instructionsData[i] != 0) break;
    instructionsData[i]++;
    if (instruction == "nop") {
      i++;
    } else if (instruction == "acc") {
      acc = acc + parseInt(arg);
      i++;
    } else if (instruction == "jmp") {
      i = i + parseInt(arg);
    }
  }
  return [acc, i];
};

const part2 = (input) => {
  let ret;
  for (let i = 0; i < input.length; i++) {
    const [instruction, arg] = getArgs(input[i]);
    if (instruction == "acc") continue;
    let arr = [...input];
    if (instruction == "nop") arr[i] = `jmp ${arg}`;
    else if (instruction == "jmp") arr[i] = `nop ${arg}`;
    let [acc, index] = part1(arr);
    if (index == input.length) {
      ret = acc;
      break;
    }
  }
  return ret;
};

console.log(part2(input));
