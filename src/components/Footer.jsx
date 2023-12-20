import React from "react";
import PlayerControls from "./PlayerControls";
import CurrentTrack from "./CurrentTrack";
import Volume from "./Volume";
import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        className="footer"
      >
        <CurrentTrack />
        <PlayerControls />
        <Volume />
      </div>
    </Container>
  );
}

const Container = styled.div`
/* display: flex; */
/* flex-direction: row; */
justify-content:space-around

`;
