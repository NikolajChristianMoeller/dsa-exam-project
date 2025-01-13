import { Grid } from "./grid.js"
import { showArray, displayGrid } from "./script.js";
import { N, maxCapacity } from "./controller.js"

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
  // Vi vil have værdien af griddet, derfor sætter vi den
  DP = DPValue;
}
// Grid klassen returneres med items og maxCapacity fordi vi laver et nyt grid når vi vil køre algoritmen igen
function createGrid() {
  return new Grid(N, maxCapacity);
}
// Vores tre arrays sættes til at være tomme så de kan bruges igen, hvis vi vil prøve algoritmen på ny
function clearArrays() {
  picArr = [];
  valueArr = [];
  weightArr = [];
}

function generateTreasures() {
  // 1. Vi kalder clearArrays i starten, da når vi vil køre algoritmen igen, skal den først sørge for...
  // at den har tomme værdier i dens treasure arrays (pic, value, weight)
  clearArrays();
  // 2. For-loopet genererer blot treasures, blandt de 11 forskellige treasures vi har...
  // Vi pusher dernæst et image, value og weight baseret på den Math.ceil (som runder op til nærmeste integer)
  for (let i = 1; i <= N; i++) {
    const generateTreasure = Math.ceil(Math.random() * 11);
    picArr.push(treasurePool[generateTreasure].img);
    valueArr.push(treasurePool[generateTreasure].value);
    weightArr.push(treasurePool[generateTreasure].weight);
  }
  // clearTreasureTable kaldes så HTMLen bliver en tom streng i treasure tabellen
  clearTreasureTable();
  // For hver picArr vil vi vise et array (alle de skatte der vises i kisten - fra venstre til højre)
  picArr.forEach(showArray);
  // Laver en variabel til createGrid så værdien ikke er readable only
  let DPValue = createGrid();
  // setDP kaldes med DPValue da vi var nødsaget til at få fat i værdien af variablen DP på den måde
  setDP(DPValue);
  displayGrid();
}

function clearTreasureTable() {
  // Der laves en variable til  hente ID'et fra treasure-table-content i HTML'en
  // Dernæst bliver vores tabel sat til at have tomme værdier så vi har et ren skattekiste
  const table = document.querySelector("#treasure-table-content");
  table.innerHTML = "";
}

export { treasurePool, createGrid, generateTreasures, picArr, weightArr, valueArr, DP, setDP }
