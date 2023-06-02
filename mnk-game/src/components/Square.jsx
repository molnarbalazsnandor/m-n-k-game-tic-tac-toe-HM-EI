import React, { useEffect, useState } from "react";
import "./Square.css";
import { Button, Grid } from "@mui/material/";

function Square({ value, onSquareClick }) {
  return (
    <Grid item>
      <Button
        className="square"
        onClick={onSquareClick}
        variant="contained"
      >
        {value}
      </Button>
    </Grid>
  );
}

export default Square;
