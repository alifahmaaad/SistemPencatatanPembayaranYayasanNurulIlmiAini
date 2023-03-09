import React, { useEffect, useState } from "react";
import TableCustom from "../../component/TableCustom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getKelas, setTypeKelas } from "../../Database/database";
import Header from "../../component/Header";
import { buttonSX } from "../../buttonsx";
const DaftarKelas = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isNewdata, setIsNewdata] = useState(false);
  const [rows, setRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeClass, setTypeClass] = useState(0);
  const [isPageArchive, setPageArchive] = useState(false);
  // const { value } = state;
  useEffect(() => {
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  useEffect(() => {
    if (state == null) {
      return undefined;
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
  useEffect(() => {
    const getkelas = async () => {
      if (isPageArchive) {
        setRow(await getKelas(1));
      } else {
        setRow(await getKelas(0));
      }
      setLoading(false);
    };
    getkelas();
  }, [isPageArchive, typeClass]);
  const getTypeClass = (val) => {
    if (val == 0) {
      setPageArchive(false);
    } else if (val == 1) {
      setPageArchive(true);
    }
    setTypeClass(val);
    // console.log(val);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100, hide: true },
    {
      field: "tingkat",
      headerName: "Tingkat",
      width: 80,
      // editable: true,
    },
    {
      field: "kelas",
      headerName: "Nama Kelas",
      width: 150,
      // editable: true,
    },
    {
      field: "Aksi",
      sortable: false,
      width: 300,
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
                if (cellValues.row.isArchive == 0) {
                  await setTypeKelas(1, cellValues.row.id);
                  setTypeClass(!typeClass);
                } else {
                  await setTypeKelas(0, cellValues.row.id);
                  setTypeClass(!typeClass);
                }
                console.log(cellValues.row);
              }}
            >
              <Typography fontSize={"10px"}>
                {isPageArchive ? "Aktifkan kelas" : "Arsipkan Kelas"}
              </Typography>
            </Button>
            <Button
              sx={buttonSX}
              variant="contained"
              color="primary"
              onClick={async (event) => {
                event.stopPropagation();
                // await setTypeKelas(1, cellValues.row.id);
              }}
            >
              <Typography fontSize={"10px"}>Detail Kelas</Typography>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Header title="Daftar Kelas" button_tambah={true} />
      <Box width={"25%"}>
        <TextField
          id="tipe_kelas"
          name="tipe_kelas"
          select
          required
          fullWidth={true}
          label="Pilih Kelas"
          defaultValue="0"
          variant="filled"
          size="small"
          onChange={(event) => {
            getTypeClass(event.target.value);
          }}
        >
          <MenuItem key={0} value={0}>
            Kelas Aktif
          </MenuItem>
          <MenuItem key={1} value={1}>
            Kelas Arsip
          </MenuItem>
        </TextField>
      </Box>
      {isNewdata && (
        <Box padding={"0.5rem 0 0 0"}>
          <Alert severity="success">Data berhasil Ditambahkan</Alert>
        </Box>
      )}
      <TableCustom rows={rows} columns={columns} loading={loading} />
    </div>
  );
};

export default DaftarKelas;
