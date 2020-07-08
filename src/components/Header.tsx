import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Heading = ({ pages, history }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [headerIsTransparent, setHeaderIsTransparent] = useState(true);
  const [headerIsMovedUp, setHeaderIsMovedUp] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const scrollBreakTransparent = 300;
  const scrollBreakMoveUp = 100;

  const handleScroll = (event) => {
    const currentScrollPos = scrollPos;
    setShowHeader(document.body.getBoundingClientRect().top > currentScrollPos);
    setScrollPos(document.body.getBoundingClientRect().top);
    setHeaderIsTransparent(
      window.scrollY < scrollBreakTransparent ? true : false
    );
    setHeaderIsMovedUp(window.scrollY > scrollBreakMoveUp ? true : false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <ScrollBuffer />
      <Nav
        transparent={headerIsTransparent}
        moveUp={headerIsMovedUp}
        open={showMenu}
        show={showHeader}
      >
        <IconWrapper>
          <NavIcon onClick={() => setShowMenu(!showMenu)}>
            <Line open={showMenu} />
            <Line open={showMenu} />
          </NavIcon>
        </IconWrapper>
      </Nav>
      <Overlay open={showMenu}>
        <OverlayMenu open={showMenu}>
          {pages.map((page, index) => (
            <li
              key={page + index}
              onClick={() => {
                setShowMenu(!showMenu);
                history.push("/" + page);
              }}
            >
              <OverlayText
                selected={
                  `/${page}` === history.location.pathname ||
                  (history.location.pathname === "/" && index === 0)
                }
              >
                {page}
              </OverlayText>
            </li>
          ))}
        </OverlayMenu>
      </Overlay>
      <Backdrop open={showMenu} onClick={() => setShowMenu(!showMenu)} />
    </>
  );
};
export default Heading;

const ScrollBuffer = styled.div`
  position: fixed;
  z-index: -10;
  width: 100%;
  height: 50%;
  background-color: ${(p) => p.theme.colors.green};
`;

const Nav = styled.nav`
  width: 100%;
  position: fixed;
  z-index: 200;
  background-color: ${(p) =>
    p.transparent ? "transparent" : p.theme.colors.green};
  background-color: ${(p) => p.open && "transparent"};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  transition: 0.2s ease-in-out;
  transform: translateY(
    ${(p) => (!p.show && p.moveUp && !p.open ? "-100%" : "0%")}
  );
`;

export const NavIcon = styled.div`
  margin-right: 15px;
  margin-top: 7.5px;
  display: block;
  background: none;
  cursor: pointer;
  border: none;
  outline: none;
`;

const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: ${(p) =>
    p.open ? p.theme.colors.black : p.theme.colors.white};
  transition: 0.4s ease-in-out;

  :nth-of-type(1) {
    transform: ${(props) =>
      props.open ? "translateY(8px) rotate(135deg)" : "none"};
  }
  :nth-of-type(2) {
    transform: ${(props) =>
      props.open ? "translateY(0px) rotate(45deg)" : "none"};
  }
`;

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 513px;
  max-width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 150;
  transform: translateX(${(p) => (p.open ? "0%" : "+100%")});
  background-color: white;
  transition: 0.4s ease-in-out;
  visibility: ${(p) => (p.open ? "visible" : "hidden")};
  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    transform: translateY(${(p) => (p.open ? "0%" : "-100%")});
  }
`;

const OverlayMenu = styled.ul`
  list-style: none;
  position: absolute;
  text-align: right;
  padding-top: 100px;
  padding-right: 20px;
`;

const OverlayText = styled.h3`
  font-size: 60px;
  margin: 40px;
  color: ${(p) => p.theme.colors.green};
  text-decoration: ${(p) => p.selected && "underline"};

  :hover {
    cursor: pointer;
    opacity: ${(p) => p.theme.hover.opacity};
    text-decoration: underline;
  }
  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    margin: 10px;
  }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, ${(p) => (p.open ? 0.5 : 0)});
  display: ${(p) => !p.open && "none"};
  transition: 0.2s ease-in-out;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
