import React, { useEffect, useState } from "react";
import TableCustom from "../../component/TableCustom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSiswa } from "../../Database/database";
import Header from "../../component/Header";
import PilihKelas from "../../component/PilihKelas";
import { Alert, Box } from "@mui/material";
const DataSiswa = () => {
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
      width: 200,
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
  ];

  return (
    <div>
      <Header
        title="Data Siswa"
        button_tambah={isIdGet ? true : false}
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
          <TableCustom
            rows={rows}
            columns={columnss}
            sortmodel={sortModel}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default DataSiswa;
