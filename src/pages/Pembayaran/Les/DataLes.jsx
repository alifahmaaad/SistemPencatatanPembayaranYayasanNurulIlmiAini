import React, { useEffect, useState } from "react";
import TableCustom from "../../../component/TableCustom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSiswa } from "../../../Database/database";
import Header from "../../../component/Header";
import PilihKelas from "../../../component/PilihKelas";
import { Alert, Box, Button, Typography } from "@mui/material";
import { buttonSX } from "../../../buttonsx";
const DataLes = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const [rows, setRow] = useState([]);
  const { state } = useLocation();
  const [isIdGet, setisIdGet] = useState();
  const [isNewdata, setIsNewdata] = useState(false);
  const [loading, setLoading] = useState(true);
  const [namakelas, setNamakelas] = useState("testest");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  useEffect(() => {
    const getSiswafromdb = async () => {
      setRow(await getSiswa(isIdGet));
      setLoading(false);
    };
    getSiswafromdb();
  }, [isIdGet]);
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
      field: "nama",
      headerName: "Nama",
      width: 180,
    },
    {
      field: "kelas",
      headerName: "kelas",
      width: 100,
    },
    {
      field: "nisn_atau_no_absen",
      headerName: "NISN/NO ABSEN",
      width: 100,
    },
    {
      field: "Aksi",
      sortable: false,
      width: 200,
      headerName: "Aksi",
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              sx={buttonSX}
              variant="contained"
              color="primary"
              onClick={async (event) => {
                event.stopPropagation();
                navigate(window.location.pathname + "/" + cellValues.row.id);
              }}
            >
              <Typography fontSize={"10px"}>Detail Les Siswa</Typography>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Header title="Data Les Siswa" button_tambah={false} idkelas={isIdGet} />
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
          <Box paddingTop={"0.5rem"}>
            <Alert severity="info">
              Untuk Melihat Detail Pembayaran Les klikk tombol "Detail Les
              Siswa"
            </Alert>
          </Box>
          <TableCustom
            rows={rows}
            columns={columnss}
            sortmodel={sortModel}
            loading={loading}
            isDelDisable={true}
          />
        </div>
      )}
    </div>
  );
};

export default DataLes;
