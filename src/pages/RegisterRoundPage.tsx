import React, { useEffect } from "react";
import AddPlayer from "../components/AddPlayer";
import RoundDataSummary from "../components/RoundDataSummary";
import { Button } from "../styled-components/styled-components";
import { useMapState } from "../state/context";
import { SET_PLAYERS, SET_ROUND_DATA } from "../state/actionTypes";
import db from "../state/firestore";
import { PLAYERS, ROUNDS } from "../constants/routes";

const RegisterRoundPage = () => {
  const { mapState, setMapState } = useMapState();
  const { players, roundData } = mapState;

  useEffect(() => {
    db.collection(PLAYERS)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const fetchedPlayers = data.map((player) => {
          return { name: player.name, initialPoints: player.initialPoints };
        });
        setMapState({
          type: SET_PLAYERS,
          players: fetchedPlayers,
        });
      });
  }, [roundData, setMapState]);

  const currentTime = new Date(Date.now());

  const formattedCurrentTime = currentTime.toLocaleString([], {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

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
              db.collection(PLAYERS).doc(player.name).set({
                name: player.name,
                initialPoints: 0,
              });
            }
          }
        }}
      />
      {roundData.length > 0 && (
        <>
          <h3>{`snabbe on ${formattedCurrentTime}`}</h3>
          <RoundDataSummary />
          <Button
            onClick={() => {
              db.collection(ROUNDS).doc(currentTime.toString()).set({
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
