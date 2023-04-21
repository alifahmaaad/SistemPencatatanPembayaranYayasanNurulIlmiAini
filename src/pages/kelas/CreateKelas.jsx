import { Alert, Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buttonSX } from "../../buttonsx";
import Header from "../../component/Header";
import { checkKelas, create_kelas } from "../../Database/database";
const CreateKelas = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  const handleTambahKelas = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = {
      tingkat: data.get("tingkat_kelas"),
      nama: data.get("nama_kelas"),
    };
    if ((await checkKelas(formdata.tingkat, formdata.nama)) > 0) {
      setIsError(true);
    } else {
      await create_kelas(formdata.tingkat, formdata.nama, 0);
      navigate("/kelas", { state: { value: true } });
    }
  };
  const Tingkat = [
    {
      value: "TK",
    },
    {
      value: "SD",
    },
    {
      value: "SMP",
    },
  ];
  return (
    <Box>
      <Header title="Tambah Kelas" />
      <Box sx={{ width: "75%" }} margin="0 auto 0 auto">
        {isError && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Nama Kelas pada tingkat tersebut sudah ada
          </Alert>
        )}
        <form id="form" onSubmit={handleTambahKelas}>
          <TextField
            id="input nama_kelas"
            name="nama_kelas"
            required
            label="Nama Kelas"
            variant="standard"
            fullWidth={true}
          />
          <br />
          <br />
          <TextField
            id="tingkat_kelas"
            name="tingkat_kelas"
            select
            required
            fullWidth={true}
            label="Tingkat Sekolah"
            defaultValue="SMP"
            variant="standard"
          >
            {Tingkat?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

          <Box display={"flex"} justifyContent={"flex-end"} marginTop={"2rem"}>
            <Button sx={buttonSX} type="submit">
              Tambah kelas
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateKelas;
