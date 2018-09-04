import React from "react";

const square = props => {
  // console.log(props);
  return (
    <button className={`square ${props.cssClass}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default square;
