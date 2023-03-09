import { Box, Grid, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import "../Login.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buttonSX } from "../buttonsx";
import {
  CreateAllTable,
  makeAdminAccount,
  makeDevAccount,
} from "../Database/database";
import { setupdb } from "../Redux/Reducer/Reducer";

const Setup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSetup = useSelector((state) => state.isSetup);
  const handlesetup = async () => {
    if (localStorage.getItem("setup") == null) {
      localStorage.setItem("setup", false);
    }
    CreateAllTable();
    makeAdminAccount();
    makeDevAccount();
    dispatch(setupdb(true));
    navigate("/Login");
  };
  useEffect(() => {
    if (isSetup) {
      navigate("/Login");
    }
  }, [isSetup]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={6} height={"100vh"}>
          <Box
            id="kanan"
            display={"Flex"}
            height={"100vh"}
            alignItems={"Center"}
            justifyContent={"center"}
          >
            <Box>
              <Typography
                align="center"
                paddingBottom={"0.5rem"}
                fontSize={"35px"}
                fontWeight={"bold"}
                id="logintitle"
              >
                Welcome to the app
              </Typography>
              <Button sx={buttonSX} fullWidth={true} onClick={handlesetup}>
                Next
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} height={"100vh"}>
          <Box
            id="kiri"
            display={"Flex"}
            height={"100vh"}
            justifyContent={"center"}
            flexDirection={"column"}
            padding={"0 0 0 5rem"}
          >
            <Typography fontSize={"14px"} fontWeight={"bold"} color={"white"}>
              Welcome to
            </Typography>
            <Typography fontSize={"24px"} color={"white"}>
              Sistem Pencatatan Keuangan
            </Typography>
            <Typography
              id="nameside"
              fontWeight={"bold"}
              color={"white"}
              fontSize={"48px"}
              paddingBottom={"15rem"}
            >
              Yayasan <br /> Nurul Ilmi Aini
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Setup;
