window.addEventListener("load", init);

import { createGrid, treasurePool, generateTreasures } from "./model.js";
import { displayGrid, colorizeCellHeaders, showArray, setUpEventListeners } from "./view.js";
import { knapSack, knapSackBacktrack, setStartValues, setCapacity, c, i, 
  resetColAndRowValues, setN, id, gameInterval } from "./controller.js";


// ******************************* MODEL *********************************
//#region Model
let picArr = [];
let weightArr = [];
let valueArr = [];
let gridIsFull = false;
let DP;

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

// function removeClasses(number, prevNumber) {
//   clearTimeout(id);
//   number.classList.remove("currentCell");
//   prevNumber.classList.remove("previousCell");
// }

function clearArrays() {
  picArr = [];
  valueArr = [];
  weightArr = [];
}

function clearTreasureTable() {
  const table = document.querySelector("#treasure-table-content");
  table.innerHTML = "";
}

export { 
  picArr, 
  weightArr, 
  valueArr, 
  gridIsFull,DP}
  // export stuff from view.js to model.js
  export {clearArrays, clearTreasureTable, showArray, 
    displayGrid, setDP}
//#endregion


