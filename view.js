//bruger indput og skærm, bruger input og output
import { maxCapacity, N, DP, picArr, weightArr, valueArr } from "./script.js"
import { setCapacity, setTreasure, solveKnapsackButton, stopKnapsackButton} from "./script.js"

function setUpEventListeners() {
  document.querySelector("#capacity").addEventListener("change", setCapacity);
  document.querySelector("#treasures").addEventListener("change", setTreasure);
  document.querySelector("#solve-button").addEventListener("click", solveKnapsackButton);
  document.querySelector("#stop-button").addEventListener("click", stopKnapsackButton);
}

function displayGrid() {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
  grid.style.setProperty("--C", maxCapacity + 2);
  grid.style.setProperty("--N", N + 2);
  console.log("This is grid")
  console.log(DP)
  for (let row = 0; row < N + 2; row++) {
    for (let col = 0; col < maxCapacity + 2; col++) {
      const cellValue = DP.get(row, col)
      const cell = /*html*/ `
            <div id="DP${row}:${col}" class="cell">
            ${cellValue}
            </div>`;
      grid.insertAdjacentHTML("beforeend", cell);
      colorizeCellHeaders(row, col);
    }
  }
}

function colorizeCellHeaders(row, col) {
  const cell = document.getElementById(`DP${row}:${col}`);
  if (row === 0 && col == 0) {
    cell.classList.remove("cell");
  } else if (row === 0 && col > 0) {
    cell.classList.add("capacityHeader");
  } else if (row > 0 && col === 0) {
    cell.classList.add("itemHeader");
  }
}

function showArray(element, index) {
   const table = document.querySelector("#treasure-table-content");
   const imgPath = `./public/treasures/${picArr[index]}.svg`;
   const html = /*html*/ `
              <tr> 
                  <td>${index + 1}</td>
                  <td class="treasure-image">
                      <img src="${imgPath}" alt="${
     picArr[index]
   }" class="treasure-img">
                  </td>
                  <td>${weightArr[index]}</td>
                  <td>${valueArr[index]}</td>
              </tr>
    `;
   table.insertAdjacentHTML("beforeend", html);
 }

export { displayGrid, colorizeCellHeaders, showArray, setUpEventListeners }