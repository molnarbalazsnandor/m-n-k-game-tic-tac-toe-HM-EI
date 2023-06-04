import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material/";

function Square({ value, onSquareClick }) {
  return (
    <Grid item className="grid-item" onClick={onSquareClick}>
      {value && (
        <img
          src={require(`../images/tokens/${value}`)}
          alt={`Image ${value}`}
          className="square-token"
        />
      )}
    </Grid>
  );
}

export default Square;
