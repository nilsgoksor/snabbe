import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
} from "../styled-components/styled-components";
import { useMapState } from "../state/context";
import { SET_ROUND_DATA } from "../state/actionTypes";

const RoundDataSummary = () => {
  const { mapState, setMapState } = useMapState();
  const { roundData } = mapState;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableData>Rank</TableData>
          <TableData>Name</TableData>
          <TableData>Points</TableData>
        </TableRow>
      </TableHead>
      <TableBody>
        {roundData.map((player, index) => {
          return (
            <TableRow
              key={player.name}
              onClick={() => {
                const removeIndex = roundData.findIndex(
                  (p) => p.name === player.name
                );
                const modifiedroundData = [...roundData];
                if (removeIndex === 0) {
                  modifiedroundData.shift();
                } else {
                  modifiedroundData.splice(1, removeIndex);
                }
                setMapState({
                  type: SET_ROUND_DATA,
                  roundData: modifiedroundData,
                });
              }}
            >
              <TableData>{index + 1}</TableData>
              <TableData>{player.name}</TableData>
              <TableData>{player.points}</TableData>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default RoundDataSummary;
