import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
  TableRowHeader,
  TableDataPoints,
} from "../styled-components/styled-components";

const RoundDataSummary = ({ roundData, removePlayer }) => (
  <Table>
    <TableHead>
      <TableRowHeader>
        <TableData>Name</TableData>
        <TableDataPoints>Points</TableDataPoints>
      </TableRowHeader>
    </TableHead>
    <TableBody>
      {roundData.map((player, index) => (
        <TableRow
          key={player.name}
          onClick={() => {
            removePlayer(player);
          }}
        >
          <TableData>{player.name}</TableData>
          <TableDataPoints>{player.points} </TableDataPoints>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default RoundDataSummary;
