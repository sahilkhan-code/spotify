import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { CgVolume } from "react-icons/cg";
import { BsVolumeUpFill } from "react-icons/bs";
import { IoVolumeHigh } from "react-icons/io5";

export default function Volume() {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <Container>
        <div className="vol">
        <IoVolumeHigh style={{color:'white'}} />
        </div>
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin-top: 19px;
  input {
    width: 10rem;
    border-radius: 2rem;
    margin: 10px;
    height: 7px;
  }
  .vol{
    margin-top: 3px;
    svg{
        width: 20px;
        height: 20px;

    }
  }
`;