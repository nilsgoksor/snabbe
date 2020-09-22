import React, { useState, useEffect } from "react";
import styled from "styled-components";
import db from "../state/firestore";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableRowHeader,
  TableData,
  TableDataPoints,
  Heading1,
  Heading3,
} from "../styled-components/styled-components";
import { HISTORY } from "../constants/endpoints";

const HistoryPage = () => {
  const [seasons, setSeasons] = useState<
    { name: string; goalOfTheSeason: string; table: any }[]
  >([]);

  useEffect(() => {
    db.collection(HISTORY)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const historySeasons = data.map((season) => {
          return {
            name: season.name,
            goalOfTheSeason: season.goalOfTheSeason,
            table: season.table,
          };
        });
        setSeasons(historySeasons);
      });
  }, []);

  return (
    <LeaderBoardContainer>
      <Heading1>History</Heading1>
      {seasons.length <= 0 ? (
        "History data not available"
      ) : (
        <>
          {seasons.map((season) => (
            <TableContainer key={season.name}>
              <Heading3>{season.name}</Heading3>
              <Table>
                <TableHead>
                  <TableRowHeader>
                    <TableDataPoints>#</TableDataPoints>
                    <TableData>Team</TableData>
                    <TableDataPoints>Pts</TableDataPoints>
                  </TableRowHeader>
                </TableHead>
                <TableBody>
                  {season.table.map((player, index) => (
                    <TableRow key={player.name}>
                      <TableDataPoints>{index + 1}</TableDataPoints>
                      <TableData>{player.name}</TableData>
                      <TableDataPoints>{player.points}</TableDataPoints>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p>{`Goal of the season: ${season.goalOfTheSeason}`}</p>
            </TableContainer>
          ))}
        </>
      )}
    </LeaderBoardContainer>
  );
};

export default HistoryPage;

const LeaderBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
