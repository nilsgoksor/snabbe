import React from "react";
import styled from "styled-components/macro";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Wrapper = styled.div`
  height: 95vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-height: 80vh;
`;

const Navigation = styled.nav`
  width: 100%;
  max-width: 960px;
  display: flex;
  justify-content: center;
`;

const NavigationButton = styled.button`
  background-color: ${(p) => p.theme.colors.blue};
  color: ${(p) => p.theme.colors.purple};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  width: 6rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.25rem;
  outline: 0;
  cursor: pointer;
`;

const lastPhotoIndex = 30;

const PhotoAlbum = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <Wrapper>
      <Image src={`/images/snabbe_2020-11-15/${index}.jpeg`} alt="" />
      <Navigation>
        <NavigationButton
          onClick={() => {
            setIndex((state) => {
              if (state === 0) {
                return lastPhotoIndex;
              }
              return state - 1;
            });
          }}
        >
          <ArrowBackIcon></ArrowBackIcon>
        </NavigationButton>
        <NavigationButton
          onClick={() => {
            setIndex((state) => {
              return (state + 1) % lastPhotoIndex;
            });
          }}
        >
          <ArrowForwardIcon></ArrowForwardIcon>
        </NavigationButton>
      </Navigation>
    </Wrapper>
  );
};
export default PhotoAlbum;
