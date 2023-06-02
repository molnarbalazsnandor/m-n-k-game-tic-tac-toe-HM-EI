import React, { useEffect, useState } from "react";
import "./Square.css";
import { Button, Grid } from "@mui/material/";

function Square({ value, onSquareClick }) {
  return (
    <Grid item>
      <Button className="square" onClick={onSquareClick} variant="contained">
        {value && (
          <img
            src={require(`../images/${value}`)}
            alt={`Image ${value}`}
            style={{ width: "30px" }}
          />
        )}
      </Button>
    </Grid>
  );
}

export default Square;
