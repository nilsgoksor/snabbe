import React, { useState, useEffect } from "react";
import db from "../state/firestore";
import RandomSnabbeStats from "../components/RandomSnabbeStats";
import { useMapState } from "../state/context";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
} from "../styled-components/styled-components";
import { ROUNDS } from "../constants/routes";

const LeaderBoardPage = () => {
  const { mapState } = useMapState();
  const { players } = mapState;

  const [fetchedRounds, setFetchedRounds] = useState<
    { name: string; points: number }[][]
  >([]);

  const [leaderboard, setLeaderboard] = useState<
    {
      name: string;
      totalPoints: number;
      initialPoints: number;
      roundsPlayed: number;
    }[]
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
    let leaderboard: {
      name: string;
      totalPoints: number;
      initialPoints: number;
      roundsPlayed: number;
    }[] = [];
    fetchedRounds.forEach((round) => {
      round.forEach((player) => {
        const playerExistIndex = leaderboard.findIndex(
          (p) => p.name === player.name
        );
        let playerToAdd;
        if (playerExistIndex !== -1) {
          playerToAdd = leaderboard[playerExistIndex];
          playerToAdd.totalPoints += player.points;
          playerToAdd.roundsPlayed += 1;
          leaderboard.splice(playerExistIndex, 1);
        } else {
          const initialPoints =
            players.find((p) => p.name === player.name)?.initialPoints || 0;

          playerToAdd = {
            name: player.name,
            totalPoints: player.points,
            initialPoints: initialPoints,
            roundsPlayed: 1,
          };
        }

        const insertIndex = leaderboard.findIndex(
          (p) =>
            p.totalPoints + p.initialPoints <
            playerToAdd.totalPoints + playerToAdd.initialPoints
        );
        if (insertIndex !== -1) {
          leaderboard.splice(insertIndex, 0, playerToAdd);
        } else {
          leaderboard.push(playerToAdd);
        }
      });
    });

    setLeaderboard(leaderboard);
  }, [fetchedRounds, players]);

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
                  <TableData>
                    {player.totalPoints + player.initialPoints}
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <RandomSnabbeStats leaderboardData={leaderboard} />
        </>
      )}
    </>
  );
};

export default LeaderBoardPage;
