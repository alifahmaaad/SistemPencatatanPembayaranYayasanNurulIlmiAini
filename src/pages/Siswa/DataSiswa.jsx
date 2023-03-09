import React, { useEffect, useState } from "react";
import TableCustom from "../../component/TableCustom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSiswa } from "../../Database/database";
import Header from "../../component/Header";
import PilihKelas from "../../component/PilihKelas";
import { Alert, Box } from "@mui/material";
const DataSiswa = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const [rows, setRow] = useState([]);
  const [isIdGet, setisIdGet] = useState();
  const [loading, setLoading] = useState(true);
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
  const getIDkelas = (val) => {
    setisIdGet(val);
    // console.log(val);
  };
  const [sortModel, setSortModel] = useState([
    {
      field: "nama",
      sort: "asc",
    },
  ]);
  const columnss = [
    { field: "id", headerName: "ID", width: 100, hide: true },
    {
      field: "nama",
      headerName: "Nama",
      width: 100,
    },
    {
      field: "kelas",
      headerName: "kelas",
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
