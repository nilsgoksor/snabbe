import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import RegisterRoundPage from "./pages/RegisterRoundPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import NotFoundPage from "./pages/NotFoundPage";
import PlayerProfilesPage from "./pages/PlayerProfilesPage";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import theme from "./styled-components/theme";
import HistoryPage from "./pages/HistoryPage";
import PhotoAlbum from "./pages/PhotoAlbum";

function App() {
  const history = createBrowserHistory();

  return (
    <ThemeProvider theme={theme}>
      <Header
        history={history}
        pages={["round", "table", "history", "profiles", "photos"]}
      />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={RegisterRoundPage} />
          <Route path="/round" exact component={RegisterRoundPage} />
          <Route path="/table" exact component={LeaderBoardPage} />
          <Route path="/history" exact component={HistoryPage} />
          <Route path="/profiles" exact component={PlayerProfilesPage} />
          <Route path="/photos" exact component={PhotoAlbum} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
