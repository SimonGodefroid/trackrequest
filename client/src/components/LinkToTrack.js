import React from "react";
import { Link } from "react-router-dom";
const LinkToTrack = props => (
  <Link
    to={`/request/${props.id}`}
    style={{
      border: "1px solid black",
      display: "inline-block",
      height: "200%",
      width: "100%",
      padding: "40px",
      color:'white',
    }}
  >
    {props.text}
  </Link>
);
export default LinkToTrack;
