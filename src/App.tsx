import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import RegisterRoundPage from "./pages/RegisterRoundPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import NotFoundPage from "./pages/NotFoundPage";
import styled from "styled-components";

function App() {
  const history = createBrowserHistory();

  return (
    <>
      <Header>
        <HeaderLink
          onClick={() => {
            history.push("/");
          }}
        >
          register round
        </HeaderLink>
        <HeaderLink
          onClick={() => {
            history.push("/leaderboard");
          }}
        >
          leaderboard
        </HeaderLink>
      </Header>
      <PageContainer>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={RegisterRoundPage} />
            <Route path="/leaderboard" exact component={LeaderBoardPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </PageContainer>
    </>
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

const Header = styled.div`
  display: flex;
  justify-content: center;
  background-color: #a0a0a0;
`;

const HeaderLink = styled.div`
  cursor: pointer;
  margin: 20px;
  font-size: 24px;

  :hover {
    color: #f5f5f5;
  }
`;
