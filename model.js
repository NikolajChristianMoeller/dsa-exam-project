import { Grid } from "./grid.js"
import { showArray, displayGrid } from "./script.js";
import { N, maxCapacity} from "./controller.js"

let picArr = [];
let weightArr = [];
let valueArr = [];
let DP;

const treasurePool = {
  1: { img: "crown", value: 10, weight: 3 },
  2: { img: "dagger", value: 6, weight: 2 },
  3: { img: "diamond_turkis", value: 15, weight: 2 },
  4: { img: "golden_totem", value: 12, weight: 4 },
  5: { img: "golden_cup", value: 8, weight: 1 },
  6: { img: "golden_scull", value: 10, weight: 3 },
  7: { img: "golden_wine_glass", value: 9, weight: 1 },
  8: { img: "money_with_sword", value: 11, weight: 5 },
  9: { img: "ruby", value: 14, weight: 2 },
  10: { img: "silver_wine_glass", value: 7, weight: 1 },
  11: { img: "sword", value: 9, weight: 4 },
};

function setDP(DPValue) {
  DP = DPValue;
}

function createGrid() {
  return new Grid(N, maxCapacity);
}

function clearArrays() {
  picArr = [];
  valueArr = [];
  weightArr = [];
}

function generateTreasures() {
  clearArrays();
  for (let i = 1; i <= N; i++) {
    const generateTreasure = Math.ceil(Math.random() * 11);
    picArr.push(treasurePool[generateTreasure].img);
    valueArr.push(treasurePool[generateTreasure].value);
    weightArr.push(treasurePool[generateTreasure].weight);
  }
  clearTreasureTable();
  picArr.forEach(showArray);
  let DPValue = createGrid();
  setDP(DPValue)
  displayGrid();
}

function clearTreasureTable() {
  const table = document.querySelector("#treasure-table-content");
  table.innerHTML = "";
}

export {treasurePool, createGrid, generateTreasures, picArr, weightArr, valueArr, DP, setDP}
