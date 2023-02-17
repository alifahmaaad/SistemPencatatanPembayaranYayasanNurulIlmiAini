import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import WifiLockIcon from "@mui/icons-material/WifiLock";

const Home = () => {
  return (
    <div>
      <div>Dashboard</div>
      <IconButton>
        <WifiLockIcon></WifiLockIcon>
      </IconButton>
    </div>
  );
};

export default Home;
