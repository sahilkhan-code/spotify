import React from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";

export default function PlayerControls() {
  const [{ token, currentTrackData }, dispatch] = useStateProvider();

  const playHandler = async () => {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",{},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log('rrr',response)
  };

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev />
      </div>
      <div className="state">
        <BsFillPauseCircleFill onClick={() => playHandler()} />
        {/* <BsFillPlayCircleFill  /> */}
      </div>
      <div className="next">
        <CgPlayTrackNext />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
