import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Alert, Box, Typography } from "@mui/material";

import TableCustom from "../../component/TableCustom";
import PilihKelas from "../../component/PilihKelas";
import Header from "../../component/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { getLaporanHarian } from "../../Database/laporan/dbharian";
const DataHarian = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const [rows, setRow] = useState([]);
  const [tanggal, setTanggal] = useState(dayjs(new Date()));
  const { state } = useLocation();
  const [isIdGet, setisIdGet] = useState();
  const [isNewdata, setIsNewdata] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  useEffect(() => {
    const getSiswafromdb = async () => {
      setRow(await getLaporanHarian(isIdGet, tanggal));
      setLoading(false);
    };
    getSiswafromdb();
  }, [isIdGet, tanggal]);
  useEffect(() => {
    if (state == null) {
      return undefined;
    }
    if (state.data) {
      setNamakelas("(" + state.data.tingkat + ")" + state.data.kelas);
    }
    if (state.value) {
      setIsNewdata(true);
      const timeId = setTimeout(() => {
        setIsNewdata(false);
        state.value = false;
      }, 2000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, []);
  const getIDkelas = (val) => {
    setisIdGet(val);
    // console.log(val);
  };
  const [sortModel, setSortModel] = useState([
    {
      field: "nisn_atau_no_absen",
      sort: "asc",
    },
  ]);
  const columnss = [
    { field: "id", headerName: "ID", width: 100, hide: true },
    {
      field: "created_at",
      headerName: "Tanggal Pembayaran",
      width: 180,
    },
    {
      field: "nama",
      headerName: "Nama Siswa",
      width: 180,
    },
    {
      field: "jenis_nama",
      headerName: "Jenis Pembayaran",
      width: 180,
    },
    {
      field: "jenis_bulan",
      headerName: "Jenis Bulan",
      width: 180,
    },
    {
      field: "jumlah_bayar",
      headerName: "Jumlah",
      width: 180,
      renderCell: (cellValues) => {
        return (
          <div>Rp.{cellValues.row.jumlah_bayar.toLocaleString("de-DE")}</div>
        );
      },
      valueGetter: (cellValues) =>
        "Rp." + cellValues.row.jumlah_bayar.toLocaleString("de-DE"),
    },
  ];

  const total = rows.reduce((a, item) => (a = a + item.jumlah_bayar), 0);

  return (
    <div>
      <Header
        title="Data Harian Siswa"
        button_tambah={false}
        idkelas={isIdGet}
      />
      {!isIdGet && (
        <Box paddingBottom={"0.5rem"}>
          <Alert severity="info">Silahkan Pilih Kelas Terlebih Dahulu</Alert>
        </Box>
      )}
      {isNewdata && (
        <Box padding={"0.5rem 0 0 0"}>
          <Alert severity="success">
            Data berhasil Ditambahkan {namakelas}
          </Alert>
        </Box>
      )}
      <PilihKelas getIDkelas={getIDkelas} />

      {isIdGet && (
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
            <Box margin="0 auto 0 auto" width={"95%"}>
              <MobileDatePicker
                orientation="landscape"
                label="Pilih Tanggal"
                sx={{
                  width: "100%",
                  marginTop: "1rem",
                  border: "none",
                  justifyContent: "center",
                  color: "red",
                }}
                value={tanggal}
                onChange={(date) => {
                  setTanggal(date);
                }}
              />
            </Box>
          </LocalizationProvider>
          {/* <Typography margin="1rem auto 0 auto" width={"95%"}>
            {"Total Pembayaran Pada Tanggal " +
              tanggal.$D +
              " " +
              bulan[tanggal.$M] +
              " " +
              tanggal.$y +
              " = Rp." +
              total.toLocaleString("id")}
          </Typography> */}
          <TableCustom
            rows={rows}
            columns={columnss}
            sortmodel={sortModel}
            loading={loading}
            isDelDisable={true}
            title={"Data Laporan Harian"}
            tanggal={tanggal}
            total={total}
          />
        </div>
      )}
    </div>
  );
};

export default DataHarian;
