import React, { useState, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import db from "../state/firestore";
import { PLAYERS, ROUNDS } from "../constants/routes";
import styled from "styled-components";

const PlayerProfilesPage = () => {
  const [selectedPlayer, setPlayer] = useState("ADAM");

  const [fetchedPlayers, setFetchedPlayers] = useState<
    { name: any; points: any }[]
  >([]);

  const [fetchedRounds, setFetchedRounds] = useState<
    { name: string; points: number }[][]
  >([]);

  useEffect(() => {
    db.collection(PLAYERS)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const players = data.map((player) => {
          return { name: player.name, points: player.initialPoints };
        });
        setFetchedPlayers(players);
      });
  }, []);

  useEffect(() => {
    db.collection(ROUNDS)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const rounds = data.map((round) => {
          return round.round;
        });
        setFetchedRounds(rounds);
      });
  }, []);

  const playerNames = getPlayerNames();

  const options = createDropdownOptions(playerNames);

  const data = generatePlayerData(playerNames);

  addImagesToPlayerData();

  const compiledData = getCompiledData();

  return (
    <>
      <h1>Player profiles</h1>

      {fetchedRounds.length === 0 || fetchedPlayers.length === 0 ? (
        ""
      ) : (
        <>
          <SelectTest
            value={selectedPlayer}
            onChange={(event) => setPlayer(event.target.value)}
          >
            {options}
          </SelectTest>

          {data[selectedPlayer].images ? (
            <>
              <AwesomeSlider>
                {createImagesForGallery(data[selectedPlayer].images)}
              </AwesomeSlider>
              <Rank>Rank:</Rank>
              {compiledData[selectedPlayer].rank}
              <H3>Points:</H3>
              {compiledData[selectedPlayer].points}
              <H3>Rounds:</H3>
              {compiledData[selectedPlayer].rounds}
              <H3>Points per round:</H3>
              {compiledData[selectedPlayer].pointsPerRound}
              <H3>Strengths:</H3>
              {data[selectedPlayer].strengths}
              <H3>Weaknesses:</H3>
              {data[selectedPlayer].weaknesses}{" "}
            </>
          ) : (
            <p>Images missing. Pusha master brir</p>
          )}
        </>
      )}

      <Footer></Footer>
    </>
  );

  // LOCAL FUNCTIONS

  // Gets an alphabetically sorted array of player names.
  function getPlayerNames() {
    const playerNames: string[] = [];
    for (const round of fetchedRounds) {
      for (const player of round) {
        if (playerNames.includes(player.name)) {
          continue;
        }
        playerNames.push(player.name);
      }
    }
    playerNames.sort();
    return playerNames;
  }

  // Create the option elements for the player dropdown menu.
  function createDropdownOptions(playerNames) {
    const options: JSX.Element[] = [];
    for (const player of playerNames) {
      options.push(
        <option key={player} value={player} label={player.toLowerCase()}>
          {" "}
        </option>
      );
    }
    return options;
  }

  // Creates an object with basic player data (most of this data should be stored in the DB eventually)
  function generatePlayerData(playerNames) {
    const data = {};
    for (const name of playerNames) {
      data[name] = {
        name: name,
        weaknesses: getInfo(name, true),
        strengths: getInfo(name, false),
      };
    }
    return data;
  }

  // Gets the strength/weakness list elements (the info contained in the list should be fetched from the DB eventually)
  function getInfo(player, isWeakness) {
    switch (player) {
      case "ADAM":
        return isWeakness
          ? [<li key="1">Sjukt inconsistent</li>]
          : [
              <li key="1">Var 20:e skott är otagbart</li>,
              <li key="2">Långa armar</li>,
            ];
      case "ANTON":
        return isWeakness
          ? [<li key="1">Kan inte skjuta med bra bollar</li>]
          : [<li key="1">Är alltid med</li>, <li key="2">Konsistent</li>];
      case "CRIPPE":
        return isWeakness
          ? [<li key="1">Har ofta tvättid</li>]
          : [<li key="1">Skjuter som en hest</li>];
      case "IDA":
        return isWeakness
          ? [<li key="1">Helsingborg</li>]
          : [<li key="1">Makt över Adam</li>, <li key="2">Blir inte trött</li>];
      case "JOEL":
        return isWeakness
          ? [<li key="1">Svaga knän</li>]
          : [<li key="1">Kan skjuta med fel fot</li>];
      case "JOHAN":
        return isWeakness
          ? [<li key="1">Malmö</li>]
          : [<li key="1">Kan spela målvakt</li>];
      case "JOHANNES":
        return isWeakness
          ? [<li key="1">Nils passningar</li>, <li key="2">Noll kondition</li>]
          : [
              <li key="1">Målvaktshandskar</li>,
              <li key="2">Slänger sig i mål</li>,
            ];
      case "NILS":
        return isWeakness
          ? [
              <li key="1">Vänsterfotad</li>,
              <li key="2">Lätt-tiltad</li>,
              <li key="3">Måste äta middag</li>,
            ]
          : [
              <li key="1">Skjuter bäst i gänget</li>,
              <li key="2">Bor på Lerbäck</li>,
            ];
      case "TOBBE":
        return isWeakness
          ? [
              <li key="1">Gammal - går sönder efter tre rundor</li>,
              <li key="2">Kan inte skjuta på stillaliggande boll</li>,
            ]
          : [<li key="1">Kan lobba över Anton</li>];
      default:
        return [<li key="1">Info saknas</li>];
    }
  }

  // Helper function to map the URLs in 'addImagesToPlayerData'
  function importAll(r) {
    return r.keys().map(r);
  }

  // Adds the image URLs to the (player)data object.
  function addImagesToPlayerData() {
    // Image urls should be fetched from DB instead of locally to avoid this crap.
    // Can't extract to method because the first parameter in require.context has to be a static string...
    const adamImages = importAll(
      require.context("../media/playerImages/adam", false, /\.(png|jpe?g|svg)$/)
    );
    const antonImages = importAll(
      require.context(
        "../media/playerImages/anton",
        false,
        /\.(png|jpe?g|svg)$/
      )
    );
    const crippeImages = importAll(
      require.context(
        "../media/playerImages/crippe",
        false,
        /\.(png|jpe?g|svg)$/
      )
    );

    const johanImages = importAll(
      require.context(
        "../media/playerImages/johan",
        false,
        /\.(png|jpe?g|svg)$/
      )
    );
    const johannesImages = importAll(
      require.context(
        "../media/playerImages/johannes",
        false,
        /\.(png|jpe?g|svg)$/
      )
    );
    const nilsImages = importAll(
      require.context("../media/playerImages/nils", false, /\.(png|jpe?g|svg)$/)
    );
    const tobbeImages = importAll(
      require.context(
        "../media/playerImages/tobbe",
        false,
        /\.(png|jpe?g|svg)$/
      )
    );

    // Can be assigned directly in 'generatePlayerData' when the URLs are stored in the DB.
    if (fetchedRounds.length !== 0 && fetchedPlayers.length !== 0) {
      data["ADAM"].images = adamImages;
      data["ANTON"].images = antonImages;
      data["CRIPPE"].images = crippeImages;
      data["JOHAN"].images = johanImages;
      data["JOHANNES"].images = johannesImages;
      data["NILS"].images = nilsImages;
      data["TOBBE"].images = tobbeImages;
    }
  }

  // Create the elements for the images that's to be displayed in the 'AwesomeSlider' component.
  function createImagesForGallery(images) {
    const galleryImages: JSX.Element[] = [];
    for (const image of images) {
      galleryImages.push(<div key={image} data-src={image}></div>);
    }
    return galleryImages;
  }

  // Calculates and returns the 'compiled' data, based on both 'player' and 'round'-data from the DB.
  function getCompiledData() {
    const compiledData = {};

    // Early return if data is not loaded
    if (fetchedRounds.length === 0 || fetchedPlayers.length === 0) {
      return compiledData;
    }

    // Sum up all points from the rounds
    for (const round of fetchedRounds) {
      for (const player of round) {
        if (compiledData[player.name]) {
          compiledData[player.name].points =
            compiledData[player.name].points + player.points;
          compiledData[player.name].rounds += 1;
        } else {
          compiledData[player.name] = {
            name: player.name,
            points: player.points,
            rounds: 1,
          };
        }
      }
    }

    // Add the initial points because the data is fucking broken.
    for (const initialPlayer of fetchedPlayers) {
      compiledData[initialPlayer.name].points += initialPlayer.points;
      compiledData[initialPlayer.name].initialPoints = initialPlayer.points;
    }

    // Create a sorted array containing the players, sorted by points.
    // An calculate the points per round since we're iterating over the compiledData object anyway.
    var sortedPlayers: any[] = [];
    for (var name in compiledData) {
      sortedPlayers.push([name, compiledData[name].points]);

      compiledData[name].pointsPerRound =
        (compiledData[name].points - compiledData[name].initialPoints) /
        compiledData[name].rounds;
    }

    sortedPlayers.sort(function (a, b) {
      return b[1] - a[1];
    });

    // Apply the rank based on the sorted array.
    for (let index = 0; index < sortedPlayers.length; index++) {
      compiledData[sortedPlayers[index][0]].rank = index + 1;
    }

    return compiledData;
  }
};

// STYLING CONSTANTS

const Rank = styled.h3`
  margin-top: 40px;
  margin-bottom: 0px;
`;

const H3 = styled.h3`
  margin-top: 10px;
  margin-bottom: 0px;
`;

const SelectTest = styled.select`
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  padding: 0.6em 1.4em 0.5em 0.8em;
  border-radius: 0.5em;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  margin-bottom: 10px;
`;
const Footer = styled.div`
  height: 30px;
`;
export default PlayerProfilesPage;
