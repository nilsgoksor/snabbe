import React, { createContext, useContext, useReducer, useEffect } from "react";
import reducer, { initialState, MapState, MapActions } from "./reducer";

const initialMapContext: {
  mapState: MapState;
  setMapState: React.Dispatch<MapActions>;
} = {
  mapState: initialState,
  setMapState: () => {},
};

const MapContext = createContext(initialMapContext);

const localStorageState = localStorage.getItem("state");

let localState = null;
if (localStorageState) {
  localState = JSON.parse(localStorageState);
}

export function MapProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const mapState = state;
  const setMapState = dispatch;

  return (
    <MapContext.Provider value={{ mapState, setMapState }}>
      {children}
    </MapContext.Provider>
  );
}

export const useMapState = () => useContext(MapContext);
