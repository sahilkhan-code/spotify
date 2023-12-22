import React, { useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/constants";

export const AlertComp = (props) => {
  const { title, isVisible, okHandler } = props;
  const [{ token }, dispatch] = useStateProvider();
  const buttonHandler = () => {
    // window.open("https://developer.spotify.com/", "_blank");
    okHandler();
    dispatch({ type: reducerCases.SET_TOKEN, token:null });
    window.location.href = null
  };
  return isVisible ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "white",
        fontSize: 18,
        height: "30%",
        width: "30%",
        borderRadius: 10,
        justifySelf: "center",
        textAlign: "center",
        padding: 10,
        marginTop: "7%",
        border:'1px solid black'
      }}
    >
      {title}
      <button
        onClick={() => {
          buttonHandler();
        }}
        className="button"
        style={{
          backgroundColor: "lightblue",
          border: "none",
          height: 30,
          width: 100,
          alignSelf: "center",
          marginTop: "20%",
          border:'1px solid black'
        }}
      >
        OK
      </button>
    </div>
  ) : null;
};
