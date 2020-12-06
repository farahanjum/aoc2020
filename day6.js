const fs = require("fs");
const input = fs
  .readFileSync("day6.txt")
  .toString()
  .split(/(\r\n\r\n)/g)
  .filter((l) => l !== "\r\n\r\n")
  .filter((l) => l)
  .map((l) => l.replace(/(\r\n)/g, " ").trim());

const part1 = () =>
  input
    .map((i) => i.replace(/\s/g, ""))
    .map((answers) => {
      let mySet = new Set();
      answers.split("").forEach((ans) => {
        mySet.add(ans);
      });
      return mySet.size;
    })
    .reduce((prev, cur) => prev + cur, 0);

const part2 = () =>
  input
    .map((answers) => {
      const numberOfPeople = answers.split(" ").length;
      const frequencies = answers
        .replace(/\s/g, "")
        .split("")
        .reduce((acc, cur) => {
          acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
          return acc;
        }, {});
      frequencies.numberOfPeople = numberOfPeople;
      return frequencies;
    })
    .map((frequencies) => {
      let numberOfQuesAllAnsweredYes = 0;
      for (const [key, value] of Object.entries(frequencies)) {
        if (value == frequencies.numberOfPeople && key != "numberOfPeople")
          numberOfQuesAllAnsweredYes++;
      }
      return numberOfQuesAllAnsweredYes;
    })
    .reduce((prev, cur) => prev + cur, 0);

console.log(part2());
