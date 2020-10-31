import React, { useState, useEffect } from "react";
import styled from "styled-components";
import db from "../state/firestore";
import RandomSnabbeStats from "../components/RandomSnabbeStats";
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
import { PLAYERS, ROUNDS } from "../constants/endpoints";

const LeaderBoardPage = () => {
  const [players, setPlayers] = useState<{ name: string }[]>([]);
  const [fetchedRounds, setFetchedRounds] = useState<
    { name: string; points: number }[][]
  >([]);

  const [leaderboard, setLeaderboard] = useState<
    {
      name: string;
      totalPoints: number;
      roundsPlayed: number;
    }[]
  >([]);

  useEffect(() => {
    db.collection(PLAYERS)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const fetchedPlayers = data.map((player) => {
          return { name: player.name };
        });
        setPlayers(fetchedPlayers);
      });
    db.collection(ROUNDS)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const rounds = data.map((roundData) => {
          return roundData.round;
        });
        setFetchedRounds(rounds);
      });
  }, []);

  useEffect(() => {
    const table: {
      name: string;
      totalPoints: number;
      roundsPlayed: number;
    }[] = [];
    if (players && fetchedRounds) {
      fetchedRounds.forEach((round) => {
        round.forEach((player) => {
          const playerExistIndex = table.findIndex(
            (p) => p.name === player.name
          );
          let playerToAdd;
          if (playerExistIndex !== -1) {
            playerToAdd = table[playerExistIndex];
            playerToAdd.totalPoints += player.points;
            playerToAdd.roundsPlayed += 1;
            table.splice(playerExistIndex, 1);
          } else {
            playerToAdd = {
              name: player.name,
              totalPoints: player.points,
              roundsPlayed: 1,
            };
          }

          const insertIndex = table.findIndex(
            (p) => p.totalPoints < playerToAdd.totalPoints
          );
          if (insertIndex !== -1) {
            table.splice(insertIndex, 0, playerToAdd);
          } else {
            table.push(playerToAdd);
          }
        });
      });
    }
    setLeaderboard(table);
  }, [fetchedRounds, players]);

  return (
    <LeaderBoardContainer>
      <Heading1>Table</Heading1>
      <Heading3>{`Rounds played: ${fetchedRounds.length} / 50`}</Heading3>
      {leaderboard.length <= 0 ? (
        "Leaderboard data not available"
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRowHeader>
                <TableDataPoints>#</TableDataPoints>
                <TableData>Team</TableData>
                <TableDataPoints>Pts</TableDataPoints>
              </TableRowHeader>
            </TableHead>
            <TableBody>
              {leaderboard.map((player, index) => (
                <TableRow key={index}>
                  <TableDataPoints>{index + 1}</TableDataPoints>
                  <TableData>{player.name}</TableData>
                  <TableDataPoints>{player.totalPoints}</TableDataPoints>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <RandomSnabbeStats leaderboardData={leaderboard} />
        </TableContainer>
      )}
    </LeaderBoardContainer>
  );
};

export default LeaderBoardPage;

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
