import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import RegisterRoundPage from "./pages/RegisterRoundPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import NotFoundPage from "./pages/NotFoundPage";
import PlayerProfilesPage from "./pages/PlayerProfilesPage";
import Header from "./components/Header";
import styled from "styled-components";
import { StateProvider } from "./state/context";
import { ThemeProvider } from "styled-components";
import theme from "./styled-components/theme";

function App() {
  const history = createBrowserHistory();

  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <Header
          history={history}
          pages={["round", "leaderboard", "profiles"]}
        />
        <PageContainer>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={RegisterRoundPage} />
              <Route path="/round" exact component={RegisterRoundPage} />
              <Route path="/leaderboard" exact component={LeaderBoardPage} />
              <Route path="/profiles" exact component={PlayerProfilesPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </Router>
        </PageContainer>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;

const PageContainer = styled.div`
  width: 100%;
  margin: auto;

  @media (min-width: 750px) {
    width: 750px;
  }
`;
