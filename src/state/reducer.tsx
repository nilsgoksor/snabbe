import { SET_PLAYERS, SET_ROUND_DATA } from "./actionTypes";

export type ContextState = {
  players: { name: string; initialPoints: number }[];
  roundData: { name: string; points: number }[];
};

export type ContextDispatch =
  | {
      type: "SET_PLAYERS";
      players: { name: string; initialPoints: number }[];
    }
  | {
      type: "SET_ROUND_DATA";
      roundData: { name: string; points: number }[];
    };

export const initialState: ContextState = {
  players: [],
  roundData: [],
};

const reducer = (state: ContextState, action: ContextDispatch) => {
  switch (action.type) {
    case SET_PLAYERS:
      return {
        ...state,
        players: action.players,
      };
    case SET_ROUND_DATA:
      return {
        ...state,
        roundData: action.roundData,
      };
    default:
      return state;
  }
};

export default reducer;
