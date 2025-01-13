import { displayGrid, showItemStatus } from "./view.js";
import {
  createGrid,
  generateTreasures,
  weightArr,
  valueArr,
  DP,
  setDP,
} from "./model.js";

let i = 2;
let c = 2;
let N = 0;
let id = 0;
let maxCapacity = 0;
let gameInterval;
let itemsAdded = [];
let timerValue = 1000;

function setN(value) {
  N = value;
}

function knapSack() {
  if (
    maxCapacity < 0 ||
    weightArr.length != valueArr.length ||
    weightArr.length == null ||
    valueArr.length == null
  ) {
    throw new Error("Invalid input: Check that weights and values");
  }
  if (i <= N + 1) {
    let w = weightArr[i - 2];
    let v = valueArr[i - 2];

    if (c <= maxCapacity + 1) {
      const preVal = DP.get(i - 1, c);
      DP.set(i, c, preVal);
      const capacity = c - 1;
      if (capacity >= w && DP.get(i - 1, c - w) + v > DP.get(i, c)) {
        let updatedCell = DP.get(i - 1, c - w) + v;
        DP.set(i, c, updatedCell);
      }
      c++;
    } else if (c > maxCapacity + 1) {
      i++;
      c = 2;
    }
  } else if (i > N + 1) {
    DP.isGridFull(true);
    i = N + 1;
    c = maxCapacity + 1;
  }
  displayGrid();
}

function knapSackBacktrack() {
  if (i > 1) {
    setClassColours();
    if (DP.get(i, c) != DP.get(i - 1, c)) {
      c = c - weightArr[i - 2];
      showItemStatus(true, i);
    } else {
      showItemStatus(false, i);
    }
    i--;
  } else {
    resetApplication();
  }
  return DP.get(N, maxCapacity);
}

function setClassColours() {
  const number = document.getElementById(`DP${i}:${c}`);
  const prevNumber = document.getElementById(`DP${i - 1}:${c}`);
  let leftNumber = 0;
  if (c - weightArr[i - 2] > 0 && number.innerText !== prevNumber.innerText) {
    leftNumber = document.getElementById(`DP${i - 1}:${c - weightArr[i - 2]}`);
    leftNumber.classList.add("previousCell");
  }
  number.classList.add("currentCell");
  prevNumber.classList.add("previousCell");
  id = setTimeout(() => {
    number.classList.remove("currentCell");
    prevNumber.classList.remove("previousCell");
    if (leftNumber !== 0) {
      leftNumber.classList.remove("previousCell");
    }
  }, timerValue);
}

function setTreasure(event) {
  resetApplication();
  let newN = Number(event.target.value);
  setN(newN);
  generateTreasures();
}

function startGameInterval() {
  stopGameInterval();
  gameInterval = setInterval(() => {
    if (!DP.getIsGridFull()) {
      knapSack();
    } else {
      knapSackBacktrack();
    }
  }, timerValue);
}

function solveKnapsackButton() {
  startGameInterval();
  displayGrid();
}

function stopKnapsackButton() {
  stopGameInterval();
  clearTimeout(id);
}

function stopGameInterval() {
  clearInterval(gameInterval);
}

function resetApplication() {
  stopGameInterval();
  resetColAndRowValues();
  resetGridIsFull();
  itemsAdded = [];
}

function resetGridIsFull() {
  DP.isGridFull(false);
}

function setStartValues() {
  maxCapacity = 1;
  N = 1;
}

function setCapacity(event) {
  resetApplication();
  maxCapacity = Number(event.target.value);
  const DPValue = createGrid();
  setDP(DPValue);
  displayGrid();
}

function resetColAndRowValues() {
  c = 2;
  i = 2;
}

export {
  knapSack,
  knapSackBacktrack,
  setStartValues,
  setCapacity,
  maxCapacity,
  N,
  i,
  c,
  resetColAndRowValues,
  setN,
  id,
  setTreasure,
  solveKnapsackButton,
  stopKnapsackButton,
  gameInterval,
};
