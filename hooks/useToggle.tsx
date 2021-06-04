import React, { useReducer } from "react";

function reducer(previousState: any, nextState: any) {
  if (typeof nextState === "boolean") {
    return nextState;
  }
  return !previousState;
}

function useToggle(initialState = false) {
  return useReducer(reducer, initialState);
}

export default useToggle;
