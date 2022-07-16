import React, { useReducer } from "react";
import classes from "./Calculator.module.css";
import CalculatorButton from "./CalculatorButton";
import ClearButton from "./ClearButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
  CLEAR: "clear",
  DELETE: "delete-digit",
};

function reducer(state, { type, payload }) {
  if (type === ACTIONS.ADD_DIGIT) {
    if (state.currentOperand === "0") {
      if (payload.digit === ".") {
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        };
      }
      return { ...state, currentOperand: `${payload.digit}` };
    }

    if (payload.digit === "." && state.currentOperand.includes(".")) {
      return state;
    }

    return {
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`,
    };
  }

  if (type === ACTIONS.CLEAR) {
    return {
      currentOperand: "0",
    };
  }

  if (type === ACTIONS.CHOOSE_OPERATION) {
    console.log(state.currentOperand);
    if (state.currentOperand === "0") {
      return { ...state, operation: payload.digit };
    }

    if (state.operation) {
      return {
        prevOperand: evaluate(state),
        currentOperand: "0",
        operation: payload.digit,
      };
    }

    return {
      prevOperand: state.currentOperand,
      currentOperand: "0",
      operation: payload.digit,
    };
  }

  if (type === ACTIONS.EVALUATE) {
    return {
      ...state,
      prevOperand: evaluate(state),
      currentOperand: "0",
      operation: "",
    };
  }

  if (type === ACTIONS.DELETE) {
    if (state.currentOperand.length === 1)
      return {
        ...state,
        currentOperand: "0",
      };
    return {
      ...state,
      currentOperand: state.currentOperand.slice(0, -1),
    };
  }
}

function evaluate({ currentOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);

  if (!prevOperand) return;

  let total = "";

  if (operation === "+") {
    total = prev + current;
  }

  if (operation === "-") total = prev - current;

  if (operation === "/") total = prev / current;

  if (operation === "*") total = prev * current;

  return total;
}

function Calculator() {
  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: "0" }
  );

  return (
    <div className={classes.container}>
      <div className={classes.output}>
        <div className={classes.previous}>
          {prevOperand}
          {operation}
        </div>
        <div className={classes.current}>{currentOperand}</div>
      </div>
      <ClearButton
        className={classes.spanTwo}
        digit="AC"
        dispatch={dispatch}
      ></ClearButton>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
      <OperationButton digit="/" dispatch={dispatch}></OperationButton>
      <CalculatorButton digit="1" dispatch={dispatch}></CalculatorButton>
      <CalculatorButton digit="2" dispatch={dispatch}></CalculatorButton>
      <CalculatorButton digit="3" dispatch={dispatch}></CalculatorButton>
      <OperationButton digit="*" dispatch={dispatch}></OperationButton>

      <CalculatorButton digit="4" dispatch={dispatch}></CalculatorButton>
      <CalculatorButton digit="5" dispatch={dispatch}></CalculatorButton>
      <CalculatorButton digit="6" dispatch={dispatch}></CalculatorButton>
      <OperationButton digit="+" dispatch={dispatch}></OperationButton>

      <CalculatorButton digit="7" dispatch={dispatch}></CalculatorButton>
      <CalculatorButton digit="8" dispatch={dispatch}></CalculatorButton>
      <CalculatorButton digit="9" dispatch={dispatch}></CalculatorButton>
      <OperationButton digit="-" dispatch={dispatch}></OperationButton>

      <CalculatorButton digit="." dispatch={dispatch}></CalculatorButton>
      <CalculatorButton digit="0" dispatch={dispatch}></CalculatorButton>
      <button
        className={classes.spanTwo}
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default Calculator;
