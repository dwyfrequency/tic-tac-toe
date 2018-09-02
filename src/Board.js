import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
  createBoard = (row, col) => {
    const board = [];
    let counter = 0;
    for (let i = 0; i < row; i++) {
      const columns = [];
      for (let j = 0; j < col; j++) {
        columns.push(this.renderSquare(counter));
        counter++;
      }
      board.push(
        <div className="board-row" key={`Board-Row: ${i.toString()}`}>
          {columns}
        </div>
      );
    }
    return board;
  };

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={`Square: ${i.toString()}`}
      />
    );
  }

  render() {
    return <div>{this.createBoard(3, 3)}</div>;
  }
}

export default Board;
