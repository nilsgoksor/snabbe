import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heading1 } from "../styled-components/styled-components";
import SpotifyLogo from "../components/SpotifyLogo";

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
    } the highest points per round (${ppg.toFixed(2)})`;

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
    const timer = setTimeout(() => {
      setStatShownIndex(nextIndex);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [statShownIndex, randomStats]);

  return (
    <>
      <RandomStatContainer>
        <Heading1>Random stats</Heading1>
        {randomStats && randomStats[statShownIndex]}
      </RandomStatContainer>

      <Heading1>Snabbe playlist</Heading1>
      <SpotifyContainer
        onClick={() => {
          window.open(
            "https://open.spotify.com/playlist/7csL2GL28K6QQrkoHXOlIK?si=IcX0-lYOT4iy5igYmetlJA",
            "_blank"
          );
        }}
      >
        Add songs
        <SpotifyLogo />
      </SpotifyContainer>
    </>
  );
};

export default RandomSnabbeStats;

const RandomStatContainer = styled.div``;

const SpotifyContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 120px;
  align-items: center;
`;
