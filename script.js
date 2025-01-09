window.addEventListener("load", init);

import { createGrid, setDP } from "./model.js";
import { displayGrid, showArray, setUpEventListeners } from "./view.js";
import { setStartValues, gameInterval } from "./controller.js";

function init() {
  setUpEventListeners();
  setStartValues();
  const DPValue = createGrid();
  setDP(DPValue)
  displayGrid();
  clearInterval(gameInterval);
}

export { showArray, displayGrid };
