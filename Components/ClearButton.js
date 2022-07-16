import React from "react";
import { ACTIONS } from "./Calculator";
import classes from "./ClearButton.module.css";

function ClearButton({ dispatch, digit }) {
  return (
    <button
      className={classes.button}
      onClick={() => dispatch({ type: ACTIONS.CLEAR })}
    >
      {digit}
    </button>
  );
}

export default ClearButton;
