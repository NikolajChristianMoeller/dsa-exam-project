window.addEventListener("load", init);

import { createGrid, DP, setDP } from "./model.js";
import { displayGrid, showArray, setUpEventListeners } from "./view.js";
import { setStartValues, gameInterval } from "./controller.js";

function init() {
  setUpEventListeners();
  setStartValues();
  //DP = createGrid();
  const DPValue = createGrid();
  setDP(DPValue)
  displayGrid();
  clearInterval(gameInterval);
}

export { showArray, displayGrid };
