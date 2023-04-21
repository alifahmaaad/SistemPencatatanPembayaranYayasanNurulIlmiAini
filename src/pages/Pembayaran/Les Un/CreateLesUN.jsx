import { Alert, Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { checkLesUN, create_LesUN } from "../../Database/database";
import { buttonSX } from "../../../buttonsx";
import Header from "../../../component/Header";
import {
  create_siswa_lesun_by_id_siswa,
  getBulanbyIdSiswa,
} from "../../../Database/lesun/dblesun";
import CheckboxBulan from "../../../component/CheckboxBulan";
const CreateLesUN = () => {
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
  const [BulanLesUN, setBulanLesUN] = useState(bulan);
  const [BulanLesUN2, setBulanLesUN2] = useState([]);
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
      const bulanlesunsiswa = await getBulanbyIdSiswa(params.id_siswa);
      setBulan(bulanlesunsiswa.map((item) => item.bulan));
    };
    getbulansiswa();
  }, [params]);
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < BulanLesUN.length; i++) {
      if (!Bulan.includes(BulanLesUN[i])) {
        temp.push(BulanLesUN[i]);
      }
    }

    setBulanLesUN2(temp);
  }, [reseter]);
  useEffect(() => {
    setReseter(reseter + 1);
  }, [Bulan]);
  const handleTambahLesUN = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = {
      lesun: data.get("LesUN"),
    };

    for (let i = 0; i < BulanLesUN.length; i++) {
      await create_siswa_lesun_by_id_siswa(
        params.id_siswa,
        BulanLesUN[i],
        formdata
      );
    }
    navigate("/Pembayaran/lesun/" + params.id_siswa, {
      state: { value: true },
    });
  };

  const handleLesUN = (getBulan) => {
    const temp = [];
    for (let index = 0; index < getBulan.length; index++) {
      if (!getBulan[index].includes("-")) {
        temp.push(getBulan[index]);
      }
    }
    setBulanLesUN(temp);
  };
  return (
    <Box>
      <Header title="Tambah LesUN" />
      <Box sx={{ width: "75%" }} margin="0 auto 0 auto">
        {isError && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Nama LesUN pada tingkat tersebut sudah ada
          </Alert>
        )}
        {BulanLesUN2.length == 0 && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Pembayaran LesUN sudah ada pada semua bulan
          </Alert>
        )}
        {BulanLesUN2.length == 0 ? null : (
          <form id="form" onSubmit={handleTambahLesUN}>
            <CheckboxBulan
              jenis={"LesUN"}
              fungsi={handleLesUN}
              bulan={BulanLesUN2}
              do={true}
            />
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={"2rem"}
            >
              <Button sx={buttonSX} type="submit">
                Tambah LesUN
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default CreateLesUN;
