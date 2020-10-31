import React, { useState, useEffect } from "react";
import RoundDataSummary from "../components/RoundDataSummary";
import {
  Button,
  Heading1,
  Heading3,
  Player,
  PlayerImage,
  PlayerName,
} from "../styled-components/styled-components";
import db from "../state/firestore";
import styled from "styled-components";
import AddIcon from "../components/AddIcon";
import { PLAYERS, ROUNDS } from "../constants/endpoints";

const RegisterRoundPage = () => {
  const [players, setPlayers] = useState<{ name: string }[]>();
  const [playersInRound, setPlayersInRound] = useState<string[]>([]);
  const [roundData, setRoundData] = useState<
    { name: string; points: number }[]
  >([]);
  const [newName, setNewName] = useState<string | null>(null);
  const [addNewPlayer, setAddNewPlayer] = useState<Boolean>(false);

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
  }, [addNewPlayer]);

  useEffect(() => {
    if (playersInRound) {
      const round = playersInRound.map((player, index) => {
        return {
          name: player,
          points:
            index !== 0
              ? playersInRound.length - index
              : playersInRound.length + 1,
        };
      });
      setRoundData(round);
    }
  }, [playersInRound]);

  const currentTime = new Date(Date.now());

  const formattedCurrentTime = currentTime.toLocaleString([], {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <RegisterRoundPageContainer>
      <Heading1>Round</Heading1>
      {players && (
        <PlayersContainer>
          {players
            .filter((p) => !playersInRound.includes(p.name))
            .map((player) => {
              const imgSrc = `${process.env.PUBLIC_URL}/images/${player.name}.png`;
              return (
                <Player
                  key={player.name}
                  onClick={() =>
                    setPlayersInRound([player.name, ...playersInRound])
                  }
                >
                  <PlayerImage imageSrc={imgSrc} />
                  <PlayerName> {player.name}</PlayerName>
                </Player>
              );
            })}
          <AddIconContainer
            onClick={() => {
              if (!addNewPlayer) {
                document.getElementById("new-player")?.focus();
              }
              setAddNewPlayer(!addNewPlayer);
            }}
          >
            <AddIcon />
          </AddIconContainer>
        </PlayersContainer>
      )}
      {addNewPlayer && (
        <AddPlayerContainer>
          <InputPlayerName
            id="new-player"
            type="text"
            autoFocus
            value={newName || ""}
            placeholder={"player"}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setNewName(e.target.value.toUpperCase());
            }}
          />
          <Button
            disabled={!newName}
            onClick={() => {
              newName &&
                db.collection(PLAYERS).doc(newName).set({
                  name: newName,
                });
              setAddNewPlayer(false);
              setNewName(null);
            }}
          >
            ADD PLAYER
          </Button>
        </AddPlayerContainer>
      )}

      {playersInRound.length > 0 && (
        <>
          <Heading3>{`Snabbe ${formattedCurrentTime}`}</Heading3>
          <RoundDataSummary
            roundData={roundData}
            removePlayer={(player) => {
              const modifiedPlayers = playersInRound.filter(
                (p) => p !== player?.name
              );
              setPlayersInRound(modifiedPlayers);
            }}
          />
          <SubmitRoundContainer>
            <Button
              onClick={() => {
                db.collection(ROUNDS).doc(currentTime.toString()).set({
                  round: roundData,
                  date: currentTime.toString(),
                });
                setPlayersInRound([]);
                setRoundData([]);
              }}
            >
              REGISTER ROUND
            </Button>
          </SubmitRoundContainer>
        </>
      )}
    </RegisterRoundPageContainer>
  );
};

export default RegisterRoundPage;

const RegisterRoundPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlayersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const AddPlayerContainer = styled.div`
  display: flex;
  margin: 20px 0px;
`;

const InputPlayerName = styled.input`
  border: 1px solid black;
  padding: 15px;
  outline: none;
`;

const AddIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 90px;
  margin: 5px;
  padding: 5px;
  background-color: ${(p) => p.theme.colors.white};
  color: ${(p) => p.theme.colors.purple};
  path {
    fill: ${(p) => p.theme.colors.purple};
  }

  :hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.colors.purple};
    color: ${(p) => p.theme.colors.white};
    path {
      fill: ${(p) => p.theme.colors.white};
    }
  }
`;

const SubmitRoundContainer = styled.div`
  margin-top: 20px;
`;
