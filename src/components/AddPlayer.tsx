import React, { useState, useEffect } from "react";
import styled from "styled-components";

type StartPageProps = {
  players: string[];
  addToRound: (p: { name: string; points: number }) => void;
};

const StartPage = ({ players, addToRound }: StartPageProps) => {
  const [name, setName] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [nameExistError, setNameExistError] = useState(false);

  useEffect(() => {
    setPoints(0);
  }, [name, newName]);

  return (
    <>
      <p>select a player from the list</p>
      <PlayerListContainer>
        {players.map((p) => (
          <PlayerContainer
            key={p}
            onClick={() => {
              setNewName(null);
              if (p !== name) {
                setName(p);
              } else {
                setName(null);
              }
            }}
            active={p === name}
          >
            {p}
          </PlayerContainer>
        ))}
        or add new
        <InputPlayerName
          type="text"
          value={newName || ""}
          placeholder={"player"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setNameExistError(players.includes(e.target.value));
            setNewName(e.target.value);
            setName(null);
          }}
        />
      </PlayerListContainer>
      {(name || newName) && (
        <>
          <p>{name || newName}´s points:</p>
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
              }
            }}
          />
        </>
      )}
      <Button
        disabled={!points || nameExistError}
        onClick={() => {
          const playerName = name || newName;
          if (points && playerName) {
            const playerData = { name: playerName, points: points };
            addToRound(playerData);
          }
        }}
      >
        add
      </Button>
      {nameExistError && <p>{newName} already exist</p>}
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
  background-color: ${(p) => (p.active ? "yellow" : "black")};
  color: ${(p) => (p.active ? "black" : "white")};

  :hover {
    background-color: white;
    color: black;
    border: 1px solid black;
    cursor: pointer;
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

const Button = styled.button`
  padding: 10px;
  font-size: 42px;
  border: 1px solid black;
  cursor: pointer;
`;
