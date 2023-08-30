import { Alert, Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { checkQurban, create_Qurban } from "../../Database/database";
import { buttonSX } from "../../../buttonsx";
import Header from "../../../component/Header";
import {
  create_siswa_qurban_by_id_siswa,
  getBulanbyIdSiswa,
} from "../../../Database/qurban/dbqurban";
import CheckboxBulan from "../../../component/CheckboxBulan";
const CreateQurban = () => {
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
  const [BulanQurban, setBulanQurban] = useState(bulan);
  const [BulanQurban2, setBulanQurban2] = useState([]);
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
      const bulanqurbansiswa = await getBulanbyIdSiswa(params.id_siswa);
      setBulan(bulanqurbansiswa.map((item) => item.bulan));
    };
    getbulansiswa();
  }, [params]);
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < BulanQurban.length; i++) {
      if (!Bulan.includes(BulanQurban[i])) {
        temp.push(BulanQurban[i]);
      }
    }

    setBulanQurban2(temp);
  }, [reseter]);
  useEffect(() => {
    setReseter(reseter + 1);
  }, [Bulan]);
  const handleTambahQurban = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = {
      qurban: data.get("Qurban"),
    };

    for (let i = 0; i < BulanQurban.length; i++) {
      await create_siswa_qurban_by_id_siswa(
        params.id_siswa,
        BulanQurban[i],
        formdata
      );
    }
    navigate("/Pembayaran/qurban/" + params.id_siswa, {
      state: { value: true },
    });
  };

  const handleQurban = (getBulan) => {
    const temp = [];
    for (let index = 0; index < getBulan.length; index++) {
      if (!getBulan[index].includes("-")) {
        temp.push(getBulan[index]);
      }
    }
    setBulanQurban(temp);
  };
  return (
    <Box>
      <Header title="Tambah Qurban" />
      <Box sx={{ width: "75%" }} margin="0 auto 0 auto">
        {isError && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Nama Qurban pada tingkat tersebut sudah ada
          </Alert>
        )}
        {BulanQurban2.length == 0 && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Pembayaran Qurban sudah ada pada semua bulan
          </Alert>
        )}
        {BulanQurban2.length == 0 ? null : (
          <form id="form" onSubmit={handleTambahQurban}>
            <CheckboxBulan
              jenis={"Qurban"}
              fungsi={handleQurban}
              bulan={BulanQurban2}
              do={true}
            />
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={"2rem"}
            >
              <Button sx={buttonSX} type="submit">
                Tambah Qurban
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default CreateQurban;
