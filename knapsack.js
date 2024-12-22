const C = 7;
const W = [3, 1, 3, 4, 2];
const V = [2, 2, 4, 5, 3];

function knapSack() {
  // tjekker at der er en capacity
  if (C < 0 || W.length != V.length || W.length == null || V.length == null) {
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
    }
  }

  let itemsAdded = [];
  let capacity = C;

  for (let i = N; i > 0; i--) {
    console.log("nuværende obj " + DP[i][capacity]);
    console.log("forrige obj " + DP[i - 1][capacity]);

    if (DP[i][capacity] != DP[i - 1][capacity]) {
      console.log();
      itemsAdded.push(V[i - 1]);
      capacity = capacity - W[i - 1];
    } else {
      console.log("false");
    }
  }
  console.log(itemsAdded);
  return DP[N][C];
}

console.log(knapSack());
