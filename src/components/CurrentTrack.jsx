import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/constants";

export default function () {
  const [{ token, currentTrackData }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data !== "") {
          const currentTrackData = {
            timeStamp: response.data.timestamp,
            progress: response.data.progress_ms,
            name: response.data.item.name,
            id: response.data.item.id,
            artist: response.data.item.artists.map((artists) => artists.name),
            image: response.data.item.album.images[0].url,
          };
          dispatch({ type: reducerCases.SET_CURRENT_DATA, currentTrackData });
        }
      } catch (error) {}
    };

    getCurrentTrack();
  }, []);
  return (
    <Container>
      {currentTrackData && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img src={currentTrackData.image} alt="" className="image" />
          <div style={{ alignSelf: "center" }}>
            <div className="name">{currentTrackData.name}</div>
            <div className="artists" style={{ fontSize: 10, color: "silver" }}>
              {currentTrackData.artist}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  color: white;
  font-size: 12px;
  width: 15vw;
  margin: 10px;
  .image {
    height: 40px;
    width: 40px;
    margin-right: 10px;
    border-radius: 10px;
  }
`;
