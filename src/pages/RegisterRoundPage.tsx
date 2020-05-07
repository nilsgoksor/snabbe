import React, { useState, useEffect } from "react";
import AddPlayer from "../components/AddPlayer";
import RoundDataSummary from "../components/RoundDataSummary";
import { Button } from "../styled-components/styled-components";
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
      });
  }, [roundData]);

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
              return p.name.toUpperCase() === player.name.toUpperCase();
            });

            if (newPlayer) {
              db.collection("players").doc(player.name).set({
                name: player.name,
              });
            }
          }
        }}
      />
      {roundData.length > 0 && (
        <>
          <RoundDataSummary />
          <Button
            onClick={() => {
              db.collection("rounds").doc(Date.now().toString()).set({
                round: roundData,
                date: Date.now(),
              });
              setMapState({
                type: SET_ROUND_DATA,
                roundData: [],
              });
            }}
          >
            REGISTER
          </Button>
        </>
      )}
    </>
  );
};

export default RegisterRoundPage;
