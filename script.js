window.addEventListener("load", init);

// ******************************* MODEL *********************************
//#region Model
let gameInterval;
let picArr = [];
let weightArr = [];
let valueArr = [];
let maxCapacity = 0;
let N = 0;
let DP;

const treasurePool = {
  1: { img: "crown", value: 10, weight: 1 },
  2: { img: "dagger", value: 6, weight: 2 },
  3: { img: "diamond_turkis", value: 15, weight: 3 },
  4: { img: "golden_totem", value: 12, weight: 4 },
  5: { img: "golden_cup", value: 8, weight: 5 },
  6: { img: "golden_scull", value: 10, weight: 6 },
  7: { img: "golden_wine_glass", value: 9, weight: 5 },
  8: { img: "money_with_sword", value: 11, weight: 5 },
  9: { img: "ruby", value: 14, weight: 5 },
  10: { img: "silver_wine_glass", value: 7, weight: 5 },
  11: { img: "sword", value: 9, weight: 5 },
};

function createGrid() {
  const grid = [];
  for (let i = 0; i <= N + 1; i++) {
    const row = [];
    grid.push(row);
    for (let j = 0; j <= maxCapacity + 1; j++) {
      if (i === 0 && j > 1) {
        row.push(j - 1); // Første række med kapacitet (værdier)
      } else if (j === 0 && i > 1) {
        row.push(i - 1); // Første kolonne med objekter
      } else {
        row.push(0); // Resten er 0
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
    console.log("Generated number " + generateTreasure);

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
  grid.style.setProperty("--C", maxCapacity + 2); // Tilføj ekstra kolonner
  grid.style.setProperty("--N", N + 2); // Tilføj ekstra rækker

  for (let row = 0; row < N + 2; row++) {
    for (let col = 0; col < maxCapacity + 2; col++) {
      const cellValue = DP[row][col]; // Få værdien fra DP-arrayet
      const cell = /*html*/ `
            <div class="cell">
            ${cellValue}
            </div>`;
      grid.insertAdjacentHTML("beforeend", cell);
    }
  }
}

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
  //knapSack();
  //displayGrid();
  clearInterval(gameInterval);
  // gameInterval = setInterval(() => {
  //   bubbleSort(array);
  //   renderArray();
  // }, 2000);
}

function setUpEventListeners() {
  document.querySelector("#capacity").addEventListener("change", setCapacity);
  document.querySelector("#treasures").addEventListener("change", setTreasure);
  document.querySelector("#solve-button").addEventListener("click", solveKnapsackButton);
  document.querySelector("#reset-button").addEventListener("click", resetKnapsackButton);
  document.querySelector("#stop-button").addEventListener("click", stopKnapsackButton);
}

function setStartValues() {
  maxCapacity = 1;
  N = 1;
}

function setCapacity(event) {
  maxCapacity = Number(event.target.value);
  console.log("C set to " + maxCapacity);
  DP = createGrid();
  displayGrid();
}

function setTreasure(event) {
  N = Number(event.target.value);
  console.log("Treasure set to " + N);
  generateTreasures();
}

function knapSack() {
  if (maxCapacity < 0 || weightArr.length != valueArr.length || weightArr.length == null || valueArr.length == null) {
    throw new Error("Invalid input: Check that weights and values");
  }
  console.log("knapSack starter")
  console.log(DP);
  // laver 2D arrayet
  // const DP = [];
  // for (let i = 0; i <= W.length; i++) {
  //     const row = [];
  //     DP.push(row);
  //     for (let j = 0; j <= C; j++) {
  //         const cell = 0;
  //         row.push(cell);
  //     }
  // }
  // definer antal objekter
  //const N = W.length;
  for (let i = 2; i <= N + 1; i++) {
    let w = weightArr[i - 1];
    let v = valueArr[i - 1];

    for (let c = 2; c <= maxCapacity + 1; c++) {
      DP[i][c] = DP[i - 1][c];
      // setTimeout skal stoppe her ^ gør at vi ser på nuværende celle
      if (c >= w && DP[i - 1][c - w] + v > DP[i][c]) {
        DP[i][c] = DP[i - 1][c - w] + v;
      }
    }
  }

  let itemsAdded = [];
  let capacity = maxCapacity;

  for (let i = N; i > 0; i--) {
    // console.log("nuværende obj " + DP[i][capacity]);
    // console.log("forrige obj " + DP[i - 1][capacity]);
    if (DP[i][capacity] != DP[i - 1][capacity]) {
      itemsAdded.push(valueArr[i - 1]);
      capacity = capacity - weightArr[i - 1];
    }
    // hvis værdien er den samme som forrige 
    // else if (DP[i][capacity] === DP[i - 1][capacity]) {
    //   capacity = capacity
    // }
  }
  return DP[N][maxCapacity];
}

function startGameInterval() {
  stopGameInterval()
  gameInterval = setInterval(() => {
  console.log(gameInterval);
  }, 2000)
}

function stopGameInterval() {
  clearInterval(gameInterval)
}

function solveKnapsackButton() {
  console.log("Clicked on Solve");
  //startGameInterval();
  knapSack();
  displayGrid();
}

function resetKnapsackButton() {
  console.log("Clicked on Reset");
}

function stopKnapsackButton() {
  console.log("Clicked on Stop");
  stopGameInterval();
}

// function continueKnapsackButton() {
//   console.log("Clicked on Stop");
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
//#endregion
