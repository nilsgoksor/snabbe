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
import { SET_ROUND_DATA } from "../state/actionTypes";
import db from "../state/firestore";

const RegisterRoundPage = () => {
  const { mapState, setMapState } = useMapState();
  const { roundData } = mapState;

  const [players, setPlayers] = useState<{ name: string }[]>([]);

  useEffect(() => {
    db.collection("players")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const fetchedPlayers = data.map((player) => {
          return { name: player.name };
        });
        setPlayers(fetchedPlayers);
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
      });
  }, []);

  return (
    <>
      <h1>register round</h1>
      <AddPlayer
        players={players.map((p) => p.name)}
        addToRound={(player: { name: string; points: number }) => {
          if (player) {
            const insertIndex = roundData.findIndex(
              (p) => p.points < player.points
            );
            if (insertIndex !== -1) {
              const modifiedroundData = [...roundData];
              modifiedroundData.splice(insertIndex, 0, player);
              setMapState({
                type: SET_ROUND_DATA,
                roundData: modifiedroundData,
              });
            } else {
              setMapState({
                type: SET_ROUND_DATA,
                roundData: [...roundData, player],
              });
            }
            const newPlayer = !players.find((p) => {
              return p.name === player.name;
            });

            if (newPlayer) {
              db.collection("players")
                .doc()
                .set({
                  name: player.name,
                })
                .then(function () {
                  console.log("Document successfully written!");
                })
                .catch(function (error) {
                  console.error("Error writing document: ", error);
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
                    setMapState({
                      type: SET_ROUND_DATA,
                      roundData: modifiedroundData,
                    });
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
