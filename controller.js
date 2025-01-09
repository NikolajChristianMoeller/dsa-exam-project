// alt midt imellem. for at adskille de to. Alt skal gå i gennem conrtolleren.
import { displayGrid } from "./view.js";
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
    // Vi kigger på i - 2 for at kompencere for de rows og cols der er til item - eller capacity nr. eller 0'værdier.
    let w = weightArr[i - 2];
    let v = valueArr[i - 2];

    if (c <= maxCapacity + 1) {
      /* STEP 1 ---------------------------------------------------------- */
      //DP[i][c] = DP[i - 1][c];
      const preVal = DP.get(i - 1, c);
      DP.set(i, c, preVal);
      // Vi sætter capacity til at være c-1 for at tage højde for 'col' 0 som er reserveret til item værdierne.
      const capacity = c - 1;
      /* STEP  2 ---------------------------------------------------------- */
      if (capacity >= w && DP.get(i - 1, c - w) + v > DP.get(i, c)) {
        let updatedCell = DP.get(i - 1, c - w) + v;
        DP.set(i, c, updatedCell);
        //   "Set værdien til itemets værdi - plus det det der ellers er plads til");
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
  // Vi kører algoritmen så længe 'rows' er højere end 1 - da row 1 er reserveret til item '0'.
  if (i > 1) {
    setClassColours();
    // Vi tjekker om cellens værdi adskiller sig fra den ovenstående celles
    if (DP.get(i, c) != DP.get(i - 1, c)) {
      const itemNo = i - 1;
      itemsAdded.push(itemNo);
      // Juster capacity så det tager højde for at itemet ikke længere er i vores kanpsck
      // Vi sætter 'c' til at være 'c' minus itemets vægt. Den finder vi på index plads [i -2] da vores grid har 2 'cols' mere end vores array har pladser.
      c = c - weightArr[i - 2];
    }
    // Vi rykker viddere til den ovenstående row.
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
  }, 500);
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
  }, 500);
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
