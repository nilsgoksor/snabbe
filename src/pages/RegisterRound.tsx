import React, { useState } from "react";
import AddPlayer from "../components/AddPlayer";

const RegisterRound = () => {
  const players = ["nils", "anton", "adam", "joel", "johannes", "crippe"];

  const [playersInRound, setPlayersInRound] = useState<
    { name: string; points: number }[]
  >([]);

  return (
    <>
      <h1>register round</h1>
      <AddPlayer
        players={players}
        addToRound={(p: { name: string; points: number }) => {
          const test = [...playersInRound, p];
          setPlayersInRound(test);
        }}
      />
      {playersInRound.map((p) => {
        return <p>{p.name}</p>;
      })}
    </>
  );
};

export default RegisterRound;
