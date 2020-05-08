import React, { useState, useEffect } from "react";
import db from "../state/firestore";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
} from "../styled-components/styled-components";
import { ROUNDS } from "../constants/routes";

const LeaderBoardPage = () => {
  const [fetchedRounds, setFetchedRounds] = useState<
    { name: string; points: number }[][]
  >([]);

  const [leaderboard, setLeaderboard] = useState<
    { name: string; totalPoints: number }[]
  >([]);

  useEffect(() => {
    db.collection(ROUNDS)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const fetchedRounds = data.map((roundData) => {
          return roundData.round;
        });
        setFetchedRounds(fetchedRounds);
      });
  }, []);

  useEffect(() => {
    let leaderboard: { name: string; totalPoints: number }[] = [];
    if (fetchedRounds) {
      fetchedRounds.forEach((round) => {
        round.forEach((player) => {
          const playerExistIndex = leaderboard.findIndex(
            (p) => p.name === player.name
          );
          let playerToAdd;
          if (playerExistIndex !== -1) {
            playerToAdd = leaderboard[playerExistIndex];
            playerToAdd.totalPoints += player.points;
            leaderboard.splice(playerExistIndex, 1);
          } else {
            playerToAdd = { name: player.name, totalPoints: player.points };
          }

          const insertIndex = leaderboard.findIndex(
            (p) => p.totalPoints < playerToAdd.totalPoints
          );
          if (insertIndex !== -1) {
            leaderboard.splice(insertIndex, 0, playerToAdd);
          } else {
            leaderboard.push(playerToAdd);
          }
        });
      });
    }
    setLeaderboard(leaderboard);
  }, [fetchedRounds]);

  return (
    <>
      <h1>leaderboard</h1>
      {leaderboard.length <= 0 ? (
        "leaderboard data not available"
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableData>Rank</TableData>
                <TableData>Name</TableData>
                <TableData>Points</TableData>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((player, index) => (
                <TableRow key={index}>
                  <TableData>{index + 1}</TableData>
                  <TableData>{player.name}</TableData>
                  <TableData>{player.totalPoints}</TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};

export default LeaderBoardPage;
