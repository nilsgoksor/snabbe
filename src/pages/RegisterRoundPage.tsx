import React, { useState, useEffect } from "react";
import AddPlayer from "../components/AddPlayer";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
  Button,
} from "../styled-components/styled-components";
import { useMapState } from "../state/context";
import { GET_PLAYERS, ADD_PLAYER } from "../state/actionTypes";

const RegisterRoundPage = () => {
  const { mapState, setMapState } = useMapState();

  const [roundData, setRoundData] = useState<
    { name: string; points: number }[]
  >([]);

  useEffect(() => {
    setMapState({
      type: GET_PLAYERS,
    });
  }, [setMapState]);

  const { players } = mapState;

  return (
    <>
      <h1>register round</h1>
      <AddPlayer
        players={players}
        roundData={roundData}
        addToRound={(player: { name: string; points: number }) => {
          if (player) {
            const insertIndex = roundData.findIndex(
              (p) => p.points < player.points
            );
            if (insertIndex !== -1) {
              const modifiedroundData = [...roundData];
              modifiedroundData.splice(insertIndex, 0, player);
              setRoundData(modifiedroundData);
            } else {
              setRoundData([...roundData, player]);
            }
            if (!players.includes(player.name)) {
              setMapState({
                type: ADD_PLAYER,
                player: player.name,
              });
            }
          }
        }}
      />
      {roundData.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableData>Rank</TableData>
              <TableData>Name</TableData>
              <TableData>Points</TableData>
            </TableRow>
          </TableHead>
          <TableBody>
            {roundData.map((player, index) => {
              return (
                <TableRow
                  key={player.name}
                  onClick={() => {
                    const removeIndex = roundData.findIndex(
                      (p) => p.name === player.name
                    );
                    const modifiedroundData = [...roundData];
                    if (removeIndex === 0) {
                      modifiedroundData.shift();
                    } else {
                      modifiedroundData.splice(1, removeIndex);
                    }
                    setRoundData(modifiedroundData);
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
      {roundData.length > 0 && (
        <Button
          onClick={() => {
            console.log("REGISTER ROUND", roundData);
          }}
        >
          REGISTER
        </Button>
      )}
    </>
  );
};

export default RegisterRoundPage;
