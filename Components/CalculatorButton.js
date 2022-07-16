import React from "react";
import classes from "./CalculatorButton.module.css";
import { ACTIONS } from "./Calculator";

function CalculatorButton({ digit, dispatch }) {
  return (
    <button
      className={classes.button}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

export default CalculatorButton;
