import React, { useState, useEffect } from "react";
import styled from "styled-components";

const RandomSnabbeStats = ({ leaderboardData }) => {
  const [randomStats, setRandomStats] = useState<string[] | null>(null);
  const [statShownIndex, setStatShownIndex] = useState(0);

  useEffect(() => {
    let mostRoundsPlayed = 0;
    let playersWithMostRounds: string[] = [];
    let ppg = 0;
    let playersWithHigestPpg: string[] = [];
    leaderboardData.forEach((player) => {
      if (player.roundsPlayed > mostRoundsPlayed) {
        mostRoundsPlayed = player.roundsPlayed;
        playersWithMostRounds = [player.name];
      } else if (player.roundsPlayed === mostRoundsPlayed) {
        playersWithMostRounds.push(player.name);
      }

      const playerPpg = player.totalPoints / player.roundsPlayed;
      if (playerPpg > ppg) {
        ppg = playerPpg;
        playersWithHigestPpg = [player.name];
      } else if (playerPpg === ppg) {
        playersWithHigestPpg.push(player.name);
      }
    });

    const mostRoundsPlayedStat = `${playersWithMostRounds.map(
      (p) => ` ${p}`
    )} played the most games (${mostRoundsPlayed})`;
    const bestPpgStat = `${playersWithHigestPpg.map((p) => ` ${p}`)} ${
      playersWithHigestPpg.length > 1 ? "have" : "has"
    } the highest points per round (${ppg})`;

    const addMoreStats = "lägg till mer stats dååuue";
    const swishDonate = "DONATE <3: swish 0703360147";

    setRandomStats([
      mostRoundsPlayedStat,
      bestPpgStat,
      addMoreStats,
      swishDonate,
    ]);
  }, [leaderboardData]);

  useEffect(() => {
    let nextIndex = statShownIndex + 1;
    if (randomStats && nextIndex === randomStats.length) {
      nextIndex = 0;
    }
    setTimeout(() => {
      setStatShownIndex(nextIndex);
    }, 5000);
  }, [statShownIndex, randomStats]);

  return (
    <>
      <h3>random stats</h3>
      <RandomStatContainer>
        {randomStats && randomStats[statShownIndex]}
      </RandomStatContainer>
    </>
  );
};

export default RandomSnabbeStats;

const RandomStatContainer = styled.div`
  animation: pulse 5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
