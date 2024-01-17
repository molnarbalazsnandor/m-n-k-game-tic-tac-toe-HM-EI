import React from "react";
import { Grid } from "@mui/material/";

function Square({ value, onSquareClick }) {
  return (
    <Grid item className="grid-item" onClick={onSquareClick}>
      {value && (
        <img
          src={require(`../images/tokens/${value}`)}
          alt={value}
          className="square-token"
        />
      )}
    </Grid>
  );
}

export default Square;
