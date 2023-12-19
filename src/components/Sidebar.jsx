import React from "react";
import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Container>
      <div className="top_links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify"
          />
        </div>
        <ul>
          <li>
          <MdHomeFilled />
            <span>
              Home
            </span>
          </li>
          <Link to="/search">
          <li>
          <MdSearch />
            <span>
              Search
            </span>
          </li>
          </Link>
          <li>
          <IoLibrary />
            <span>
              Library
            </span>
          </li>
        </ul>
      </div>
      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  img {
    height: 8vh;
    width: 25.5vh;
    margin-top: 25px;
    margin-left: 20px;
  }
  
  ul{
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    li {
    display: flex;
    gap: 1rem;
    cursor: pointer;
    transition: 0ms.3 ease-in-out;
    &:hover{
   color: white;
    }
  }
  }
 
`;
