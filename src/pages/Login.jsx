import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import "../Login.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { login } from "../Redux/Reducer/Reducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import buttonSX from "../buttonsx";

const Login = () => {
  const navigate = useNavigate();
  const count = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const onSubmitjj = (event) => {
    console.log(event.target[0].value);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("username"),
      password: data.get("password"),
    });
    dispatch(login());
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={6} height={"100vh"}>
          <Box
            id="kiri"
            display={"Flex"}
            height={"100vh"}
            // alignItems={"Center"}
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
                Login
              </Typography>
              <form onSubmit={onSubmitjj}>
                <TextField
                  id="input username"
                  name="username"
                  required
                  label="Username"
                  // error="true"
                  // helperText="Name is required"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <br />
                <TextField
                  id="input password"
                  required
                  label="Password"
                  name="password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                {/* <Button sx={buttonSX} onClick={() => dispatch(login("ayam"))}>
                LOGIN
              </Button> */}
                <br />
                <br />
                <Button sx={buttonSX} fullWidth={true} type="submit">
                  LOGIN
                </Button>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
