import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Login.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { login, role } from "../Redux/Reducer/Reducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buttonSX } from "../buttonsx";
import { checkUsername, loginaccount } from "../Database/database";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  const isSetup = useSelector((state) => state.isSetup);
  const [isError, setIsError] = useState(false);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = {
      username: data.get("username"),
      password: data.get("password"),
    };
    if ((await checkUsername(formdata.username)) > 0) {
      const logincheck = await loginaccount(
        formdata.username,
        formdata.password
      );
      if (logincheck[0]) {
        dispatch(login(true));
        setIsError(false);
        role(logincheck[1]);
      } else {
        setIsError(true);
      }
    } else {
      setIsError(true);
    }
  };
  useEffect(() => {
    if (isLogin) {
      navigate("/kelas");
    }
    if (!isSetup) {
      navigate("/");
    }
  }, [isLogin, isSetup]);
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
              {isError && (
                <Alert severity="error" sx={{ marginBottom: "1rem" }}>
                  Username atau Password Salah
                </Alert>
              )}
              <form onSubmit={handleSubmitLogin}>
                <TextField
                  id="input username"
                  name="username"
                  required
                  label="Username"
                  error={isError}
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
                <br />
                <TextField
                  id="input password"
                  required
                  label="Password"
                  error={isError}
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
                <br />
                <br />
                <Button sx={buttonSX} fullWidth={true} type="submit">
                  LOGIN
                </Button>
              </form>
              <div style={{ paddingTop: "1rem" }}>
                <b>demo Account</b>
                <div>username : demo</div>
                <div>dipassword : demo</div>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
