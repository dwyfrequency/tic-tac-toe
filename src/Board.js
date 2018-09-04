import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
  createBoard = (row, col) => {
    console.log(this.props);
    const board = [];
    // winner here is undefined, if we wanted a value we would need to do some destructing
    let winner,
      counter = 0;
    console.log({ winner, counter });
    for (let i = 0; i < row; i++) {
      const columns = [];
      for (let j = 0; j < col; j++) {
        // try to see if the counter is included in the array, catch if the winning coords
        try {
          winner = this.props.winningCoordinates.includes(counter);
        } catch (error) {}
        columns.push(this.renderSquare(counter, winner ? "winner" : ""));
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

  renderSquare(i, cssClass) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={`Square: ${i.toString()}`}
        cssClass={cssClass}
      />
    );
  }

  render() {
    return <div>{this.createBoard(3, 3)}</div>;
  }
}

export default Board;
