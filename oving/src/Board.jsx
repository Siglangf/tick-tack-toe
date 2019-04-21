import React, { Component } from "react";
import Square from "./Square";
import "./Board.css";
import "bootstrap/dist/css/bootstrap.css";
import Draggable from "react-draggable";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      cross: true,
      isEnded: false
    };
  }
  handleOnClick = i => {
    if (!this.state.squares[i] && !this.state.isEnded) {
      const squares = this.state.squares.slice();
      squares[i] = this.state.cross ? "X" : "O";

      this.setState({ squares: squares, cross: !this.state.cross });
    }
  };

  handleClear = () => {
    this.setState({ squares: Array(9).fill(null), isEnded: false });
  };
  renderSquare(i) {
    return (
      <Square
        onClick={() => this.handleOnClick(i)}
        value={this.state.squares[i]}
      />
    );
  }

  calculateWinner = squares => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  changeisEnded = () => {
    if (!this.state.isEnded) {
      this.setState({ isEnded: true });
    }
  };

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Game over, winner is " + winner;
      this.changeisEnded();
    } else {
      status = "Next player: " + (this.state.cross ? "X" : "O");
    }

    return (
      <React.Fragment>
        <p className="status-text">{status}</p>
        <Draggable>
          <div className="boarder">
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
        </Draggable>
        <Draggable>
          <div className="hvr-grow">
            {this.state.isEnded && (
              <div>
                <button
                  type="button"
                  class="btn btn-primary hvr-grow "
                  onClick={this.handleClear}
                >
                  New game
                </button>
              </div>
            )}
          </div>
        </Draggable>
      </React.Fragment>
    );
  }
}

export default Board;
