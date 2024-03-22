import React, { useReducer } from "react";
import "./style.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

const initialState = {
  currentOperand: '',
  previousOperand: '',
  operation: null
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand}${payload.digit}`
      };
    case ACTIONS.CLEAR:
      return {
        currentOperand: '',
        previousOperand: '',
        operation: null
      };
    case ACTIONS.CHOOSE_OPERATION:
      return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: ''
      };
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      };
    case ACTIONS.EVALUATE:
      let result = 0;
      switch (state.operation) {
        case '+':
          result = parseFloat(state.previousOperand) + parseFloat(state.currentOperand);
          break;
        case '-':
          result = parseFloat(state.previousOperand) - parseFloat(state.currentOperand);
          break;
        case '*':
          result = parseFloat(state.previousOperand) * parseFloat(state.currentOperand);
          break;
        case '/':
          result = parseFloat(state.previousOperand) / parseFloat(state.currentOperand);
          break;
        default:
          break;
      }
      return {
        currentOperand: result.toString(),
        previousOperand: '',
        operation: null
      };
    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleOperation = (op) => {
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: op } });
  };

  const handleDelete = () => {
    dispatch({ type: ACTIONS.DELETE_DIGIT });
  };

  const handleEvaluate = () => {
    dispatch({ type: ACTIONS.EVALUATE });
  };

  React.useEffect(() => {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });
  }, []);

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} className="span-two">AC</button>
      <button onClick={handleDelete}>DEL</button>
      <button onClick={() => handleOperation('/')}>/</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } })}>1</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 2 } })}>2</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 3 } })}>3</button>
      <button onClick={() => handleOperation('*')}>*</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 4 } })}>4</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 5 } })}>5</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 6 } })}>6</button>
      <button onClick={() => handleOperation('+')}>+</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 7 } })}>7</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 8 } })}>8</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit :9 } })}>9</button>
      <button onClick={() => handleOperation('-')}>-</button>
      <button>.</button>
      <button onClick={() => dispatch({ type:ACTIONS.ADD_DIGIT,payload:{digit :0}})}>0</button>
      <button onClick={handleEvaluate} className="span-two">=</button>
    </div>
  );
}

export default App;