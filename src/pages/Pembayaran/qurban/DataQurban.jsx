import React, { useEffect, useState } from "react";
import TableCustom from "../../../component/TableCustom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { create_history, getSiswa } from "../../../Database/database";
import Header from "../../../component/Header";
import PilihKelas from "../../../component/PilihKelas";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import FormatAngka from "../../../component/FormatAngka";
import { buttonSX } from "../../../buttonsx";
import { create_siswa_Qurban } from "../../../Database/qurban/dbqurban";
const DataQurban = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const [open, setOpen] = useState(false);

  const [jumlah, setJumlah] = useState(0);
  const [rows, setRow] = useState([]);
  const { state } = useLocation();
  const [isIdGet, setisIdGet] = useState();
  const [isNewdata, setIsNewdata] = useState(false);
  const [loading, setLoading] = useState(true);
  const [namakelas, setNamakelas] = useState("testest");
  const [defaultterbayar, setDefaultterbayar] = useState(0);
  const [reseter, setReseter] = useState(0);
  const [idBayar, setIdBayar] = useState([]);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBayar = async () => {
    // console.log(idBayar[0]); //idsiswa
    // console.log(jumlah);
    await create_siswa_Qurban(parseInt(jumlah), idBayar[0]);
    await create_history(
      parseInt(jumlah),
      "Pembayaran Qurban",
      "-",
      idBayar[0]
    );
    setReseter(reseter + 1);
    handleClose();
  };
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
                navigate(window.location.pathname + "/" + cellValues.row.id);
              }}
            >
              <Typography fontSize={"10px"}>Detail</Typography>
            </Button>
            <Button
              sx={buttonSX}
              variant="contained"
              color="primary"
              disabled={
                cellValues.row.jumlah_terhutang -
                  cellValues.row.jumlah_terbayar ==
                  0 && true
              }
              onClick={async (event) => {
                event.stopPropagation();
                setJumlah(0);
                setDefaultterbayar(0);
                setIdBayar([cellValues.row.id]);
                handleClickOpen();
                // console.log(cellValues.row);
              }}
            >
              <Typography fontSize={"10px"}>Bayar Qurban</Typography>
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              componentsProps={{
                backdrop: { style: { opacity: "50%" } },
              }}
            >
              <DialogTitle color={"#53c79e"} fontWeight={"bold"}>
                Bayar Qurban
              </DialogTitle>
              <DialogContent>
                <DialogContentText width={"25rem"}>
                  <b>
                    Masukkan Jumlah Pembayaran Qurban untuk informasi siswa,
                  </b>
                  <br /> Siswa <span>: </span>
                  {cellValues.row.nama} <br /> kelas
                  <span> : {cellValues.row.kelas}</span>
                  <br />
                  Tingkat <span> : </span>
                  {cellValues.row.tingkat}
                  <br />
                </DialogContentText>
                <TextField
                  focused
                  margin="dense"
                  name="bayar_Qurban"
                  id="bayar_Qurban"
                  label={"Pembayaran Qurban"}
                  fullWidth
                  defaultValue={defaultterbayar}
                  InputProps={{
                    inputComponent: FormatAngka,
                  }}
                  sx={{
                    input: {
                      color: jumlah < 0 ? "red" : null,
                    },
                  }}
                  variant="standard"
                  onChange={(e) => {
                    setJumlah(e.target.value);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Batal</Button>
                <Button disabled={jumlah < 0 && true} onClick={handleBayar}>
                  Bayar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Header
        title="Data Qurban Siswa"
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
          <Box paddingTop={"0.5rem"}>
            <Alert severity="info">
              Untuk Melihat Detail Pembayaran Qurban Siswa klik tombol "Detail
              Qurban Siswa"
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

export default DataQurban;
