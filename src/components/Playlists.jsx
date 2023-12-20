import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoLibrary } from "react-icons/io5";

export default function Playlists() {
  const [{ token, playlists, selectedPlaylistId, userInfo }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map((name, id) => {
        return { name, id };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);

  const playlistHandler = (index) => {
    const selectedPlaylistId = playlists[index].name.id;
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <Container>
      {playlists && (
        <ul>
          <div style={{marginLeft:20,marginTop:20}}>
            <IoLibrary />
            <span style={{ marginLeft: 13 }}>Your Library</span>
          </div>
          {playlists.map(({ name, id }, index) => (
            <Link to="/body" style={{ textDecoration: "none" }}>
              <li onClick={() => playlistHandler(index)} key={id}>
                <div className="play">
                  <img
                    src={name.images[0].url}
                    alt="img"
                    style={{ width: 40, height: 40, borderRadius: 5 }}
                  />
                  <div
                    style={{ color: "white", marginTop: 22, marginLeft: 10 }}
                  >
                    <div className="name">{name.name}</div>
                    <div className="user">Playlist : {userInfo?.userName}</div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  ul {
    overflow: auto;
    height: 51vh !important;
    list-style: none;
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: silver;
        border-radius: 10px;
      }
    }
  }
  li {
    cursor: pointer;
    margin-top: 0px !important;
    &:hover {
      color: white;
    }
    height: 30px;
    margin-bottom: 10px;
  }
  .playImg {
    height: 40px;
    width: 40px;
    border-radius: 5px;
    margin-top: 0 px;
    padding-top: 0 px;
    margin-right: 10px;
  }
  .user {
    font-size: 14px;
    color: grey;
  }
  .play {
    display: flex;
    flex-direction: row;
  }
  .name{
    color: black;
  }
`;
