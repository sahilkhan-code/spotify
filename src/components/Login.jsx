import React from "react";
import styled from "styled-components";

export default function Login() {
  const loginHandler = () => {
    let clientId = "3980a8c6c5ba4feba48b4c9c8f677ac1";
    let redirectUrl = "http://localhost:3000/";
    let apiUrl = "https://accounts.spotify.com/authorize/";
    let scope = [
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-read-email",
      "user-read-private",
      "user-read-playback-position",
      "user-top-read",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialogue=true`;
  };

  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify"
      />
      <button onClick={() => loginHandler()}>Connect</button>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: green;
  height: 100vh;
  img {
    height: 30vh;
    width: 100vh;
  }
  button {
    width: 50vh;
    height: 8vh;
    background-color: black;
    border-radius: 10vh;
    color: #c7bfbf;
    font-size: 20px;
    margin-top: 20px;
    border-width: 0px;
    :hover {
      color: white;
    }
  }
`;
