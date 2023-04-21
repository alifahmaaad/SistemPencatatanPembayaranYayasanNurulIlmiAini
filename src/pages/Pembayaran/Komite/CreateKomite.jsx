import { Alert, Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { checkKomite, create_Komite } from "../../Database/database";
import { buttonSX } from "../../../buttonsx";
import Header from "../../../component/Header";
import {
  create_siswa_komite_by_id_siswa,
  getBulanbyIdSiswa,
} from "../../../Database/Komite/dbkomite";
import CheckboxBulan from "../../../component/CheckboxBulan";
const CreateKomite = () => {
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
  const [BulanKomite, setBulanKomite] = useState(bulan);
  const [BulanKomite2, setBulanKomite2] = useState([]);
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
      const bulankomitesiswa = await getBulanbyIdSiswa(params.id_siswa);
      setBulan(bulankomitesiswa.map((item) => item.bulan));
    };
    getbulansiswa();
  }, [params]);
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < BulanKomite.length; i++) {
      if (!Bulan.includes(BulanKomite[i])) {
        temp.push(BulanKomite[i]);
      }
    }

    setBulanKomite2(temp);
  }, [reseter]);
  useEffect(() => {
    setReseter(reseter + 1);
  }, [Bulan]);
  const handleTambahKomite = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = {
      komite: data.get("Komite"),
    };

    for (let i = 0; i < BulanKomite.length; i++) {
      await create_siswa_komite_by_id_siswa(
        params.id_siswa,
        BulanKomite[i],
        formdata
      );
    }
    navigate("/Pembayaran/komite/" + params.id_siswa, {
      state: { value: true },
    });
  };

  const handleKomite = (getBulan) => {
    const temp = [];
    for (let index = 0; index < getBulan.length; index++) {
      if (!getBulan[index].includes("-")) {
        temp.push(getBulan[index]);
      }
    }
    setBulanKomite(temp);
  };
  return (
    <Box>
      <Header title="Tambah Komite" />
      <Box sx={{ width: "75%" }} margin="0 auto 0 auto">
        {isError && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Nama Komite pada tingkat tersebut sudah ada
          </Alert>
        )}
        {BulanKomite2.length == 0 && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Pembayaran Komite sudah ada pada semua bulan
          </Alert>
        )}
        {BulanKomite2.length == 0 ? null : (
          <form id="form" onSubmit={handleTambahKomite}>
            <CheckboxBulan
              jenis={"Komite"}
              fungsi={handleKomite}
              bulan={BulanKomite2}
              do={true}
            />
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={"2rem"}
            >
              <Button sx={buttonSX} type="submit">
                Tambah Komite
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default CreateKomite;
