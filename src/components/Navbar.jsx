import React, { useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import images from "./images";
import { useStateProvider } from "../utils/StateProvider";

export default function Navbar() {
  const [{ userInfo }] = useStateProvider();

  return (
    <Container>
      {/* <div className="inputField">
        <img className="searchImg" src={images.search} alt="search" />
        <input type="text" placeholder="Artists, Songs, Podcasts" />
      </div> */}
      <div className="profile">
        <div className="username">{userInfo?.userName}</div>
        <img className="profileimg" src={images.profile} alt="profileImg" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 5vh;
  .inputField {
    background-color: white;
    border-radius: 30px;
    padding: 10px;
    input {
      border-radius: 20px;
      border-width: 0;
      height: 4vh;
      width: 20vw;
      margin-left: 10px;
      border-color: white;
      &:focus {
        outline: none;
      }
    }
  }
  .profile {
    display: flex;
    flex-direction: row;
    background-color: black;
    font-size: 15px;
    font-weight: 500;
    width: 9vw;
    justify-content: space-between;
    border-radius: 30px;
    align-items: center;
    float: right;
    padding: 10px;
    color: white;
  }
  .profileimg {
    height: 25px;
  }
  .searchImg {
    height: 15px;
  }
`;
