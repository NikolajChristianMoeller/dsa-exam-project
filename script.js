
let capacity = C;
let weights = W;

function knapSack() {

}














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
