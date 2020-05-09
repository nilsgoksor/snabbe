import React, { useState, useEffect, useRef } from "react";
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
  const [newName, setNewName] = useState<string | null>(null);
  const [nameAlreadyInRound, setNameAlreadyInRound] = useState<string | null>(
    null
  );
  const [availablePlayers, setAvailablePlayers] = useState<string[]>(players);
  const [points, setPoints] = useState<number | null>(null);
  const inputPointsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (name) {
      const alreadySelected = roundData.find((player) => {
        return player.name.toUpperCase() === name.toUpperCase();
      });
      if (alreadySelected) {
        setNameAlreadyInRound(name);
      } else {
        setNameAlreadyInRound(null);
      }
    }
  }, [name, roundData]);

  useEffect(() => {
    if (newName) {
      setName(newName);
    }
    if (!newName) {
      if (inputPointsRef.current) {
        inputPointsRef.current.focus();
      }
    }
  }, [name, newName]);

  useEffect(() => {
    const availablePlayers = players.filter((p) => {
      const alreadySelected = !roundData.find((rp) => rp.name === p);
      return alreadySelected;
    });
    setAvailablePlayers(availablePlayers);
  }, [players, roundData]);

  return (
    <>
      {availablePlayers.length > 0 && (
        <>
          <p>Select an existing player</p>
          <PlayerListContainer>
            {availablePlayers.map((player: string) => {
              return (
                <PlayerContainer
                  key={player}
                  onClick={() => {
                    setName(player);
                    setNewName(null);
                    if (inputPointsRef.current) {
                      inputPointsRef.current.focus();
                    }
                  }}
                >
                  {player}
                </PlayerContainer>
              );
            })}
          </PlayerListContainer>
        </>
      )}
      <PlayerListContainer>
        <p>{availablePlayers.length > 0 && "or"} add new player</p>
        <InputPlayerName
          type="text"
          value={newName || ""}
          placeholder={"player"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setNewName(e.target.value.toUpperCase());
          }}
        />
      </PlayerListContainer>
      {nameAlreadyInRound && (
        <ErrorText>{nameAlreadyInRound} already exist</ErrorText>
      )}
      {name && !nameAlreadyInRound && (
        <>
          <h3>{name}´s points:</h3>
          <InputPlayerPoints
            ref={inputPointsRef}
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
            disabled={!points || nameAlreadyInRound}
            onClick={() => {
              const playerName = name;
              if (points && playerName) {
                const playerData = { name: playerName, points: points };
                addToRound(playerData);
                setName(null);
                setNewName(null);
                setNameAlreadyInRound(null);
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
  min-width: 100px;
  background-color: black;
  color: white;

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
