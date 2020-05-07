import React, { createContext, useContext, useReducer } from "react";
import reducer, { initialState, MapState, MapActions } from "./reducer";

const initialMapContext: {
  mapState: MapState;
  setMapState: React.Dispatch<MapActions>;
} = {
  mapState: initialState,
  setMapState: () => {},
};

const MapContext = createContext(initialMapContext);

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
