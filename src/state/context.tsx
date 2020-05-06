import React, { createContext, useContext, useReducer } from "react";
import { GET_PLAYERS, ADD_PLAYER } from "./actionTypes";

type MapState = {
  players: string[];
};

type MapActions =
  | {
      type: "GET_PLAYERS";
    }
  | {
      type: "ADD_PLAYER";
      player: string;
    };

const initialState: MapState = {
  players: [],
};

const initialMapContext: {
  mapState: MapState;
  setMapState: React.Dispatch<MapActions>;
} = {
  mapState: initialState,
  setMapState: () => {},
};

const MapContext = createContext(initialMapContext);

const reducer = (state: MapState, action: MapActions) => {
  console.log(action);

  switch (action.type) {
    case GET_PLAYERS:
      return {
        ...state,
        players: ["nils", "anton"],
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player],
      };
    default:
      return state;
  }
};

export function MapProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const mapState = state;
  const setMapState = dispatch;

  return (
    <MapContext.Provider value={{ mapState, setMapState }}>
      {children}
    </MapContext.Provider>
  );
}

export const useMapState = () => useContext(MapContext);
