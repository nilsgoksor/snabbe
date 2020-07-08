import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
  Points,
} from "../styled-components/styled-components";

const RoundDataSummary = ({ roundData, removePlayer }) => (
  <Table>
    <TableHead>
      <TableRow header={true}>
        <TableData>Name</TableData>
        <Points>Points</Points>
      </TableRow>
    </TableHead>
    <TableBody>
      {roundData.map((player, index) => (
        <TableRow
          key={player + index}
          onClick={() => {
            removePlayer(player);
          }}
        >
          <TableData>{player.name}</TableData>
          <Points>{player.points} </Points>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default RoundDataSummary;
