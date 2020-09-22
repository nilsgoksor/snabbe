import React, { useState, useEffect } from "react";
import "react-awesome-slider/dist/styles.css";
import db from "../state/firestore";
import { PLAYERS, ROUNDS } from "../constants/endpoints";
import styled from "styled-components";
import { Heading1, Heading3 } from "../styled-components/styled-components";
import FootballPlayerIcon from "../components/FootballPlayerIcon";

const PlayerProfilesPage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const [fetchedPlayers, setFetchedPlayers] = useState<
    {
      name: string;
      picture: string;
      strengths: [string];
      weaknesses: [string];
    }[]
  >([]);

  const [fetchedRounds, setFetchedRounds] = useState<
    { name: string; points: number }[][]
  >([]);

  useEffect(() => {
    db.collection(PLAYERS)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const players = data.map((player) => {
          return {
            name: player.name,
            picture: player.picture,
            strengths: player.strengths,
            weaknesses: player.weaknesses,
          };
        });
        setFetchedPlayers(players);
        setSelectedPlayer(players[0].name);
      });
  }, []);

  useEffect(() => {
    db.collection(ROUNDS)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const rounds = data.map((round) => {
          return round.round;
        });
        setFetchedRounds(rounds);
      });
  }, []);

  const playerData = fetchedPlayers.filter((p) => p.name === selectedPlayer)[0];
  const playerRounds = fetchedRounds.filter((r) =>
    r.filter((p) => p.name === selectedPlayer)
  );
  const totalRounds = playerRounds.length;
  const totalPoints = playerRounds
    .map((round) => round[0]?.points)
    .reduce((prev, next) => prev + next, 0);
  const ppg = Math.round(totalPoints / totalRounds).toFixed(2);

  console.log("playerData", playerData);

  return (
    <>
      <Heading1>Player profiles</Heading1>
      <Heading3>Select player</Heading3>
      <PlayersContainer>
        {fetchedPlayers.map((player) => (
          <Player
            imageSrc={player.picture}
            key={player.name}
            onClick={() => setSelectedPlayer(player.name)}
            selected={player?.name === selectedPlayer}
          >
            {!player.picture && (
              <>
                <FootballPlayerIcon /> {player.name}
              </>
            )}
          </Player>
        ))}
      </PlayersContainer>
      <Heading3>{selectedPlayer}</Heading3>
      <StatsContainer>
        {playerData?.picture && <PlayerImage imageSrc={playerData?.picture} />}
        <Stat type={1}>
          <strong>Total points</strong>
          <span>{` ${totalPoints}`}</span>
        </Stat>
        <Stat type={1}>
          <strong>Total rounds</strong>
          <span>{` ${totalRounds}`}</span>
        </Stat>
        <Stat type={1}>
          <strong>Points per game</strong>
          <span>{` ${ppg}`}</span>
        </Stat>
        {playerData?.strengths?.length > 0 &&
          playerData.strengths.map((str, index) => (
            <Stat type={2} key={index}>
              <strong>{str}</strong>
            </Stat>
          ))}
        {playerData?.weaknesses?.length > 0 &&
          playerData.weaknesses.map((wkn, index) => (
            <Stat type={3} key={index}>
              <strong>{wkn}</strong>
            </Stat>
          ))}
      </StatsContainer>
    </>
  );
};
export default PlayerProfilesPage;

const PlayerImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: ${(p) => p.imageSrc && `url(${p.imageSrc})`};
  border: ${(p) => `3px solid ${p.theme.colors.blue}}`};
  background-size: cover;
`;

const PlayersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const Player = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  margin: 5px;
  padding: 5px;
  background-color: ${(p) => p.theme.colors.white};
  background-image: ${(p) => p.imageSrc && `url(${p.imageSrc})`};
  background-size: cover;
  overflow: hidden;
  color: ${(p) => p.theme.colors.purple};
  word-break: break-all;
  border: ${(p) => p.selected && `3px solid ${p.theme.colors.blue}}`};

  path {
    fill: ${(p) => p.theme.colors.purple};
  }

  :hover {
    cursor: pointer;
    opacity: ${(p) => p.theme.hover.opacity};
  }
`;

const StatsContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

const Stat = styled.div`
  background-color: ${(p) =>
    p.type === 1
      ? p.theme.colors.blue
      : p.type === 2
      ? p.theme.colors.green
      : p.theme.colors.red};
  color: ${(p) => p.theme.colors.purple};
  width: 100%;
  padding: 15px 0px;
  margin: 5px 0px;
`;
