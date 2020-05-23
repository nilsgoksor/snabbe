import React, { useState } from "react";
import styled from "styled-components";

const Header = ({ history }) => {
  const [selectedTab, setSelectedTab] = useState(history.location.pathname);

  return (
    <HeaderContainer>
      <HeaderLink
        onClick={() => {
          setSelectedTab("/");
          history.push("/");
        }}
        selected={selectedTab === "/"}
      >
        Register round
      </HeaderLink>
      <HeaderLink
        onClick={() => {
          setSelectedTab("/leaderboard");
          history.push("/leaderboard");
        }}
        selected={selectedTab === "/leaderboard"}
      >
        Leaderboard
      </HeaderLink>

      <HeaderLink
        onClick={() => {
          setSelectedTab("/profiles");
          history.push("/profiles");
        }}
        selected={selectedTab === "/profiles"}
      >
        Player profiles
      </HeaderLink>
    </HeaderContainer>
  );
};
export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  border-bottom: 1px solid black;
`;

const HeaderLink = styled.div`
  cursor: pointer;
  margin: 20px;
  font-size: 24px;
  background-color: ${(p) => p.selected && "black"};
  color: ${(p) => p.selected && "white"};

  :hover {
    color: white;
    background-color: black;
  }
`;
