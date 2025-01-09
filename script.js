window.addEventListener("load", init);

import { createGrid, treasurePool, generateTreasures } from "./model.js";
import { displayGrid, colorizeCellHeaders, showArray, setUpEventListeners } from "./view.js";
import { knapSack, knapSackBacktrack, setStartValues, setCapacity, c, i, 
  resetColAndRowValues, setN, id } from "./controller.js";


// ******************************* MODEL *********************************
//#region Model
let gameInterval;
let picArr = [];
let weightArr = [];
let valueArr = [];
let gridIsFull = false;
let DP;
let itemsAdded = [];

function setDP(DPValue) {
  DP = DPValue;
}

function setCell(row, col, value) {
  DP[row][col] = value;
}

function getCell(row, col) {
  const value = DP[row][col];
  return value;
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

function setTreasure(event) {
  resetApplication();
  let newN = Number(event.target.value);
  setN(newN)
  generateTreasures();
}

// function removeClasses(number, prevNumber) {
//   clearTimeout(id);
//   number.classList.remove("currentCell");
//   prevNumber.classList.remove("previousCell");
// }

function startGameInterval() {
  stopGameInterval();
  gameInterval = setInterval(() => {
    if (!DP.getIsGridFull() ) {
      console.log("inside if - calling knapsack forward :D")
      knapSack();
    } else {
      console.log("inside else - calling backtrack :(")
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
  gridIsFull,DP,itemsAdded}

  export {setTreasure, solveKnapsackButton, stopKnapsackButton}

  // export stuff from view.js to model.js
  export {clearArrays, clearTreasureTable, showArray, displayGrid, setDP, resetApplication}
//#endregion


