import React, { createContext, useContext, useReducer, useEffect } from "react";
import reducer, {
  initialState,
  ContextState,
  ContextDispatch,
} from "./reducer";

const initialMapContext: {
  state: ContextState;
  dispatch: React.Dispatch<ContextDispatch>;
} = {
  state: initialState,
  dispatch: () => {},
};

const StateContext = createContext(initialMapContext);

const localStorageState = localStorage.getItem("snabbe-state");

let localState = null;
if (localStorageState) {
  localState = JSON.parse(localStorageState);
}

export const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("snabbe-state", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useContextState = () => useContext(StateContext);
