import { setCapacity, N, maxCapacity, setTreasure, solveKnapsackButton, stopKnapsackButton } from "./controller.js";
import { picArr, weightArr, valueArr, DP } from "./model.js";

function setUpEventListeners() {
  document.querySelector("#capacity").addEventListener("change", setCapacity);
  document.querySelector("#treasures").addEventListener("change", setTreasure);
  document.querySelector("#solve-button").addEventListener("click", solveKnapsackButton);
  document.querySelector("#stop-button").addEventListener("click", stopKnapsackButton);
}

function displayGrid() {
  // Laver en grid variabel og putter "grid"-klassen på variablen
  const grid = document.querySelector(".grid");
  // HTMLen i griddet sættes til at være en tom streng
  grid.innerHTML = "";
  // 1. Sæt maxCapacity og items (N) til + 2 da vi vi gerne vil være i stand til...
  // at den skal manipulere til at vise de tal som IKKE er på række 1 og 2 og kolonne 1 og 2
  grid.style.setProperty("--C", maxCapacity + 2);
  grid.style.setProperty("--N", N + 2);
  // 1. Her viser vi selve cellens værdi (cellValue) i det vi bruger vores Grid klasses Get-metode til at hente værdien
  // 2. Vi HTML dom manipulerer selve cellen i griddet så den får cellValue og klassen "cell"
  for (let row = 0; row < N + 2; row++) {
    for (let col = 0; col < maxCapacity + 2; col++) {
      const cellValue = DP.get(row, col);
      const cell = /*html*/ `
            <div id="DP${row}:${col}" class="cell">
            ${cellValue}
            </div>`;
      // Vi indsætter cellen efter sidste element
      grid.insertAdjacentHTML("beforeend", cell);
      // colorizeCellHeaders kaldes med row og col
      colorizeCellHeaders(row, col);
    }
  }
}

function colorizeCellHeaders(row, col) {
  // Vi får cellens ID med række og kolonne
  const cell = document.getElementById(`DP${row}:${col}`);
  // Hvis row og kol er = 0 (hvilket de jo er i række 1 og kolonne 1)
  if (row === 0 && col == 0) {
    // Så fjernes cellens klasse på dem først (da vi skal putte 2 nye klasse på dem)
    cell.classList.remove("cell");
  } else if (row === 0 && col > 0) {
    // Den får klassen capacityHeader som har en farve
    cell.classList.add("capacityHeader");
  } else if (row > 0 && col === 0) {
    // Den får klassen itemHeader som har en farve
    cell.classList.add("itemHeader");
  }
}

function showItemStatus(isSelected, i) {
  const itemHeadder = document.getElementById(`DP${i}:0`);
  itemHeadder.classList.remove("itemHeader");
  console.log(itemHeadder);
  console.log(isSelected);
  if (isSelected == true) {
    itemHeadder.classList.add("iteamAdded");
  } else {
    itemHeadder.classList.add("itemDiscarded");
  }
}


function showArray(element, index) {
  // Table skal bruges klassen "treasure-table-content" da vi skal bruge dens ID
  const table = document.querySelector("#treasure-table-content");
  // Henter det specifikke pictures index nr i arrayet
  const imgPath = `./public/treasures/${picArr[index]}.svg`;
  // 1. Vi dom manipulerer og renderer en table, giver den klassen treasure-image
  // 2. Den henter billedet fra stien, samt putter det billede fra dets index ind og giver den klassen "treasure-img"
  // 3. Den viser også weight- og valueArr's specifikke index nr.
  // 4. Er grunden til index + 1 at den første række er vores TD header?
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
  // Vi indsætter cellen efter sidste element
  table.insertAdjacentHTML("beforeend", html);
}

export { displayGrid, colorizeCellHeaders, showArray, setUpEventListeners, showItemStatus }
