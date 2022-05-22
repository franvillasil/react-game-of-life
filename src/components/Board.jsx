import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import ICell from "../models/ICell";

const Board = () => {
  const [cells, setCells] = useState([]);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    setCells(init());
  }, [width, height]);

  useEffect(() => {
    console.log('grid act', cells)
  }, [cells]);

  const init = () => {
    const cells = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        cells.push(new ICell(x, y, (Math.random() > 0.5)));
      }
    }
    return cells;
  }

  const getCell = (x, y) => {
    return cells.find(cell => cell.x === x && cell.y === y);
  }

  const getNeighbors = cell => {
    const neighbors = [];
    for (let x = cell.x - 1; x <= cell.x + 1; x++) {
      for (let y = cell.y - 1; y <= cell.y + 1; y++) {
        if (x === cell.x && y === cell.y) {
          continue;
        }
        const neighbor = getCell(x, y);
        if (neighbor) {
          neighbors.push(neighbor);
        }
      }
    }
    return neighbors;
  }

  const getAliveNeighbors = cell => {
    return getNeighbors(cell).filter(neighbor => neighbor.alive);
  }

  const getNextGeneration = () => {
    const nextGeneration = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const cell = getCell(x, y);
        const aliveNeighbors = getAliveNeighbors(cell).length;
        if (cell.alive) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            nextGeneration.push(new ICell(x, y, false));
          } else {
            nextGeneration.push(cell);
          }
        } else {
          if (aliveNeighbors === 3) {
            nextGeneration.push(new ICell(x, y, true));
          } else {
            nextGeneration.push(cell);
          }
        }
      }
    }
    setCells(nextGeneration);
    setGeneration(generation + 1)
  }

    return (
    <div className="board">
      <div className="header">
        <p>Generation: {generation}</p>
        <button className="button" onClick={() => getNextGeneration()}>Next</button>
      </div>
        <div className="grid">
          {cells.map(cell => (
            <Cell
              key={`${cell.x}-${cell.y}`}
              x={cell.x}
              y={cell.y}
              alive={cell.alive}
            />
          ))}
        </div>
      </div>
      )
}

export default Board;