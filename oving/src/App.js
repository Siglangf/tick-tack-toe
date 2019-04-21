import React, { Component } from "react";
import "./App.css";
import Board from "./Board";
import triangle from "./triangle.png";
import Draggable from "react-draggable";

class App extends Component {
  handleClick = () => console.log("hei");
  handleMouseDown = e => {
    let ms = e.screenX;
    console.log(ms);
  };
  render() {
    return (
      <React.Fragment>
        <Board />
      </React.Fragment>
    );
  }
}

export default App;
