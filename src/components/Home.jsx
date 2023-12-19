import React, { useEffect, useState,CSSProperties } from "react";
import styled from "styled-components";
import axios from "axios";
import { reducerCases } from "../utils/constants";
import { useStateProvider } from "../utils/StateProvider";
import { Link } from "react-router-dom";
import Modal from "./Modal";

export default function Home(props) {
  const [{ token }, dispatch] = useStateProvider();

  // const [releaseData, setReleaseData] = useState([]);
  const [toplists, setToplists] = useState([]);
  const [punjabi, setPunjabi] = useState([]);
  const [pop, setPop] = useState([]);
  const [romance, setRomance] = useState([]);
  const [summer, setSummer] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    // const NewRelease = async () => {
    //   const response = await axios.get(
    //     "https://api.spotify.com/v1/browse/new-releases",
    //     {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   let { items } = response.data.albums;
    //   const releaseData = items.map((item) => ({
    //     id: item.id,
    //     name: item.name,
    //     image: item.images[0].url,
    //     artist: item.artists.map((data) => data.name),
    //     albumUri: item.href,
    //   }));
    //   setReleaseData(releaseData);
    // };

    const topLists = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/categories/toplists/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const { items } = response.data.playlists;

      const topListsData = items.map((data) => ({
        id: data.id,
        name: data.name,
        href: data.href,
        image: data.images[0].url,
        tracksUrl: data.tracks.href,
      }));
      setToplists(topListsData);
    };

    const punjabi = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFKSopHMaeIeI/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const { items } = response.data.playlists;

      const punjabiData = items.map((data) => ({
        id: data.id,
        name: data.name,
        href: data.href,
        image: data.images[0].url,
        tracksUrl: data.tracks.href,
      }));
      setPunjabi(punjabiData);
    };
    const pop = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFEC4WFtoNRpw/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const { items } = response.data.playlists;

      const pop = items.map((data) => ({
        id: data.id,
        name: data.name,
        href: data.href,
        image: data.images[0].url,
        tracksUrl: data.tracks.href,
      }));
      setPop(pop);
    };
    const romance = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFAUsdyVjCQuL/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const { items } = response.data.playlists;

      const romance = items.map((data) => ({
        id: data.id,
        name: data.name,
        href: data.href,
        image: data.images[0].url,
        tracksUrl: data.tracks.href,
      }));
      setRomance(romance);
    };
    const summer = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const { items } = response.data.playlists;

      const summer = items.map((data) => ({
        id: data.id,
        name: data.name,
        href: data.href,
        image: data.images[0].url,
        tracksUrl: data.tracks.href,
      }));
      setSummer(summer);
      setLoading(false)
    };
    topLists();
    punjabi();
    pop();
    romance();
    summer();
  }, []);

  const tracksHandler = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <Container>
      {/* {releaseData && (
        <>
          <div className="title">New Release</div>
          <div className="card">
            <div className="cardouter">
              {releaseData.map((item, index) => (
                <Link to="/body" key={item.id}>
                  <div
                    className="cardinner"
                    onClick={() => tracksHandler(item.id)}
                  >
                    <img src={item.image} alt="" className="cardImg" />
                    <div className="name">{item.name}</div>
                    <div className="artists">{item.artist.join(", ")}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )} */}
      <Modal isLoading={loading} />
      {toplists && (
        <>
          <div className="title">TopLists</div>
          <div className="card">
            <div className="cardouter">
              {toplists.map((item, index) => (
                <Link to="/body" key={item.id} style={{ textDecoration: "none" }}>
                  <div
                    className="cardinner"
                    onClick={() => tracksHandler(item.id)}
                  >
                    <img src={item.image} alt="" className="cardImg" />
                    <div className="name">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      {punjabi && (
        <>
          <div className="title">Punjabi Hits</div>
          <div className="card">
            <div className="cardouter">
              {punjabi.map((item, index) => (
                <Link to="/body" key={item.id} style={{ textDecoration: "none" }}>
                  <div
                    className="cardinner"
                    onClick={() => tracksHandler(item.id)}
                  >
                    <img src={item.image} alt="" className="cardImg" />
                    <div className="name">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      {pop && (
        <>
          <div className="title">Pop</div>
          <div className="card">
            <div className="cardouter">
              {pop.map((item, index) => (
                <Link to="/body" key={item.id} style={{ textDecoration: "none" }}>
                  <div
                    className="cardinner"
                    onClick={() => tracksHandler(item.id)}
                  >
                    <img src={item.image} alt="" className="cardImg" />
                    <div className="name">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      {romance && (
        <>
          <div className="title">Romance</div>
          <div className="card">
            <div className="cardouter">
              {romance.map((item, index) => (
                <Link to="/body" key={item.id} style={{ textDecoration: "none" }}>
                  <div
                    className="cardinner"
                    onClick={() => tracksHandler(item.id)}
                  >
                    <img src={item.image} alt="" className="cardImg" />
                    <div className="name">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      {summer && (
        <>
          <div className="title">Summer</div>
          <div className="card">
            <div className="cardouter">
              {summer.map((item, index) => (
                <Link to="/body" key={item.id}style={{ textDecoration: "none" }}>
                  <div
                    className="cardinner"
                    onClick={() => tracksHandler(item.id)}
                  >
                    <img src={item.image} alt="" className="cardImg" />
                    <div className="name">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
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
  .cardouter {
    display: flex;
    flex-direction: row;
  }
  .cardinner {
    background-color: black;
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
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 20px;
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
`;
