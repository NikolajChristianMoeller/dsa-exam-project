// vores data, allerbagerst. vores grid etc, forretningslogik

import { N, maxCapacity, picArr, weightArr, valueArr, DP, setDP } from "./script.js"
import { clearArrays, clearTreasureTable } from "./script.js"
import { showArray, displayGrid } from "./script.js";

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

function createGrid() {
  const grid = [];
  for (let i = 0; i <= N + 1; i++) {
    const row = [];
    grid.push(row);
    for (let j = 0; j <= maxCapacity + 1; j++) {
      if (i === 0 && j === 0) {
        row.push(" ");
      } else if (i === 0 && j > 1) {
        row.push(j - 1);
      } else if (j === 0 && i > 1) {
        row.push(i - 1);
      } else {
        row.push(0);
      }
    }
  }
  return grid;
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

export {treasurePool, createGrid, generateTreasures}