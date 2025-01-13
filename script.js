window.addEventListener("load", init);

import { createGrid, setDP } from "./model.js";
import { displayGrid, showArray, setUpEventListeners } from "./view.js";
import { setStartValues, gameInterval } from "./controller.js";

function init() {
  setUpEventListeners();
  setStartValues();
  const DPValue = createGrid();
  // Vi er nødsaget til at kalde setDP som sætter værdien af DPValue (ligesom i Java)
  // Da det var den "eneste" mulighed for os at få værdien af DP (da den bliver immutable)
  setDP(DPValue)
  displayGrid();
  clearInterval(gameInterval);
}

export { showArray, displayGrid };
