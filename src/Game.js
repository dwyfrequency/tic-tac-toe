import React, { Component } from "react";
import Board from "./Board";
import "./index.css";

const tail = arr => arr[arr.length - 1];

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hist contains an array of objects, each with its own board at a specific time
      history: [{ squares: Array(9).fill(null), coordLocation: "" }],
      reversed: false,
      stepNumber: 0,
      xIsNext: true
    };
  }

  clickCoordinates = loc => {
    // need to add 1 b/c Math.ceil(0/3) === 0
    loc += 1;
    const col = loc % 3;
    return `Location - (Column: ${col ? col : 3} , Row: ${Math.ceil(loc / 3)})`;
  };

  handleClick = i => {
    console.log(this.clickCoordinates(i));
    // i === the location on the board clicked
    // we take all the past move (history), create a new array of up to and including the current step.
    // arr.slice([begin[, end]]); end: Zero-based index before which to end extraction. slice extracts up to but not including end.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // take the last index value of the array, ie. current version from our history
    const current = tail(history);
    // deep copy of the array
    const squares = [...current.squares];
    // did you win or already click that square
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.upNext();
    this.setState({
      history: history.concat([
        {
          squares: squares,
          coordLocation: this.clickCoordinates(i)
        }
      ]),
      // by calling history prior to the concat, we do not get the full length of what will be set so we effectively get our new history.length - 1
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  };

  jumpTo = step => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  };

  upNext = () => (this.state.xIsNext ? "X" : "O");

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // console.log({ winner });

    const moves = history.map((step, move) => {
      // if idx ie. move is is not 0 then give the number
      const desc = move
        ? `Go to move #${move}. ${step.coordLocation}`
        : `Go to game start`;
      return (
        <li key={move}>
          <button
            style={{
              fontWeight: move === this.state.stepNumber ? "bold" : "normal"
            }}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner ${winner}`;
      // was there no winner and the match board does not contain any blanks, then draw
    } else if (!current.squares.includes(null)) {
      status = `The match resulted in a draw`;
    } else {
      status = `Next Player: ${this.upNext()}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares} // need to pass i, i will be defined in the Board
            onClick={i => this.handleClick(i)}
            upNext={this.upNext}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button
            onClick={() => {
              this.setState({ reversed: !this.state.reversed });
            }}
          >
            Reverse Order
          </button>
          <ol>{this.state.reversed ? moves.reverse() : moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
