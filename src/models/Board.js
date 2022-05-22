export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];
    this.init();
  }

  init() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.cells.push(new Cell(x, y, false));
      }
    }
  }

  getCell(x, y) {
    return this.cells.find(cell => cell.x === x && cell.y === y);
  }

  getNeighbors(cell) {
    const neighbors = [];
    for (let x = cell.x - 1; x <= cell.x + 1; x++) {
      for (let y = cell.y - 1; y <= cell.y + 1; y++) {
        if (x === cell.x && y === cell.y) {
          continue;
        }
        const neighbor = this.getCell(x, y);
        if (neighbor) {
          neighbors.push(neighbor);
        }
      }
    }
    return neighbors;
  }

  getAliveNeighbors(cell) {
    return this.getNeighbors(cell).filter(neighbor => neighbor.alive);
  }

  getDeadNeighbors(cell) {
    return this.getNeighbors(cell).filter(neighbor => !neighbor.alive);
  }

  getNextGeneration() {
    const nextGeneration = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const cell = this.getCell(x, y);
        const aliveNeighbors = this.getAliveNeighbors(cell).length;
        if (cell.alive) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            nextGeneration.push(new Cell(x, y, false));
          } else {}
        }
      }
    }
  }
}