import { useEffect } from "react";
import { createContext, useReducer } from "react";
import Reducer from "./Reducer";
const INITIAL_State = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};
export const Context = createContext(INITIAL_State);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_State);
  useEffect (()=>{
    localStorage.setItem("user",JSON.stringify(state.user))
  },[state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error, 
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
