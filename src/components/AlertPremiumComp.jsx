import React from "react";
import { useStateProvider } from "../utils/StateProvider";

export default function AlertPremiumComp(props) {
  const [{alert }, dispatch] = useStateProvider();
  const { okHandler, isVisible } = props;

  console.log(alert,'lll')
  return alert ? (
    <div
      style={{
        borderRadius: 10,
        height: 100,
        width: 200,
        backgroundColor: "white",
        position: "absolute",
        textAlign: "center",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        justifySelf: "center",
        marginLeft: "25%",
        // marginTop: "5%",
        border: "1px solid black"
      }}
    >
      <div>Premium Required</div>
      <div style={{}}>
        <button
          style={{
            height: 30,
            width: 70,
            border: "none",
            backgroundColor: "lightblue",
            border:'1px solid black'
          }}
          onClick={() => okHandler()}
        >
          OK
        </button>
      </div>
    </div>
  ) : null;
}
