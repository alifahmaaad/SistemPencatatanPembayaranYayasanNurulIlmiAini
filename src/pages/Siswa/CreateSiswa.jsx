import { Alert, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buttonSX } from "../../buttonsx";
import CheckboxBulan from "../../component/CheckboxBulan";
import Header from "../../component/Header";
import {
  check_bfr_create_siswa,
  create_siswa,
  getKelasByid,
} from "../../Database/database";
import React from "react";
import FormatAngka from "../../component/FormatAngka";
import { create_siswa_spp } from "../../Database/SPP/dbspp";
import { create_siswa_komite } from "../../Database/Komite/dbkomite";
import { create_siswa_les } from "../../Database/Les/dbles";
import { create_siswa_lesUN } from "../../Database/lesun/dblesun";
import { create_siswa_ekskul } from "../../Database/ekskul/dbekskul";
import { create_siswa_Pendaftaran } from "../../Database/pendaftaran/dbpendaftaran";
import { create_siswa_Pendaftaran_ulang } from "../../Database/pendaftaranulang/dbpendaftaranulang";
import { create_siswa_buku } from "../../Database/buku/dbbuku";
import { create_siswa_pakaian } from "../../Database/pakaian/dbpakaian";
const CreateSiswa = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
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

  const [isError, setIsError] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [dataKelas, setDataKelas] = useState(bulan);
  const [BulanSPP, setBulanSPP] = useState(bulan);
  const [BulanKomite, setBulanKomite] = useState(bulan);
  const [BulanLes, setBulanLes] = useState(bulan);
  const [BulanLesUN, setBulanLesUN] = useState(bulan);
  const [BulanEkskul, setBulanEkskul] = useState(bulan);
  const handleSPP = (getBulan) => {
    const temp = [];
    for (let index = 0; index < getBulan.length; index++) {
      if (!getBulan[index].includes("-")) {
        temp.push(getBulan[index]);
      }
    }
    // console.log(temp);
    setBulanSPP(temp);
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
  const handleLes = (getBulan) => {
    const temp = [];
    for (let index = 0; index < getBulan.length; index++) {
      if (!getBulan[index].includes("-")) {
        temp.push(getBulan[index]);
      }
    }
    setBulanLes(temp);
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
  const handleEkskul = (getBulan) => {
    const temp = [];
    for (let index = 0; index < getBulan.length; index++) {
      if (!getBulan[index].includes("-")) {
        temp.push(getBulan[index]);
      }
    }
    setBulanEkskul(temp);
  };
  const handleTambahSiswa = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id_kelas = dataKelas[0].id;
    const formdata = {
      nama: data.get("nama_siswa"),
      nisn_no_absen: data.get("nisn_no_absen"),
      spp: data.get("SPP"),
      pendaftaran: data.get("pendaftaran"),
      pendaftaran_ulang: data.get("pendaftaran_ulang"),
      komite: data.get("Komite"),
      les: data.get("LES"),
      lesun: data.get("LES UN"),
      ekskul: data.get("Ekskul"),
      buku: data.get("buku"),
      pakaian: data.get("pakaian"),
    };
    const nilaierror = await check_bfr_create_siswa(
      BulanSPP,
      BulanKomite,
      BulanLes,
      BulanLesUN,
      BulanEkskul,
      formdata.nisn_no_absen,
      id_kelas
    );
    if (nilaierror) {
      setIsError(nilaierror);
      window.scrollTo(0, 0);
    } else {
      await create_siswa(id_kelas, formdata.nama, formdata.nisn_no_absen);
      for (let i = 0; i < BulanSPP.length; i++) {
        await create_siswa_spp(id_kelas, BulanSPP[i], formdata);
      }
      for (let i = 0; i < BulanKomite.length; i++) {
        await create_siswa_komite(id_kelas, BulanKomite[i], formdata);
      }
      for (let i = 0; i < BulanLes.length; i++) {
        await create_siswa_les(id_kelas, BulanLes[i], formdata);
      }
      for (let i = 0; i < BulanLesUN.length; i++) {
        await create_siswa_lesUN(id_kelas, BulanLesUN[i], formdata);
      }
      for (let i = 0; i < BulanEkskul.length; i++) {
        await create_siswa_ekskul(id_kelas, BulanEkskul[i], formdata);
      }
      await create_siswa_buku(id_kelas, formdata);
      await create_siswa_pakaian(id_kelas, formdata);
      await create_siswa_Pendaftaran(id_kelas, formdata);
      await create_siswa_Pendaftaran_ulang(id_kelas, formdata);

      setIsError(false);
      navigate("/siswa", { state: { value: true, data: dataKelas[0] } });
    }
  };
  const params = useParams();
  useEffect(() => {
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  useEffect(() => {
    const getKelasinformation = async () => {
      setDataKelas(await getKelasByid(params.id_kelas));
      setLoading(false);
    };
    getKelasinformation();
  }, []);
  return (
    <Box>
      {!Loading && (
        <Header
          title={
            "Tambah Siswa pada kelas (" +
            dataKelas[0].tingkat +
            ") " +
            dataKelas[0].kelas
          }
        />
      )}
      {!Loading && (
        <Box sx={{ width: "75%" }} margin="0 auto 0 auto">
          {isError && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              Nama Siswa pada NISN atau No absen tersebut sudah ada
            </Alert>
          )}
          {isError && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              Cek kembali data Tagihan
            </Alert>
          )}
          <form id="form" onSubmit={handleTambahSiswa}>
            <TextField
              id="input nama_siswa"
              name="nama_siswa"
              required
              focused
              label="Nama Siswa"
              variant="standard"
              fullWidth={true}
              size="small"
            />
            <br />
            <br />
            <TextField
              id="input nisn_no_absen"
              name="nisn_no_absen"
              required
              focused
              label="NISN / NO ABSEN"
              variant="standard"
              fullWidth={true}
              size="small"
            />
            <br />
            <br />
            <TextField
              id="input kelas"
              name="kelas"
              // defaultValue={dataKelas && "" + dataKelas[0].kelas + ""}
              value={dataKelas && dataKelas[0].kelas}
              sx={{ boxShadow: "none !important", borderRadius: "0 important" }}
              disabled
              label="Kelas"
              variant="standard"
              fullWidth={true}
              size="small"
            />
            <CheckboxBulan jenis={"SPP"} fungsi={handleSPP} bulan={bulan} />
            <CheckboxBulan
              jenis={"Komite"}
              fungsi={handleKomite}
              bulan={bulan}
            />
            <br />
            <br />
            <TextField
              id="input pendaftaran"
              name="pendaftaran"
              label="Tagihan pendaftaran"
              required
              focused
              InputProps={{
                inputComponent: FormatAngka,
              }}
              variant="standard"
              fullWidth={true}
              size="small"
            />
            <br />
            <br />
            <TextField
              id="input pendaftaran_ulang"
              name="pendaftaran_ulang"
              label="Tagihan pendaftaran_ulang"
              required
              focused
              InputProps={{
                inputComponent: FormatAngka,
              }}
              variant="standard"
              fullWidth={true}
              size="small"
            />
            <CheckboxBulan jenis={"LES"} fungsi={handleLes} bulan={bulan} />
            <CheckboxBulan
              jenis={"LES UN"}
              fungsi={handleLesUN}
              bulan={bulan}
            />
            <CheckboxBulan
              jenis={"Ekskul"}
              fungsi={handleEkskul}
              bulan={bulan}
            />
            <br />
            <br />
            <TextField
              id="input buku"
              name="buku"
              label="Tagihan Buku"
              required
              focused
              InputProps={{
                inputComponent: FormatAngka,
              }}
              variant="standard"
              fullWidth={true}
              size="small"
            />
            <br />
            <br />
            <TextField
              id="input pakaian"
              name="pakaian"
              label="Tagihan Pakaian"
              required
              focused
              InputProps={{
                inputComponent: FormatAngka,
              }}
              variant="standard"
              fullWidth={true}
              size="small"
            />
            <Alert
              severity="info"
              sx={{ marginBottom: "1rem", marginTop: "1.5rem" }}
            >
              Untuk Pembayaran Qurban dapat ditambahkan pada menu QURBAN
            </Alert>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={"2rem"}
            >
              <Button sx={buttonSX} type="submit">
                Tambah Siswa dan Pembayaran
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default CreateSiswa;
