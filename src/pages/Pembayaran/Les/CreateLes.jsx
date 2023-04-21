import { Alert, Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { checkLes, create_Les } from "../../Database/database";
import { buttonSX } from "../../../buttonsx";
import Header from "../../../component/Header";
import {
  create_siswa_les_by_id_siswa,
  getBulanbyIdSiswa,
} from "../../../Database/Les/dbles";
import CheckboxBulan from "../../../component/CheckboxBulan";
const CreateLes = () => {
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [BulanLes, setBulanLes] = useState(bulan);
  const [BulanLes2, setBulanLes2] = useState([]);
  const [Bulan, setBulan] = useState([]);
  const [reseter, setReseter] = useState(0);
  const params = useParams();
  useEffect(() => {
    // console.log(params.id_siswa);
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  useEffect(() => {
    const getbulansiswa = async () => {
      const bulanlessiswa = await getBulanbyIdSiswa(params.id_siswa);
      setBulan(bulanlessiswa.map((item) => item.bulan));
    };
    getbulansiswa();
  }, [params]);
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < BulanLes.length; i++) {
      if (!Bulan.includes(BulanLes[i])) {
        temp.push(BulanLes[i]);
      }
    }

    setBulanLes2(temp);
  }, [reseter]);
  useEffect(() => {
    setReseter(reseter + 1);
  }, [Bulan]);
  const handleTambahLes = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = {
      les: data.get("Les"),
    };

    for (let i = 0; i < BulanLes.length; i++) {
      await create_siswa_les_by_id_siswa(
        params.id_siswa,
        BulanLes[i],
        formdata
      );
    }
    navigate("/Pembayaran/les/" + params.id_siswa, {
      state: { value: true },
    });
  };

  const handleLes = (getBulan) => {
    const temp = [];
    for (let index = 0; index < getBulan.length; index++) {
      if (!getBulan[index].includes("-")) {
        temp.push(getBulan[index]);
      }
    }
    setBulanLes(temp);
  };
  return (
    <Box>
      <Header title="Tambah Les" />
      <Box sx={{ width: "75%" }} margin="0 auto 0 auto">
        {isError && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Nama Les pada tingkat tersebut sudah ada
          </Alert>
        )}
        {BulanLes2.length == 0 && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Pembayaran Les sudah ada pada semua bulan
          </Alert>
        )}
        {BulanLes2.length == 0 ? null : (
          <form id="form" onSubmit={handleTambahLes}>
            <CheckboxBulan
              jenis={"Les"}
              fungsi={handleLes}
              bulan={BulanLes2}
              do={true}
            />
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={"2rem"}
            >
              <Button sx={buttonSX} type="submit">
                Tambah Les
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default CreateLes;
