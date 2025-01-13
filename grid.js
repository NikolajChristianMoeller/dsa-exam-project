export class Grid {
  // this. betyder at når vi laver en ny instans af klassen grid når klassen initialiseres med new
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    // this.grid = [] sørger for at det griddet altid starter som et tomt array
    this.grid = [];
    this.newGrid();
    // grid starter med at være false
    this.gridIsFull = false;
  }
  
  newGrid() {
    // Det gamle grid ville ikke have blive ryddet hvis vi ikke have this.grid = [] nedenunder
    // Data fra tidligere runder kunne blive bevaret, og det vil vi ikke have
    this.grid = [] // denne her er redundant
    // Hele body skal pushes før vi eksekverer row++
    // Det yderste loop laver rækker og sætter det ind i vores grid
    for (let row = 0; row <= this.rows + 1; row++) {
      const newRow = [];
      // Vi pusher newRow-arrayet ind i this.grid arrayet
      this.grid.push(newRow);
      for (let col = 0; col <= this.cols + 1; col++) {
        // Når row og col er = 0, så pusher vi " " ind på det første row
        if (row === 0 && col === 0) {
          newRow.push(" ");
          // Hvis row = 0 og col er større end 1 (når vi er på første række)
          // så trækker vi 1 fra col og pusher det tal ind på første række
          // Vi fylder hele capacity headeren ud
        } else if (row === 0 && col > 1) {
          newRow.push(col - 1);
          // Vi fylder hele items headeren ud
        } else if (col === 0 && row > 1) {
          // eksempelvis 5-1 (så står der 4 i kolonne 0
          newRow.push(row - 1);
        } else {
          // Hvis ingen af de else if statements er true, så bliver der bare fyldt hvidt 0 i de andre celler
          newRow.push(0);
        }
      }
    }
  }
  // Vi skulle have denne metode fordi vi ellers ikke havde mulighed for at definere om griddet var full
  // Vi kan bruge denne metode i knapsackBackTrack når vi har brug for at lave den ifsætning til at bruge true / false
  getIsGridFull() {
    return this.gridIsFull;
  }

  isGridFull(value) {
    // Sætter selve værdien af gridIsFull da det var det vi havde brug for når algoritmen blev out of bounce
    this.gridIsFull = value;
  }

  get(row, col) {
    // Bruger vores constructor til at lave griddets værdier med this.grid "metoden"?
    let value = this.grid[row][col];
    return value;
  }

  set(row, col, value) {
    // Sætter griddets row og col værdier
    this.grid[row][col] = value;
  }
}
