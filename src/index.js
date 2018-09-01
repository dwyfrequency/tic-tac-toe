import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/* Potential improvements: 
1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
COMPLETED - 6. When no one wins, display a message about the result being a draw.
 */

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

const Square = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="board-row">
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
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // hist contains an array of objects, each with its own board at a specific time
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick = i => {
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
          squares: squares
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

    const moves = history.map((step, move) => {
      // if idx ie. move is is not 0 then give the number
      const desc = move ? `Go to move #${move}` : `Go to game start`;
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
            squares={current.squares}
            // need to pass i, i will be defined in the Board
            onClick={i => this.handleClick(i)}
            upNext={this.upNext}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
