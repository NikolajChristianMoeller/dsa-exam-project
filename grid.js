class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];
    this.newGrid();
  }

  newGrid() {
    // Reset the grid
    this.grid = [];

    for (let row = 0; row < this.rows; row++) {
      const newRow = [];

      for (let col = 0; col < this.cols; col++) {
        newRow[col] = 0; // Initialize each cell to 0
      }

      // Push the newly created row to the grid
      this.grid.push(newRow);
    }
  }
  // set(row, col, value) {
  //   if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
  //     return undefined; // Returner 0 for out-of-bounds celler
  //   }
  //   this.grid[row][col] = value;
  // }

  set(row, col, value) {
    this.grid[row][col] = value;
  }

  // set(cordinates, value) {
  //   const row = cordinates.row;
  //   const col = cordinates.col;

  //   this.set(row, col, value);
  // }

  get(row, col) {
    const rowArray = this.grid[row];
    const value = rowArray[col];
    return value;
  }

  // get(cordinates) {
  //   const row = cordinates.row;
  //   const col = cordinates.col;

  //   this.get(row, col);
  // }

  indexFor(coordinates) {
    const row = coordinates.row;
    const col = coordinates.col;
    this.indexFor(row, col);
  }

  indexFor(row, col) {
    let index = -1;

    for (let rIndex = 0; rIndex < row; rIndex++) {
      for (const cIndex = 0; cIndex < col; cIndex++) {
        index++;
      }
    }

    return { index };
  }

  rowColFor(index) {
    if (index >= 0 && index < this.grid.length) {
      const row = Math.floor(index / this.cols);
      const col = index % this.cols;
      return { row, col };
    } else {
      return "Index not in grid!";
    }
  }

  neighboursWithCheck(row, col) {
    if (row === 0) {
      if (col == 0) {
        // this is NORTH WEST
        const e = this.east(row, col);
        const s = this.south(row, col);
        const se = this.south_east(row, col);
        return [e, s, se];
      } else if (col === this.cols - 1) {
        // this is NORTH EAST
        const w = this.west(row, col);
        const s = this.south(row, col);
        const sw = this.south_west(row, col);
        return [w, s, sw];
      } else {
        // this is top North
        const e = this.east(row, col);
        const se = this.south_east(row, col);
        const w = this.west(row, col);
        const sw = this.south_west(row, col);
        const s = this.south(row, col);
        return [e, se, w, s, sw];
      }
    } else if (row === this.rows - 1) {
      if (col === 0) {
        // this is sout west
        const n = this.north(row, col);
        const ne = this.north_east(row, col);
        const e = this.east(row, col);
        return [n, ne, e];
      } else if (col === this.cols - 1) {
        // this is south east
        const n = this.north(row, col);
        const w = this.west(row, col);
        const nw = this.north_west(row, col);
        return [n, w, nw];
      } else {
        // this is bot South
        const n = this.north(row, col);
        const ne = this.north_east(row, col);
        const e = this.east(row, col);
        const nw = this.north_west(row, col);
        const w = this.west(row, col);
        return [n, ne, e, nw, w];
      }
    } else if (col === 0) {
      // this is far West
      const n = this.north(row, col);
      const ne = this.north_east(row, col);
      const e = this.east(row, col);
      const s = this.south(row, col);
      const sw = this.south_east(row, col);
      return [n, ne, e, s, sw];
    } else if (col === this.cols - 1) {
      // this is far ests
      const n = this.north(row, col);
      const nw = this.north_west(row, col);
      const w = this.west(row, col);
      const s = this.south(row, col);
      const sw = this.south_west(row, col);
      return [n, nw, w, s, sw];
    } else {
      return this.neighbours(row, col);
    }
  }

  neighbours(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }

    let neighbours = [];

    let north = this.north(row, col);
    let north_west = this.north_west(row, col);
    let north_east = this.north_east(row, col);
    let south_west = this.south_west(row, col);
    let south_east = this.south_east(row, col);
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

  // neighbours(row, col) {
  //   const neightbours = [];
  //   for (let ri = -1; ri <= 1; ri++) {
  //     console.log("ri ", ri);
  //     for (let ci = -1; ci <= 1; ci++) {
  //       if (!(ri === 0 && ci === 0)) {
  //         if (this.get(row, col) === 1) {
  //           // ------------------------ If you want to return the object with rows +  cols
  //           //   const objectRow = row + ri;
  //           //   const objectCol = col + ri;
  //           //   const cordinates = {
  //           //     objectRow,
  //           //     objectCol,
  //           //   };
  //           //   neightbours.push(cordinates);

  //           // ------------------------ If you want to return the values

  //           neightbours.push(this.grid[row + ri][col + ci]);
  //         }
  //       }
  //     }
  //   }
  //   return neightbours;
  // }

  // neightbours(coordinates) {
  //   const row = coordinates.row;
  //   const col = coordinates.col;
  //   this.neightbours(row, col);
  // }

  neightbourValues(row, col) {
    const neightbours = [];
    for (let ri = -1; ri <= 1; ri++) {
      for (let ci = -1; ci <= 1; ci++) {
        if (ci != 0 && ci != 0) {
          const value = this.grid[row + ri][col + ci];
          neightbours.push[value];
        }
      }
    }
    return neightbours;
  }

  neightbourValues(coordinates) {
    const row = coordinates.row;
    const col = coordinates.col;
    this.neightbourValues(row, col);
  }

  // nextInRow( row, col ) - returnerer cellen til højre efter denne, eller undefined hvis der ikke er flere i den row

  nextInRow(row, col) {
    const nextCell = this.grid[row][col + 1];
    if (nextCell != NaN) {
      return nextCell;
    }
    return undefined;
  }

  nextInRow(coordinates) {
    const nextRow = coordinates.row;
    const nextCol = coordinates.col;
    this.nextInRow(nextRow, nextCol);
  }

  nextInCol(row, col) {
    const nextRow = this.grid[row + 1];
    if (nextRow != undefined) {
      const nextCol = this.grid[row + 1][col];
      return nextCol;
    } else {
      return undefined;
    }
  }

  nextInCol(coordinates) {
    const nextRow = coordinates.row;
    const nextCol = coordinates.col;
    this.nextInCol(nextRow, nextCol);
  }

  north(row, col) {
    let value = this.grid[row - 1][col];
    return value;
  }

  north_west(row, col) {
    let value = this.grid[row - 1][col - 1];
    return value;
  }

  north_east(row, col) {
    let value = this.grid[row - 1][col + 1];
    return value;
  }

  south(row, col) {
    let value = this.grid[row + 1][col];
    return value;
  }

  south_west(row, col) {
    let value = this.grid[row + 1][col - 1];
    return value;
  }

  south_east(row, col) {
    let value = this.grid[row + 1][col + 1];
    return value;
  }

  west(row, col) {
    let value = this.grid[row][col - 1];
    return value;
  }

  east(row, col) {
    let value = this.grid[row][col + 1];
    return value;
  }

  rows() {
    return this.rows;
  }

  cols() {
    return this.cols;
  }

  size() {
    return this.cols * this.rows;
  }

  fill(value) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = value;
      }
    }
  }
}

export { Grid };
