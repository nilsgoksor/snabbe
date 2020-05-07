import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import RegisterRoundPage from "./pages/RegisterRoundPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import styled from "styled-components";
import { MapProvider } from "./state/context";

function App() {
  const history = createBrowserHistory();

  return (
    <MapProvider>
      <PageContainer>
        <Header history={history} />
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={RegisterRoundPage} />
            <Route path="/leaderboard" exact component={LeaderBoardPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </PageContainer>
    </MapProvider>
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
