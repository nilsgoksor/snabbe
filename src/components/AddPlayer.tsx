import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../styled-components/styled-components";
import { useMapState } from "../state/context";

type StartPageProps = {
  players: string[];
  addToRound: (p: { name: string; points: number }) => void;
};

const StartPage = ({ players, addToRound }: StartPageProps) => {
  const { mapState } = useMapState();
  const { roundData } = mapState;
  const [name, setName] = useState<string | null>(null);
  const [nameExistError, setNameExistError] = useState<string | null>(null);
  const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    if (name) {
      const alreadySelected = roundData.find((player) => {
        return player.name.toUpperCase() === name.toUpperCase();
      });
      if (alreadySelected) {
        setNameExistError(name);
      } else {
        setNameExistError(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      {players.length > 0 && (
        <>
          <p>select an existing player</p>
          <PlayerListContainer>
            {players.map((player: string) => {
              const alreadySelected = roundData.find((p) => {
                return p.name === player;
              });
              return (
                <PlayerContainer
                  key={player}
                  onClick={() => {
                    setName(player);
                  }}
                  active={player === name}
                  alreadySelected={alreadySelected}
                >
                  {player}
                </PlayerContainer>
              );
            })}
          </PlayerListContainer>
        </>
      )}
      <PlayerListContainer>
        <p>{players.length > 0 && "or"} add new player</p>
        <InputPlayerName
          type="text"
          placeholder={"player"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setName(e.target.value);
          }}
        />
      </PlayerListContainer>
      {nameExistError && <ErrorText>{nameExistError} already exist</ErrorText>}
      {name && !nameExistError && (
        <>
          <p>{name}´s points:</p>
          <InputPlayerPoints
            value={points || ""}
            type="number"
            pattern="/^[0-9.,]+$/"
            min="0"
            max="99"
            step="1"
            placeholder={"pts"}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const value: number = parseInt(e.target.value);
              if (value >= 0 && value <= 99) {
                setPoints(value);
              } else {
                setPoints(null);
              }
            }}
          />
          <Button
            disabled={!points || nameExistError}
            onClick={() => {
              const playerName = name;
              if (points && playerName) {
                const playerData = { name: playerName, points: points };
                addToRound(playerData);
                setName(null);
                setNameExistError(null);
                setPoints(null);
              }
            }}
          >
            ADD
          </Button>
        </>
      )}
    </>
  );
};

export default StartPage;

const PlayerListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const PlayerContainer = styled.div`
  padding: 10px;
  margin: 10px;
  min-width: 150px;
  background-color: ${(p) => (p.active ? "orange" : "black")};
  background-color: ${(p) => p.alreadySelected && "green"};
  color: ${(p) => (p.active ? "black" : "white")};

  :hover {
    background-color: ${(p) => !p.disabled && "white"};
    color: ${(p) => !p.disabled && "black"};
    border: 1px solid black;
    cursor: ${(p) => !p.disabled && "pointer"};
  }
`;

const InputPlayerName = styled.input`
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
`;

const InputPlayerPoints = styled.input`
  padding: 10px;
  font-size: 42px;
  border: 1px solid black;
`;

const ErrorText = styled.p`
  color: red;
`;
