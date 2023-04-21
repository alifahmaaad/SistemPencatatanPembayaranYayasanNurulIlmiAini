import { Alert, Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { checkSpp, create_Spp } from "../../Database/database";
import { buttonSX } from "../../../buttonsx";
import Header from "../../../component/Header";
import {
  create_siswa_spp_by_id_siswa,
  getBulanbyIdSiswa,
} from "../../../Database/SPP/dbspp";
import CheckboxBulan from "../../../component/CheckboxBulan";
const CreateSpp = () => {
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
  const [BulanSPP, setBulanSPP] = useState(bulan);
  const [BulanSPP2, setBulanSPP2] = useState([]);
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
      const bulansppsiswa = await getBulanbyIdSiswa(params.id_siswa);
      setBulan(bulansppsiswa.map((item) => item.bulan));
    };
    getbulansiswa();
  }, [params]);
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < BulanSPP.length; i++) {
      if (!Bulan.includes(BulanSPP[i])) {
        temp.push(BulanSPP[i]);
      }
    }

    setBulanSPP2(temp);
  }, [reseter]);
  useEffect(() => {
    setReseter(reseter + 1);
  }, [Bulan]);
  const handleTambahSpp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = {
      spp: data.get("SPP"),
    };

    for (let i = 0; i < BulanSPP.length; i++) {
      await create_siswa_spp_by_id_siswa(
        params.id_siswa,
        BulanSPP[i],
        formdata
      );
    }
    navigate("/Pembayaran/spp/" + params.id_siswa, { state: { value: true } });
  };

  const handleSPP = (getBulan) => {
    const temp = [];
    for (let index = 0; index < getBulan.length; index++) {
      if (!getBulan[index].includes("-")) {
        temp.push(getBulan[index]);
      }
    }
    setBulanSPP(temp);
  };
  return (
    <Box>
      <Header title="Tambah Spp" />
      <Box sx={{ width: "75%" }} margin="0 auto 0 auto">
        {isError && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Nama Spp pada tingkat tersebut sudah ada
          </Alert>
        )}
        {BulanSPP2.length == 0 && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Pembayaran Spp sudah ada pada semua bulan
          </Alert>
        )}
        {BulanSPP2.length == 0 ? null : (
          <form id="form" onSubmit={handleTambahSpp}>
            <CheckboxBulan
              jenis={"SPP"}
              fungsi={handleSPP}
              bulan={BulanSPP2}
              do={true}
            />
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={"2rem"}
            >
              <Button sx={buttonSX} type="submit">
                Tambah Spp
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default CreateSpp;
