window.addEventListener("load", init);

import { displayGrid, colorizeCellHeaders, showArray, setUpEventListeners } from "./view.js";
import { createGrid, treasurePool, generateTreasures } from "./model.js";

// ******************************* MODEL *********************************
//#region Model
let gameInterval;
let picArr = [];
let weightArr = [];
let valueArr = [];
let maxCapacity = 0;
let i = 2;
let c = 2;
let gridIsFull = false;
let N = 0;
let DP;
let itemsAdded = [];

function setDP(DPValue) {
  DP = DPValue;
}

//#endregion

// ******************************* VIEW **********************************
//#region View

//#endregion

// **************************** CONTROLLER *******************************
//#region Controller
function init() {
  setUpEventListeners();
  setStartValues();
  DP = createGrid();
  displayGrid();
  clearInterval(gameInterval);
}

function setStartValues() {
  maxCapacity = 1;
  N = 1;
}

function setCapacity(event) {
  resetApplication();
  maxCapacity = Number(event.target.value);
  DP = createGrid();
  displayGrid();
}

function resetColAndRowValues() {
  c = 2;
  i = 2;
}

function setTreasure(event) {
  resetApplication();
  N = Number(event.target.value);
  generateTreasures();
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
      DP[i][c] = DP[i - 1][c];

      // Vi sætter capacity til at være c-1 for at tage højde for 'col' 0 som er reserveret til item værdierne.
      const capacity = c - 1;
      /* STEP  2 ---------------------------------------------------------- */
      if (capacity >= w && DP[i - 1][c - w] + v > DP[i][c]) {
        DP[i][c] = DP[i - 1][c - w] + v;
        //   "Set værdien til itemets værdi - plus det det der ellers er plads til");
      }
      c++;
    } else if (c > maxCapacity + 1) {
      i++;
      c = 2;
    }
  } else if (i > N + 1) {
    gridIsFull = true;
    i = N + 1;
    c = maxCapacity + 1;
  }
  displayGrid();
}

let id = 0;

function removeClasses(number, prevNumber) {
  clearTimeout(id);
  number.classList.remove("currentCell");
  prevNumber.classList.remove("previousCell");
}

function knapSackBacktrack() {
  // Vi køre algoritmen så længe 'rows' er højere end 1 - da row 1 er reserveret til item '0'.
  if (i > 1) {
    const number = document.getElementById(`DP${i}:${c}`);
    const prevNumber = document.getElementById(`DP${i - 1}:${c}`);
    const leftNumber = document.getElementById(
      `DP${i - 1}:${c - weightArr[i - 2]}`
    );
    number.classList.add("currentCell");
    prevNumber.classList.add("previousCell");
    id = setTimeout(() => {
      number.classList.remove("currentCell");
      prevNumber.classList.remove("previousCell");
      leftNumber.classList.remove("previousCell");
    }, 500);
    // Vi tjekker om cellen's værdi adskilder sig fra den ovenstående celles-
    if (DP[i][c] != DP[i - 1][c]) {
      const itemNo = i - 1;
      leftNumber.classList.add("previousCell");
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
  return DP[N][maxCapacity];
}

function startGameInterval() {
  stopGameInterval();
  gameInterval = setInterval(() => {
    if (gridIsFull == false) {
      knapSack();
    } else {
      knapSackBacktrack();
    }
  }, 500);
}

function resetApplication() {
  stopGameInterval();
  resetColAndRowValues();
  resetGridIsFull();
  itemsAdded = [];
}

function resetGridIsFull() {
  gridIsFull = false;
}

function stopGameInterval() {
  clearInterval(gameInterval);
}

function solveKnapsackButton() {
  startGameInterval();
  displayGrid();
}

function stopKnapsackButton() {
  stopGameInterval();
  clearTimeout(id);
}

function clearArrays() {
  picArr = [];
  valueArr = [];
  weightArr = [];
}

function clearTreasureTable() {
  const table = document.querySelector("#treasure-table-content");
  table.innerHTML = "";
}

export {gameInterval, 
  picArr, 
  weightArr, 
  valueArr, 
  maxCapacity, 
  i, 
  c, 
  gridIsFull,N,DP,itemsAdded}

  export {setCapacity, setTreasure, solveKnapsackButton, stopKnapsackButton}

  // export stuff from view.js to model.js
  export {clearArrays, clearTreasureTable, showArray, displayGrid, setDP}
//#endregion


