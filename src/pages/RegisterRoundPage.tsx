import React, { useState } from "react";
import AddPlayer from "../components/AddPlayer";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
  Button,
} from "../styled-components/styled-components";

const RegisterRoundPage = () => {
  const players = ["nils", "anton", "adam", "joel", "johannes", "crippe"];

  const [playersInRound, setPlayersInRound] = useState<
    { name: string; points: number }[]
  >([]);

  return (
    <>
      <h1>register round</h1>
      <AddPlayer
        players={players}
        playersInRound={playersInRound}
        addToRound={(player: { name: string; points: number }) => {
          if (player) {
            const insertIndex = playersInRound.findIndex(
              (p) => p.points < player.points
            );
            if (insertIndex !== -1) {
              const modifiedPlayersInRound = [...playersInRound];
              modifiedPlayersInRound.splice(insertIndex, 0, player);
              setPlayersInRound(modifiedPlayersInRound);
            } else {
              setPlayersInRound([...playersInRound, player]);
            }
            if (!players.includes(player.name)) {
              //TODO: ADD TO DB
              console.log("ADDDING NEW PLAYER");
            }
          }
        }}
      />
      {playersInRound.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableData>Rank</TableData>
              <TableData>Name</TableData>
              <TableData>Points</TableData>
            </TableRow>
          </TableHead>
          <TableBody>
            {playersInRound.map((player, index) => {
              return (
                <TableRow
                  key={player.name}
                  onClick={() => {
                    const removeIndex = playersInRound.findIndex(
                      (p) => p.name === player.name
                    );
                    const modifiedPlayersInRound = [...playersInRound];
                    if (removeIndex === 0) {
                      modifiedPlayersInRound.shift();
                    } else {
                      modifiedPlayersInRound.splice(1, removeIndex);
                    }
                    setPlayersInRound(modifiedPlayersInRound);
                  }}
                >
                  <TableData>{index + 1}</TableData>
                  <TableData>{player.name}</TableData>
                  <TableData>{player.points}</TableData>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      {playersInRound.length > 0 && (
        <Button
          onClick={() => {
            console.log("REGISTER ROUND");
          }}
        >
          register
        </Button>
      )}
    </>
  );
};

export default RegisterRoundPage;
