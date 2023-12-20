import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";
import styled from "styled-components";
import Modal from "./Modal";

export default function Body() {
  let [loading, setLoading] = useState(false);

  const [{ token, selectedPlaylistId, selectedPlaylist, playlists }, dispatch] =
    useStateProvider();

  useEffect(() => {
    setLoading(true);
    const getInitialPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            image: track.album.images[2].url,
            artists: track.artists.map((artist) => artist.name),
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
        dispatch({ type: reducerCases.SET_PLAYLIST_DATA, selectedPlaylist });
        console.log("sp", selectedPlaylist);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <Container>
      <Modal isLoading={loading} />
      {selectedPlaylist && (
        <>
          <div className="topContainer">
            <img className="topImg" src={selectedPlaylist.image} alt="topImg" />
            <div className="containerText">
              Playlist
              <div className="playlistName">{selectedPlaylist.name}</div>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span> <span style={{ marginLeft: 15 }}>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>Duration</span>
              </div>
            </div>
          </div>
          <div className="bottomContainer">
            {selectedPlaylist.tracks.map(
              (
                {
                  id,
                  name,
                  image,
                  artists,
                  duration,
                  album,
                  context_uri,
                  track_number,
                },
                index
              ) => (
                <div
                  className="bottom"
                  key={id}
                  onClick={() =>
                    playTrack(
                      id,
                      name,
                      artists,
                      image,
                      context_uri,
                      track_number
                    )
                  }
                >
                  <div className="index">
                    <span>{index + 1}</span>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "row" }}
                    className="title"
                  >
                    <div>
                      <img src={image} alt="img" className="imgTitle" />
                    </div>
                    <div className="name" style={{ marginLeft: 15 }}>
                      {name.slice(0, 40)}..
                      <div className="artist">{artists.join(", ")}</div>
                    </div>
                  </div>
                  <div className="album">{album}</div>
                  <div className="duration">
                    {msToMinutesAndSeconds(duration)}
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 10px;
  height: 100vh;
  .topContainer {
    margin-top: 10%;
    height: 100%;
    display: flex;
    flex-direction: row;
    height: 50vh;
    margin-left: 7vh;
    .topImg {
      height: 40vh;
      width: 40vh;
      margin-right: 40px;
      border-radius: 10px;
      border: solid white 1.5px;
      padding: 3px;
    }
    .containerText {
      color: white;
      font-size: 15px;
      align-self: center;
    }
    .playlistName {
      font-size: 50px;
      font-weight: 700;
    }
  }
  .bottomContainer {
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    color: black;
    margin-top: 20px;
    .bottom {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      padding: 5px;
      /* border-radius: 10px; */
      border-bottom: solid black 1px;
      .list {
        flex-direction: row;
      }
      :hover {
        background-color: black;
        color: white;
      }
      cursor: pointer;
      transition: 0.2s ease-in-out;
    }
    .index {
      width: 20px;
    }
    .title {
      margin-left: 10px;
      overflow: auto;
      display: flex;
      flex-direction: row;
      max-width: 70vh;
    }
  }
  .artist {
    overflow: hidden;
    color: grey;
  }
  .header-row {
    display: flex;
    flex-direction: row;
    color: white;
    gap: 30vw;
    margin-left: 17px;
  }
  .imgTitle {
    height: 42px;
    border-radius: 5px;
  }
  .name {
    overflow: hidden;
    flex-wrap: wrap;
    text-overflow: ellipsis;
    font-size: 15px;
  }
  .title {
    width: 65vh;
    margin-right: 20px;
  }
  .album {
    width: 81vh;
    margin-right: 30px;
  }
  .loader {
    position: absolute;
    z-index: 999;
  }
`;
