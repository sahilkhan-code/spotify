import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Body from "../components/Body";
import Footer from "../components/Footer";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/constants";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";
import Home from "./Home";
import Search from "./Search";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

export default function Spot() {
  const [{ token, userInfo }, dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () => {
      let { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      let userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USERINFO, userInfo });
    };
    getUserInfo();
  }, [token, dispatch]);
  return (
    <Router>
      <Container>
        <div className="spotify_body">
          <ContainerSidebar>
            <div className="top_links">
              <div className="logo">
                <img
                  src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
                  alt="spotify"
                />
              </div>
              <ul>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li>
                    <MdHomeFilled />
                    <span>Home</span>
                  </li>
                </Link>
                <Link to="/search" style={{ textDecoration: "none" }}>
                  <li>
                    <MdSearch />
                    <span>Search</span>
                  </li>
                </Link>
              </ul>
            </div>
            <Playlists />
          </ContainerSidebar>
          <div className="body">
            <div className="body_contents">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/body" element={<Body />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </div>
          </div>
        </div>
        <div className="spotify_footer">
          <Footer />
        </div>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  max-height: 100vh;
  max-width: 120vw;
  overflow: hidden;
  display: grid;
  grid-template-rows: 87vh 13vh;
  .spotify_body {
    display: grid;
    grid-template-columns: 20vw 80vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    /* background-color: rgb(32, 87, 100); */
    background-color: black;

    .body {
      height: 100%;
      overflow: auto;
      /* margin-top: 5%; */
    }
  }
  .body {
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 10px;
      }
    }
    width: 100%;
  }
  .spotify_footer {
    /* height: 100%; */
    background-color: black;
    border-top: solid white 1px;
  }
  .body_contents {
  }
`;

const ContainerSidebar = styled.div`
  background-color: black;
  color: black;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 10px;

  img {
    height: 7%.5;
    width: 25.5vh;
    margin-top: 25px;
    margin-left: 20px;
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    text-decoration: none;
    background-color: white;
    margin: 6px;
    border-radius: 10px;
    height: 11vh;

    li {
      text-decoration: "none";
      color: black;
      text-decoration: none;
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0ms.3 ease-in-out;
      &:hover {
        color: black;
        font-size: 17px;
        font-weight: bold;
      }
    }
  }
`;
