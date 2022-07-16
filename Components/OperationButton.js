import React from "react";
import { ACTIONS } from "./Calculator";
import classes from "./OperationButton.module.css";

function OperationButton({ digit, dispatch }) {
  return (
    <button
      className={classes.button}
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { digit } })
      }
    >
      {digit}
    </button>
  );
}

export default OperationButton;
