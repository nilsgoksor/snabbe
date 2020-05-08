import { SET_PLAYERS, SET_ROUND_DATA } from "./actionTypes";

export type MapState = {
  players: { name: string; initialPoints: number }[];
  roundData: { name: string; points: number }[];
};

export type MapActions =
  | {
      type: "SET_PLAYERS";
      players: { name: string; initialPoints: number }[];
    }
  | {
      type: "SET_ROUND_DATA";
      roundData: { name: string; points: number }[];
    };

export const initialState: MapState = {
  players: [],
  roundData: [],
};

const reducer = (state: MapState, action: MapActions) => {
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
