const devMode = false;
const activeSeason = "Fall2020";

export const ROUNDS = !devMode
  ? `${activeSeason}_rounds`
  : `${activeSeason}_mock_rounds`;
export const PLAYERS = !devMode ? `players` : `mock_players`;
export const HISTORY = !devMode ? "history" : "mock_history";
