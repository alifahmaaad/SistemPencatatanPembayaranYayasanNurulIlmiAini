import { Alert, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buttonSX } from "../../buttonsx";
import CheckboxBulan from "../../component/CheckboxBulan";
import Header from "../../component/Header";
import {
  create_siswa,
  create_siswa_buku,
  create_siswa_ekskul,
  create_siswa_komite,
  create_siswa_les,
  create_siswa_lesUN,
  create_siswa_pakaian,
  create_siswa_Pendaftaran,
  create_siswa_Pendaftaran_ulang,
  create_siswa_spp,
  getKelasByid,
} from "../../Database/database";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import React from "react";
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={"."}
      decimalSeparator={","}
      valueIsNumericString
      prefix="Rp."
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const CreateSiswa = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const [isError, setIsError] = useState(false);
  const [isErrordata, setIsErrordata] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [dataKelas, setDataKelas] = useState(bulan);
  const [BulanSPP, setBulanSPP] = useState(bulan);
  const [BulanKomite, setBulanKomite] = useState(bulan);
  const [BulanLes, setBulanLes] = useState(bulan);
  const [BulanLesUN, setBulanLesUN] = useState(bulan);
  const [BulanEkskul, setBulanEkskul] = useState(bulan);
  const handleSPP = (getBulan) => {
    const temp = getBulan;
    for (let index = 0; index < getBulan.length; index++) {
      if (getBulan[index].includes("-")) {
        temp.splice(index, 1);
      }
    }
    setBulanSPP(temp);
  };
  const handleKomite = (getBulan) => {
    const temp = getBulan;
    for (let index = 0; index < getBulan.length; index++) {
      if (getBulan[index].includes("-")) {
        temp.splice(index, 1);
      }
    }
    setBulanKomite(temp);
  };
  const handleLes = (getBulan) => {
    const temp = getBulan;
    for (let index = 0; index < getBulan.length; index++) {
      if (getBulan[index].includes("-")) {
        temp.splice(index, 1);
      }
    }
    setBulanLes(temp);
  };
  const handleLesUN = (getBulan) => {
    const temp = getBulan;
    for (let index = 0; index < getBulan.length; index++) {
      if (getBulan[index].includes("-")) {
        temp.splice(index, 1);
      }
    }
    setBulanLesUN(temp);
  };
  const handleEkskul = (getBulan) => {
    const temp = getBulan;
    for (let index = 0; index < getBulan.length; index++) {
      if (getBulan[index].includes("-")) {
        temp.splice(index, 1);
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
    const nilaierror = await create_siswa(
      id_kelas,
      formdata.nama,
      formdata.nisn_no_absen
    );
    if (nilaierror) {
      setIsError(nilaierror);
    } else {
      let errorspp = false;
      let errorkomite = false;
      let errorles = false;
      let errorlesun = false;
      let errorekskul = false;
      let errorbuku = false;
      let errorpakaian = false;
      let errorpendaftaran = false;
      let errorpendaftaranulang = false;
      for (let i = 0; i < BulanSPP.length; i++) {
        errorspp = await create_siswa_spp(id_kelas, BulanSPP[i], formdata);
      }
      for (let i = 0; i < BulanKomite.length; i++) {
        errorkomite = await create_siswa_komite(
          id_kelas,
          BulanKomite[i],
          formdata
        );
      }
      for (let i = 0; i < BulanLes.length; i++) {
        errorles = await create_siswa_les(id_kelas, BulanLes[i], formdata);
      }
      for (let i = 0; i < BulanLesUN.length; i++) {
        errorlesun = await create_siswa_lesUN(
          id_kelas,
          BulanLesUN[i],
          formdata
        );
      }
      for (let i = 0; i < BulanEkskul.length; i++) {
        errorekskul = await create_siswa_ekskul(
          id_kelas,
          BulanEkskul[i],
          formdata
        );
      }
      errorbuku = await create_siswa_buku(id_kelas, formdata);
      errorpakaian = await create_siswa_pakaian(id_kelas, formdata);
      errorpendaftaran = await create_siswa_Pendaftaran(id_kelas, formdata);
      errorpendaftaranulang = await create_siswa_Pendaftaran_ulang(
        id_kelas,
        formdata
      );
      if (
        errorspp ||
        errorkomite ||
        errorles ||
        errorlesun ||
        errorekskul ||
        errorbuku ||
        errorpakaian ||
        errorpendaftaran ||
        errorpendaftaranulang
      ) {
        setIsErrordata(true);
      } else {
        setIsErrordata(false);
        navigate("/siswa", { state: { value: true, data: dataKelas[0] } });
      }
      setIsError(false);
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
      )}{" "}
      {!Loading && (
        <Box sx={{ width: "75%" }} margin="0 auto 0 auto">
          {isError && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              Nama Siswa pada NISN atau No absen tersebut sudah ada
            </Alert>
          )}
          {isErrordata && (
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
            <CheckboxBulan jenis={"SPP"} fungsi={handleSPP} />
            <CheckboxBulan jenis={"Komite"} fungsi={handleKomite} />
            <br />
            <br />
            <TextField
              id="input pendaftaran"
              name="pendaftaran"
              label="Tagihan pendaftaran"
              required
              focused
              InputProps={{
                inputComponent: NumericFormatCustom,
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
                inputComponent: NumericFormatCustom,
              }}
              variant="standard"
              fullWidth={true}
              size="small"
            />
            <CheckboxBulan jenis={"LES"} fungsi={handleLes} />
            <CheckboxBulan jenis={"LES UN"} fungsi={handleLesUN} />
            <CheckboxBulan jenis={"Ekskul"} fungsi={handleEkskul} />
            <br />
            <br />
            <TextField
              id="input buku"
              name="buku"
              label="Tagihan Buku"
              required
              focused
              InputProps={{
                inputComponent: NumericFormatCustom,
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
                inputComponent: NumericFormatCustom,
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
