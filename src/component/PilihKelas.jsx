import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKelas } from "../Database/database";
const PilihKelas = ({ getIDkelas }) => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const [rows, setRow] = useState([]);
  useEffect(() => {
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  useEffect(() => {
    const getkelas = async () => {
      setRow(await getKelas(0));
    };
    getkelas();
  }, []);
  return (
    <Box margin="0 auto 0 auto" width={"95%"}>
      <TextField
        id="pilih_kelas"
        name="pilih_kelas"
        select
        required
        disabled={rows.length == 0 ? true : false}
        fullWidth={true}
        label="Pilih Kelas"
        defaultValue=""
        variant="standard"
        size="small"
        onChange={(event) => {
          getIDkelas(event.target.value);
        }}
      >
        {rows?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <b>({option.tingkat})</b>&nbsp;
            {option.kelas}
          </MenuItem>
        ))}
      </TextField>
      {rows.length == 0 && (
        <Alert
          sx={{
            width: "75%",
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: "2rem",
          }}
          severity="error"
        >
          Tidak terdapat kelas , Tambahkan/Buat kelas pada menu DAFTAR KELAS
        </Alert>
      )}
    </Box>
  );
};

export default PilihKelas;
