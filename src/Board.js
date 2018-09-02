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
        <div className="board-row" key={`${i.toString()}board-row`}>
          {columns}
        </div>
      );
    }
    return board;
  };

  renderSquare(i) {
    console.log(i);
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i.toString() + "Square"}
      />
    );
  }

  render() {
    return (
      <div>
        {this.createBoard(3, 3)}
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}

export default Board;
