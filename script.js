window.addEventListener("load", init);

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
// Tempoary global var
let itemsAdded = [];

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
  console.log(grid);
  return grid;
}

function generateTreasures() {
  clearArrays();

  for (let i = 1; i <= N; i++) {
    const generateTreasure = Math.ceil(Math.random() * 11);

    // --- Log tressure
    //console.log("Generated number " + generateTreasure);

    picArr.push(treasurePool[generateTreasure].img);
    valueArr.push(treasurePool[generateTreasure].value);
    weightArr.push(treasurePool[generateTreasure].weight);
  }

  clearTreasureTable();
  picArr.forEach(showArray);
  DP = createGrid();
  displayGrid();
}
//#endregion

// ******************************* VIEW **********************************
//#region View
function displayGrid() {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
  grid.style.setProperty("--C", maxCapacity + 2);
  grid.style.setProperty("--N", N + 2);

  for (let row = 0; row < N + 2; row++) {
    for (let col = 0; col < maxCapacity + 2; col++) {
      const cellValue = DP[row][col];
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
    console.log("a");
  } else if (row > 0 && col === 0) {
    cell.classList.add("itemHeader");
    console.log("b");
  }
}

// -- NB: der er element parameter for at funktionen virker
function showArray(element, index) {
  const table = document.querySelector("#treasure-table-content");
  console.log(picArr[index]);
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

function setUpEventListeners() {
  document.querySelector("#capacity").addEventListener("change", setCapacity);
  document.querySelector("#treasures").addEventListener("change", setTreasure);
  document
    .querySelector("#solve-button")
    .addEventListener("click", solveKnapsackButton);
  document
    .querySelector("#reset-button")
    .addEventListener("click", resetKnapsackButton);
  document
    .querySelector("#stop-button")
    .addEventListener("click", stopKnapsackButton);
  document
    .querySelector("#continue-button")
    .addEventListener("click", continueKnapsackButton);
}

function setStartValues() {
  maxCapacity = 1;
  N = 1;
}

function setCapacity(event) {
  resetApplication();
  maxCapacity = Number(event.target.value);
  console.log("C set to " + maxCapacity);
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
  console.log("Treasure set to " + N);
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

      // console.log("Set værdien til det ovenstående");
      // console.log(` (Item ${i - 1} : Capacity ${c - 1}) Val = ` + DP[i][c]);

      // Vi sætter capacity til at være c-1 for at tage højde for 'col' 0 som er reserveret til item værdierne.
      const capacity = c - 1;
      /* STEP  2 ---------------------------------------------------------- */
      if (capacity >= w && DP[i - 1][c - w] + v > DP[i][c]) {
        DP[i][c] = DP[i - 1][c - w] + v;
        // console.log(
        //   "Set værdien til itemets værdi - plus det det der ellers er plads til");
        // console.log(` (Item ${i - 1} : Capacity ${c - 1}) Val = ` + DP[i][c]);
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
  console.log("removeClasses kører");
  number.classList.remove("currentCell");
  prevNumber.classList.remove("previousCell");
}

function knapSackBacktrack() {
  // Vi køre algoritmen så længe 'rows' er højere end 1 - da row 1 er reserveret til item '0'.
  if (i > 1) {
    const number = document.getElementById(`DP${i}:${c}`);
    const prevNumber = document.getElementById(`DP${i - 1}:${c}`);
    console.log("This is previous number");
    console.log(prevNumber);
    console.log("This is current number");
    console.log(number);

    const leftNumber = document.getElementById(
      `DP${i - 1}:${c - weightArr[i - 2]}`
    );
    number.classList.add("currentCell");
    prevNumber.classList.add("previousCell");
    //id = setTimeout(removeClasses, 1000, number, prevNumber)

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
  console.log(itemsAdded);
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
  // reset Items added - tempoary solution
  itemsAdded = [];
}

function resetGridIsFull() {
  gridIsFull = false;
}

function stopGameInterval() {
  clearInterval(gameInterval);
}

function solveKnapsackButton() {
  console.log("Clicked on Solve");
  startGameInterval();
  displayGrid();
}

function resetKnapsackButton() {
  console.log("Clicked on Reset");
}

function stopKnapsackButton() {
  console.log("Clicked on Stop");
  stopGameInterval();
  clearTimeout(id);
}

function continueKnapsackButton() {
  console.log("Clicked on Continue");
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
//#endregion
