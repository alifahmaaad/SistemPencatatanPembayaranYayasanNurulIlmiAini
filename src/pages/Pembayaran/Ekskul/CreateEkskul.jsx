import { Alert, Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { checkEkskul, create_Ekskul } from "../../Database/database";
import { buttonSX } from "../../../buttonsx";
import Header from "../../../component/Header";
import {
  create_siswa_ekskul_by_id_siswa,
  getBulanbyIdSiswa,
} from "../../../Database/ekskul/dbekskul";
import CheckboxBulan from "../../../component/CheckboxBulan";
const CreateEkskul = () => {
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
  const [BulanEkskul, setBulanEkskul] = useState(bulan);
  const [BulanEkskul2, setBulanEkskul2] = useState([]);
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
      const bulanekskulsiswa = await getBulanbyIdSiswa(params.id_siswa);
      setBulan(bulanekskulsiswa.map((item) => item.bulan));
    };
    getbulansiswa();
  }, [params]);
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < BulanEkskul.length; i++) {
      if (!Bulan.includes(BulanEkskul[i])) {
        temp.push(BulanEkskul[i]);
      }
    }

    setBulanEkskul2(temp);
  }, [reseter]);
  useEffect(() => {
    setReseter(reseter + 1);
  }, [Bulan]);
  const handleTambahEkskul = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = {
      ekskul: data.get("Ekskul"),
    };

    for (let i = 0; i < BulanEkskul.length; i++) {
      await create_siswa_ekskul_by_id_siswa(
        params.id_siswa,
        BulanEkskul[i],
        formdata
      );
    }
    navigate("/Pembayaran/ekskul/" + params.id_siswa, {
      state: { value: true },
    });
  };

  const handleEkskul = (getBulan) => {
    const temp = [];
    for (let index = 0; index < getBulan.length; index++) {
      if (!getBulan[index].includes("-")) {
        temp.push(getBulan[index]);
      }
    }
    setBulanEkskul(temp);
  };
  return (
    <Box>
      <Header title="Tambah Ekskul" />
      <Box sx={{ width: "75%" }} margin="0 auto 0 auto">
        {isError && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Nama Ekskul pada tingkat tersebut sudah ada
          </Alert>
        )}
        {BulanEkskul2.length == 0 && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Pembayaran Ekskul sudah ada pada semua bulan
          </Alert>
        )}
        {BulanEkskul2.length == 0 ? null : (
          <form id="form" onSubmit={handleTambahEkskul}>
            <CheckboxBulan
              jenis={"Ekskul"}
              fungsi={handleEkskul}
              bulan={BulanEkskul2}
              do={true}
            />
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={"2rem"}
            >
              <Button sx={buttonSX} type="submit">
                Tambah Ekskul
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default CreateEkskul;
