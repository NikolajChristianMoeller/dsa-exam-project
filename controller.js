import { displayGrid, showItemStatus } from "./view.js";
import {
  createGrid,
  generateTreasures,
  weightArr,
  valueArr,
  DP,
  setDP,
} from "./model.js";
import { displayGrid } from "./view.js";

let i = 2;
let c = 2;
let N = 0;
let id = 0;
let maxCapacity = 0;
let gameInterval;
let itemsAdded = [];

function setN(value) {
  // N er når brugeren definerer hvor mange items der skal være
  // Vi er nødsaget til at sætte N = value fordi vi skal hente den specifikke value fra item
  // Når vi har N defineret i dette modul kan vi ikke direkte opdatere værdien
  // Vi er nødsaget til at bruge funktionen i det andet sted for at få værdien
  N = value;
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
    // Vi vil gerne tilføje en row hvor der kun er 0 i. Derved kan vi sammenligne senere når vi skal forwardtracke
    if (c <= maxCapacity + 1) {
      const preVal = DP.get(i - 1, c);
      // Vi sætter bare den tidligere celles værdi på nuværende celle
      DP.set(i, c, preVal);
      const capacity = c - 1;
      if (capacity >= w && DP.get(i - 1, c - w) + v > DP.get(i, c)) {
        let updatedCell = DP.get(i - 1, c - w) + v;
        DP.set(i, c, updatedCell);
      }
      c++;
      // Else if c er større end maxCapacity + 1 ved vi nu at vi er gået gennem alle capa
    } else if (c > maxCapacity + 1) {
      i++;
      c = 2;
    }
  } else if (i > N + 1) {
    // Hvis i (der hvor vi er nået til i griddet) er mere end number of items + 1...
    // Så ved vi at griddet er blevet fyldt ud. Derfor sætter vi isGridFull til at være true
    DP.isGridFull(true);
    // Vi gendefinerer number of items og maxCapacity
    i = N + 1;
    c = maxCapacity + 1;
  }
  displayGrid();
}

function knapSackBacktrack() {
  if (i > 1) {
    setClassColours();
    if (DP.get(i, c) != DP.get(i - 1, c)) {
      showItemStatus(true, i);
    } else {
      showItemStatus(false, i);
    }
    i--;
  } else {
    resetApplication();
  }
  // Vi lander på det sidste items værdi
  return DP.get(N, maxCapacity);
}


function setClassColours() {
  // Gemmer ID'et i to variabler da vi skal bruge variablerne til at sætte deres farver
  const number = document.getElementById(`DP${i}:${c}`);
  const prevNumber = document.getElementById(`DP${i - 1}:${c}`);
  let leftNumber = 0;
  // Tager højde for at vi ikke putter en klasse på en celle som ikke findes
  // altså at den er ude for griddet. Vi sørger for at den ikke får en out of bounce
  if (c - weightArr[i - 2] > 0 && number.innerText !== prevNumber.innerText) {
    leftNumber = document.getElementById(`DP${i - 1}:${c - weightArr[i - 2]}`);
    leftNumber.classList.add("previousCell");
  }
  // Vi sætter farver på itemsne når der backtrackes
  number.classList.add("currentCell");
  prevNumber.classList.add("previousCell");
  id = setTimeout(() => {
    number.classList.remove("currentCell");
    prevNumber.classList.remove("previousCell");
    if (leftNumber !== 0) {
      leftNumber.classList.remove("previousCell");
    }
  }, 500);
}

function setTreasure(event) {
  resetApplication();
  // event.target.value er bruger input
  // Number da den før var en streng
  let newN = Number(event.target.value);
  // setN kaldes med newN
  setN(newN);
  generateTreasures();
}

function startGameInterval() {
  stopGameInterval();
  // setInterval eksekverer noget per sekund. Den siger, "Hvad der skal ske?" og 2. selve interval hyppigheden
  gameInterval = setInterval(() => {
    console.log(gameInterval)
    // hvis vi skal ned i if statementet, SKAL det være true.
    // Derfor sætter vi gridIsFull i controlleren til at være false til start
    if (!DP.getIsGridFull()) {
      knapSack();
    } else {
      knapSackBacktrack();
    }
  }, 500);
}

function solveKnapsackButton() {
  startGameInterval();
  displayGrid();
}

function stopKnapsackButton() {
  stopGameInterval();
  clearTimeout(id);
}

function stopGameInterval() {
  clearInterval(gameInterval);
}

function resetApplication() {
  stopGameInterval();
  resetColAndRowValues();
  resetGridIsFull();
  // itemsAdded sættes til at være et tomt array...
  // da vi også bruger arrayet når vi backtracker tilbage i griddet.
  // Og vi er nødt til at gemme disse items i et array
  itemsAdded = [];
}

function resetGridIsFull() {
  DP.isGridFull(false);
}

function setStartValues() {
  maxCapacity = 1;
  N = 1;
}

function setCapacity(event) {
  resetApplication();
  maxCapacity = Number(event.target.value);
  const DPValue = createGrid();
  setDP(DPValue);
  displayGrid();
}

function resetColAndRowValues() {
  c = 2;
  i = 2;
}

export {
  knapSack,
  knapSackBacktrack,
  setStartValues,
  setCapacity,
  maxCapacity,
  N,
  i,
  c,
  resetColAndRowValues,
  setN,
  id,
  setTreasure,
  solveKnapsackButton,
  stopKnapsackButton,
  gameInterval,
};
