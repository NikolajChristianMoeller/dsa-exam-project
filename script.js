let C = 7;
let W = [3, 1, 3, 4, 2];
let V = [2, 2, 4, 5, 3];

function knapSack() {
  // tjekker at der er en capacity
  if (
    capacity < 0 ||
    W.length != V.length ||
    W.length == null ||
    V.length == null
  ) {
    throw new Error("Invalid input: Check that weights and values");
  }
  // laver 2D arrayet
  const DP = [];
  for (let i = 0; i <= W.length; i++) {
    const row = [];
    DP.push(row);
    for (let j = 0; j <= C; j++) {
      const cell = 0;
      row.push(cell);
    }
  }
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
      //console.log("col nr " + [c]);
    }
    console.table(DP);
  }
}

knapSack();

// // Knapsack function using Dynamic Programming
// function knapsack(capacity, weights, values) {
//   // Check for valid inputs
//   if (capacity < 0 || weights.length !== values.length) {
//     throw new Error(
//       "Invalid input: Check that weights and values arrays are of the same length and capacity is non-negative."
//     );
//   }

//   const N = weights.length; // Number of items
//   const DP = Array.from({ length: N + 1 }, () => Array(capacity + 1).fill(0)); // Initialize DP grid

//   // Fill the DP table
//   for (let i = 1; i <= N; i++) {
//     const w = weights[i - 1]; // Current item's weight
//     const v = values[i - 1]; // Current item's value
//     for (let sz = 1; sz <= capacity; sz++) {
//       // Case 1: Exclude the current item
//       DP[i][sz] = DP[i - 1][sz];

//       // Case 2: Include the current item, if it fits
//       if (sz >= w) {
//         DP[i][sz] = Math.max(DP[i][sz], v + DP[i - 1][sz - w]);
//       }
//     }
//   }

//   // Backtracking to find selected items
//   let sz = capacity; // Start with full capacity
//   const selectedItems = [];
//   for (let i = N; i > 0; i--) {
//     if (DP[i][sz] !== DP[i - 1][sz]) {
//       // Item i was included
//       selectedItems.push(i - 1); // Use 0-based indexing
//       sz -= weights[i - 1]; // Reduce remaining capacity
//     }
//   }

//   // Return the result: maximum value and selected items
//   return {
//     maxValue: DP[N][capacity],
//     selectedItems,
//   };
// }

// // Example usage:
// const weights = [2, 3, 4, 5];
// const values = [3, 4, 5, 6];
// const capacity = 5;

// const result = knapsack(capacity, weights, values);
// console.log("Maximum Value:", result.maxValue); // Outputs: Maximum Value: 7
// console.log("Selected Items:", result.selectedItems); // Outputs: Selected Items: [1, 0] (items 2 and 1 in 0-based index)
