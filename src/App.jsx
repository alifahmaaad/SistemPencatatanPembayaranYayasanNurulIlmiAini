import { Route, Routes, BrowserRouter, redirect } from "react-router-dom";
import DataSiswa from "./pages/Siswa/DataSiswa";
import "./index.css";
import SidebarComponent from "./component/SidebarComponent";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.status);

  return (
    <BrowserRouter>
      <div id="app">
        {isLogin ? <SidebarComponent /> : null}

        <Box
          sx={{
            width: "100%",
            padding: isLogin ? "3rem 1rem" : "0",
          }}
        >
          <Routes>
            <Route path="/" element={<DataSiswa />} />
            <Route path="/Login" element={<Login />} />
            {/* <Route path="/" element={<Login />} /> */}
          </Routes>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
