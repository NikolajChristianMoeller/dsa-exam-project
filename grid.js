export class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];
    this.newGrid();
    this.gridIsFull = false
  }

  newGrid() {
    this.grid = []
    for (let row = 0; row <= this.rows + 1; row++) {
      const newRow = [];
      this.grid.push(newRow)
      for (let col = 0; col <= this.cols + 1; col++) {
        if (row === 0 && col === 0) {
          newRow.push(" ");
        } else if (row === 0 && col > 1) {
          newRow.push(col - 1);
        } else if (col === 0 && row > 1) {
          newRow.push(row - 1);
        } else {
          newRow.push(0);
        }
      }
    }
  }

  getIsGridFull() {
    return this.gridIsFull
  }

  isGridFull(value) {
    this.gridIsFull = value
  }

  get(row, col) {
    let value = this.grid[row][col];
    return value;
  }

  set(row, col, value) {
    this.grid[row][col] = value;
  }
}
