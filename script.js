window.addEventListener('load', init);

// ****** MODEL ******
// #region Model
let treasurePicArr = [];
let treasureWeightArr = [];
let treasureValueArr = [];
let C = 0;
let N = 0;
let DP;

const W = [3, 1, 3, 4, 2];
const V = [2, 2, 4, 5, 3];
const treasurepool = {
  1: { img: "crown", value: 10, weight: 8 },
  2: { img: "dagger", value: 6, weight: 5 },
  3: { img: "diamond_turkis", value: 15, weight: 2 },
  4: { img: "golden_totem", value: 12, weight: 10 },
  5: { img: "golden_cup", value: 8, weight: 7 },
  6: { img: "golden_scull", value: 10, weight: 9 },
  7: { img: "golden_wine_glass", value: 9, weight: 6 },
  8: { img: "money_with_sword", value: 11, weight: 8 },
  9: { img: "ruby", value: 14, weight: 2 },
  10: { img: "silver_wine_glass", value: 7, weight: 5 },
  11: { img: "sword", value: 9, weight: 6 },
};

function createGrid() {
  const grid = [];
  for (let i = 0; i <= N + 1; i++) {
    const row = [];
    grid.push(row);
    for (let j = 0; j <= C + 1; j++) {
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

    treasurePicArr.push(treasurepool[generateTreasure].img);
    treasureValueArr.push(treasurepool[generateTreasure].value);
    treasureWeightArr.push(treasurepool[generateTreasure].weight);
  }

  clearTreasureTable();
  treasurePicArr.forEach(showArray);
  DP = createGrid();
  displayGrid();
}
// #endregion

// ****** VIEW ******
// #region View
function displayGrid() {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
  grid.style.setProperty("--C", C + 2); // Tilføj ekstra kolonner
  grid.style.setProperty("--N", N + 2); // Tilføj ekstra rækker

  for (let row = 0; row < N + 2; row++) {
    for (let col = 0; col < C + 2; col++) {
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
  console.log(treasurePicArr[index]);
  const imgPath = `./public/treasures/${treasurePicArr[index]}.svg`;

  const html = /*html*/ `
            <tr> 
                <td>${index + 1}</td>
                <td class="treasure-image">
                    <img src="${imgPath}" alt="${
    treasurePicArr[index]
  }" class="treasure-img">
                </td>
                <td>${treasureWeightArr[index]}</td>
                <td>${treasureValueArr[index]}</td>
            </tr>
  `;
  table.insertAdjacentHTML("beforeend", html);
}
// #endregion

// ****** CONTROLLER ******
// #region Controller
function init() {
  setUpEventListeners();
  setStartValues();
  DP = createGrid();
  displayGrid();
}

function setUpEventListeners() {
  document.querySelector("#capacity").addEventListener("change", setCapacity);
  document.querySelector("#treasures").addEventListener("change", setTreasure);
  document.querySelector("#solve-button").addEventListener("click", solveKnapsack);
  document.querySelector("#reset-button").addEventListener("click", resetKnapsack);
  document.querySelector("#stop-button").addEventListener("click", stopKnapsack);
}

function setStartValues() {
  C = 1;
  N = 1;
}

function knapSack() {
    // tjekker at der er en capacity
    if (C < 0 || W.length != V.length || W.length == null || V.length == null) {
        throw new Error('Invalid input: Check that weights and values');
    }
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
    const N = W.length;
    for (let i = 1; i <= N; i++) {
        let w = W[i - 1];
        let v = V[i - 1];

        for (let c = 1; c <= C; c++) {
            DP[i][c] = DP[i - 1][c];
            if (c >= w && DP[i - 1][c - w] + v > DP[i][c]) {
                DP[i][c] = DP[i - 1][c - w] + v;
            }
        }
    }

    let itemsAdded = [];
    let capacity = C;

    for (let i = N; i > 0; i--) {
        // console.log("nuværende obj " + DP[i][capacity]);
        // console.log("forrige obj " + DP[i - 1][capacity]);

        if (DP[i][capacity] != DP[i - 1][capacity]) {
            console.log();
            itemsAdded.push(V[i - 1]);
            capacity = capacity - W[i - 1];
        } else {
        }
    }
    return DP[N][C];
}

function setCapacity(event) {
    C = Number(event.target.value);
    console.log('C set to ' + C);
    DP = createGrid();
    displayGrid();
}

function solveKnapsack() {
  console.log("Clicked on Solve");
}

function resetKnapsack() {
  console.log("Clicked on Reset");
}

function stopKnapsack() {
  console.log("Clicked on Stop");
}

function setTreasure(event) {
    N = Number(event.target.value);
    console.log('Treasure set to ' + N);
    generateTreasures();
}

function clearArrays() {
    treasurePicArr = [];
    treasureValueArr = [];
    treasureWeightArr = [];
}

function clearTreasureTable() {
  const table = document.querySelector("#treasure-table-content");
  table.innerHTML = "";
}
