export class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];
    this.newGrid();
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

  get(row, col) {
    let value = this.grid[row][col];
    return value;
  }

  set(row, col, value) {
    this.grid[row][col] = value;
  }

  indexFor(row, col) {
    return row * this.cols + col;
  }

  rowColFor(index) {
    const row = Math.floor(index / this.cols);
    const col = index % this.rows;
    return this.grid[row][col];
  }

  neighbours(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }

    let neighbours = [];

    let north = this.north(row, col);
    let north_west = this.grid[row - 1][col - 1];
    let north_east = this.grid[row - 1][col + 1];
    let south_west = this.grid[row + 1][col - 1];
    let south_east = this.grid[row + 1][col + 1];
    let south = this.south(row, col);
    let west = this.west(row, col);
    let east = this.east(row, col);

    neighbours.push(
      north,
      south,
      east,
      west,
      north_west,
      north_east,
      south_east,
      south_west
    );

    return neighbours;
  }

  neighboursCount(row, col) {
    if (
      row >= this.rows.length ||
      col >= this.cols.length ||
      row < 0 ||
      col < 0
    ) {
      return undefined;
    }

    let neighbours = [];

    let north = this.north(row, col);
    let north_west = this.grid[row - 1][col - 1];
    let north_east = this.grid[row - 1][col + 1];
    let south_west = this.grid[row + 1][col - 1];
    let south_east = this.grid[row + 1][col + 1];
    let south = this.south(row, col);
    let west = this.west(row, col);
    let east = this.east(row, col);

    neighbours.push(
      north,
      south,
      east,
      west,
      north_west,
      north_east,
      south_east,
      south_west
    );

    let count = 0;
    for (const neighbour of neighbours) {
      if (neighbour !== undefined) {
        count++;
      }
    }
    return count;
  }

  neighboursValue(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }

    let neighbours = [];

    let north = this.north(row, col);
    let north_west = this.grid[row - 1][col - 1];
    let north_east = this.grid[row - 1][col + 1];
    let south_west = this.grid[row + 1][col - 1];
    let south_east = this.grid[row + 1][col + 1];
    let south = this.south(row, col);
    let west = this.west(row, col);
    let east = this.east(row, col);

    neighbours.push(
      north,
      south,
      east,
      west,
      north_west,
      north_east,
      south_east,
      south_west
    );

    let interator = neighbours.values();
    for (const value of interator) {
      console.log(value);
    }
  }

  nextInRow(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row][col - 1];
    return value;
  }

  north(row, col) {
    if (row - 1 < 0) {
      return undefined;
    }
    let value = this.grid[row - 1][col];
    return value;
  }

  south(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row + 1][col];
    return value;
  }

  west(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row][col - 1];
    return value;
  }
  east(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row][col + 1];
    return value;
  }

  row() {
    return this.rows;
  }

  col() {
    return this.cols;
  }

  size() {
    return this.rows * this.cols;
  }

  fill(value) {
    for (let row = 0; row < this.row(); row++) {
      for (let col = 0; col < this.col(); col++) {
        this.grid[row][col] = value;
      }
    }
  }

  dump() {
    console.table(this.grid);
  }
}
