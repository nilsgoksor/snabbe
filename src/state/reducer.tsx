import { SET_ROUND_DATA } from "./actionTypes";

export type MapState = {
  roundData: { name: string; points: number }[];
};

export type MapActions = {
  type: "SET_ROUND_DATA";
  roundData: { name: string; points: number }[];
};

export const initialState: MapState = {
  roundData: [],
};

const reducer = (state: MapState, action: MapActions) => {
  switch (action.type) {
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
