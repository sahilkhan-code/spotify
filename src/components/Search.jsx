import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import images from "./images";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import Modal from "./Modal";

export default function Search() {
  const [{ token, searchData, topData, userInfo, alert }, dispatch] =
    useStateProvider();
  const [search, setSearch] = useState("");
  const [topTracksVisible, setTopTracksVisible] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const usersTopTracks = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/tracks`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const { items } = response.data;
        const topData = items.map((data) => ({
          id: data.id,
          name: data.name,
          artist: data.artists.map((artist) => artist.name),
          image: data.album.images[0].url,
          context_uri: data.uri,
          track_number: data.track_number,
        }));
        dispatch({ type: reducerCases.SET_TOP_DATA, topData });
        setLoading(false);
      } catch (error) {}
    };
    usersTopTracks();
  }, []);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    try {
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
    } catch (error) {
      dispatch({ type: reducerCases.SET_ALERT, alert: true });
    }
  };

  const searchHandler = async (event) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=playlist&limit=20`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    const { items } = response.data.playlists;
    const searchData = items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.images[0].url,
    }));
    dispatch({ type: reducerCases.SET_SEARCH_DATA, searchData });
    setSearch("");
    setTopTracksVisible(false);
    setLoading(false);
  };
  const tracksHandler = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  const textHandler = (event) => {
    setSearch(event.target.value);
    if (event.target.value) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };
  return (
    <Container>
      <Modal isLoading={loading} />
      <div className="inputField">
        <img className="searchImg" src={images.search} alt="search" />
        <input
          type="text"
          placeholder="Artists, Songs, Podcasts"
          onChange={(event) => textHandler(event)}
          value={search}
        />

        <button
          disabled={buttonDisabled}
          onClick={() => searchHandler()}
          className={buttonDisabled ? "buttonDisabled" : "button"}
        >
          Search
        </button>
      </div>

      {!topTracksVisible ? (
        <>
          {searchData && (
            <div className="card">
              <div className="cardouter">
                {searchData.map((item, index) => (
                  <Link
                    to="/body"
                    key={item.id}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="cardinner"
                      onClick={() => tracksHandler(item.id)}
                    >
                      <img src={item.image} alt="" className="cardImg" />
                      <div className="name">{item.name.slice(0, 40)}...</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {topData && (
            <div className="card">
              <div className="title" style={{ marginBottom: 20 }}>
                {userInfo.userName}'s Top Tracks
              </div>
              <div className="cardouter">
                {topData.map((item, index) => (
                  <div
                    className="cardinner"
                    onClick={() =>
                      playTrack(
                        item.id,
                        item.name,
                        item.artists,
                        item.image,
                        item.context_uri,
                        item.track_number
                      )
                    }
                  >
                    <img src={item.image} alt="" className="cardImg" />
                    <img src={images.playIcon} alt="" className="playicon" />
                    <div className="name">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 20px;
  height: 100%;
  overflow-y: scroll;
  margin-bottom: 20vh;
  ::-webkit-scrollbar {
    width: 0px;
    &-thumb {
      background-color: transparent;
    }
  }
  .bottomContainer {
    background-color: #1f1e1e;
    border-radius: 20px;
    padding: 10px;
    color: white;
    margin-top: 10px;
  }
  .inputField {
    background-color: white;
    border-radius: 30px;
    padding: 5px;
    width: 40%;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 20px;
    position: absolute;
    margin-left: 10vw;
    margin-top: 20px;
    input {
      padding: 10px;
      align-self: center;
      border-radius: 20px;
      border-width: 0;
      margin-left: 10px;
      border-color: white;
      width: 75%;
      &:focus {
        outline: none;
      }
    }
  }

  .searchImg {
    height: 15px;
  }
  .button {
    border-radius: 10px;
    background-color: black;
    color: white;
    font-size: 14px;
    padding: 8px;
    float: right;
    border: none;
    :hover {
      cursor: pointer;
    }
  }
  .buttonDisabled {
    border-radius: 10px;
    background-color: grey;
    color: white;
    font-size: 14px;
    padding: 8px;
    float: right;
    border: none;
    :hover {
      cursor: pointer;
    }
  }
  .artists {
    font-size: 13px;
    color: silver;
  }
  .cardouter {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .cardinner {
    width: 14vw;
    background-color: #1b1919;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    :hover {
      cursor: pointer;
      background-color: #383737;
    }
  }
  .cardImg {
    height: 30vh;
    width: 32vh;
    border-radius: 10px;
  }
  .name {
    color: white;
    font-size: 14px;
    font-weight: 600;
    padding: 10px;
    height: 30px;
    margin-top: 20px;
  }
  .artists {
    color: silver;
    font-size: 12px;
    padding: 10px;
  }
  .card {
    gap: 20px;
    margin-top: 100px;
    overflow-x: auto;
    ::-webkit-scrollbar {
      width: 0px;
      &-thumb {
        background-color: transparent;
      }
    }
  }
  .title {
    color: white;
    font-weight: 600;
    font-size: 25px;
    overflow: hidden;
    margin-left: 10px;
    margin-top: 10px;
  }
  .playicon {
    height: 35px;
    width: 35px;
    margin-top: -100px;
  }
`;
