import React, { useEffect, useState } from "react";
import TableCustom from "../../../component/TableCustom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../../component/Header";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { buttonSX, buttonSXdelete } from "../../../buttonsx";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import PaidIcon from "@mui/icons-material/Paid";
import FormatAngka from "../../../component/FormatAngka";
import {
  editKomite,
  getKomite,
  setKomiteBayar,
} from "../../../Database/Komite/dbkomite";
import { create_history, getSiswabyId } from "../../../Database/database";
const DetailKomite = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [bulan, setBulan] = useState("");
  const [jumlahTerbayarPembayaran, setJumlahTerbayarPembayaran] = useState(0);
  const [defaultTerhutang, setDefaultTerhutang] = useState(0);
  const [defaultterbayar, setDefaultterbayar] = useState(0);
  const [jumlahTerhutangPembayaran, setJumlahTerhutangPembayaran] = useState(0);
  const [jumlahTerbayar, setJumlahTerbayar] = useState(0);
  const [jumlahTerhutang, setJumlahTerhutang] = useState(0);
  const [idBayar, setIdBayar] = useState([]);
  const [idedit, setIdedit] = useState([]);
  const [nama, setNama] = useState(true);
  const [reseter, setReseter] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const reset = () => {
    setReseter(reseter + 1);
  };
  const handleBayar = async () => {
    await setKomiteBayar(
      idBayar[0],
      parseInt(jumlahTerbayarPembayaran) + parseInt(jumlah)
    );
    await create_history(
      parseInt(jumlah),
      "Pembayaran Komite",
      bulan,
      idBayar[1]
    );
    setReseter(reseter + 1);
    handleClose();
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = async () => {
    // console.log(jumlahTerbayar);
    // console.log(jumlahTerhutang);
    await editKomite(idedit, jumlahTerhutang);
    setReseter(reseter + 1);
    handleCloseEdit();
  };
  const params = useParams();
  const isLogin = useSelector((state) => state.isLogin);
  const [rows, setRow] = useState([]);
  const { state } = useLocation();
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
      setRow(await getKomite(params.id_siswa));
      setNama(await getSiswabyId(params.id_siswa));
      setLoading(false);
    };
    getSiswafromdb();
  }, [reseter]);
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
  const [sortModel, setSortModel] = useState([
    {
      field: "id",
      sort: "asc",
    },
  ]);
  const columnss = [
    { field: "id", headerName: "ID", width: 100, hide: true },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      renderCell: (cellValues) => {
        const sisa_tagihan =
          cellValues.row.jumlah_terhutang - cellValues.row.jumlah_terbayar;
        return (
          <div>
            {sisa_tagihan == 0 ? (
              <Button
                disabled
                sx={{
                  boxShadow: "0 !important",
                  padding: "0 !important",
                  textTransform: "none !important",
                  color: "#53c79e !important",
                }}
              >
                <PaidIcon /> Lunas
              </Button>
            ) : (
              <Button
                disabled
                sx={{
                  boxShadow: "0 !important",
                  padding: "0 !important",
                  textTransform: "none !important",
                  color: "#d32f2f !important",
                }}
              >
                <CreditCardOffIcon /> Belum Lunas
              </Button>
            )}
          </div>
        );
      },
      valueGetter: (cellValues) =>
        cellValues.row.jumlah_terhutang - cellValues.row.jumlah_terbayar == 0
          ? "Lunas"
          : "Belum Lunas",
    },
    {
      field: "nama",
      headerName: "Nama",
      width: 150,
    },
    {
      field: "bulan",
      headerName: "Bulan",
      width: 100,
    },
    {
      field: "Tagihan",
      headerName: "Sisa Tagihan",
      width: 100,
      renderCell: (cellValues) => {
        const sisa_tagihan =
          cellValues.row.jumlah_terhutang - cellValues.row.jumlah_terbayar;
        return <div>Rp.{sisa_tagihan.toLocaleString("de-DE")}</div>;
      },
      valueGetter: (cellValues) =>
        "Rp." +
        (cellValues.row.jumlah_terhutang.toLocaleString("de-DE") -
          cellValues.row.jumlah_terbayar.toLocaleString("de-DE")),
    },
    {
      field: "Aksi",
      sortable: false,
      width: 250,
      headerName: "Aksi",
      renderCell: (cellValues) => {
        return (
          <div>
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
                setJumlah(
                  cellValues.row.jumlah_terhutang -
                    cellValues.row.jumlah_terbayar
                );
                setBulan(cellValues.row.bulan);
                setJumlahTerbayarPembayaran(cellValues.row.jumlah_terbayar);
                setJumlahTerhutangPembayaran(cellValues.row.jumlah_terhutang);
                setDefaultterbayar(cellValues.row.jumlah_terbayar);
                setDefaultTerhutang(cellValues.row.jumlah_terhutang);
                setIdBayar([cellValues.row.id, cellValues.row.id_siswa]);
                handleClickOpen();
                // console.log(cellValues.row);
              }}
            >
              <Typography fontSize={"10px"}>Bayar Komite</Typography>
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              componentsProps={{
                backdrop: { style: { opacity: "50%" } },
              }}
            >
              <DialogTitle color={"#53c79e"} fontWeight={"bold"}>
                Bayar Komite
              </DialogTitle>
              <DialogContent>
                <DialogContentText width={"25rem"}>
                  <b>
                    Masukkan Jumlah Pembayaran Komite untuk informasi siswa,
                  </b>
                  <br /> Siswa <span>: </span>
                  {cellValues.row.nama} <br /> kelas
                  <span> : {cellValues.row.kelas}</span>
                  <br />
                  Tingkat <span> : </span>
                  {cellValues.row.tingkat}
                  <br />
                  Komite Bulan <span> : </span>
                  {cellValues.row.bulan}
                  <br />
                  Jumlah Komite <span> : </span>Rp.
                  {jumlahTerhutangPembayaran.toLocaleString("id")}
                  <br />
                  Tagihan <span> : </span>Rp.
                  {(
                    jumlahTerhutangPembayaran - jumlahTerbayarPembayaran
                  ).toLocaleString("id")}
                </DialogContentText>
                <TextField
                  margin="dense"
                  name="bayar_Komite"
                  id="bayar_Komite"
                  label={
                    jumlah >
                    jumlahTerhutangPembayaran - jumlahTerbayarPembayaran
                      ? "Pembayaran Komite   *Tidak bisa lebih dari tagihan"
                      : "Pembayaran Komite"
                  }
                  fullWidth
                  defaultValue={defaultTerhutang - defaultterbayar}
                  InputProps={{
                    inputComponent: FormatAngka,
                  }}
                  sx={{
                    input: {
                      color:
                        jumlah >
                        jumlahTerhutangPembayaran - jumlahTerbayarPembayaran
                          ? "red"
                          : null,
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
                <Button
                  disabled={
                    (jumlah >
                      jumlahTerhutangPembayaran - jumlahTerbayarPembayaran ||
                      jumlah < 0) &&
                    true
                  }
                  onClick={handleBayar}
                >
                  Bayar
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              sx={buttonSXdelete}
              variant="contained"
              color="primary"
              onClick={async (event) => {
                event.stopPropagation();
                setJumlahTerbayar(cellValues.row.jumlah_terbayar);
                setJumlahTerhutang(cellValues.row.jumlah_terhutang);
                setDefaultterbayar(cellValues.row.jumlah_terbayar);
                setDefaultTerhutang(cellValues.row.jumlah_terhutang);
                setIdedit(cellValues.row.id);
                handleClickOpenEdit();
              }}
            >
              <Typography fontSize={"10px"}>Edit Data</Typography>
            </Button>
            <Dialog
              open={openEdit}
              onClose={handleCloseEdit}
              componentsProps={{
                backdrop: { style: { opacity: "50%" } },
              }}
            >
              <DialogTitle color={"#53c79e"} fontWeight={"bold"}>
                Edit data Komite
              </DialogTitle>
              <DialogContent>
                <DialogContentText width={"25rem"}>
                  <b>Edit data Pembayaran Komite </b>
                  <br /> Siswa <span>: </span>
                  {cellValues.row.nama} <br /> kelas
                  <span> : {cellValues.row.kelas}</span>
                  <br />
                  Tingkat <span> : </span>
                  {cellValues.row.tingkat}
                  <br />
                  Komite Bulan <span> : </span>
                  <b>{cellValues.row.bulan}</b>
                  <br />
                  Jumlah Komite <span> : </span>Rp.
                  {defaultTerhutang.toLocaleString("id")}
                </DialogContentText>
                <TextField
                  margin="dense"
                  name="jumlah_terbayar"
                  id="jumlah_terbayar"
                  label="Komite Yang sudah dibayar"
                  disabled
                  fullWidth
                  defaultValue={jumlahTerbayar}
                  InputProps={{
                    inputComponent: FormatAngka,
                  }}
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  name="jumlah_terhutang"
                  id="jumlah_terhutang"
                  label="Jumlah Hutang Komite"
                  fullWidth
                  defaultValue={jumlahTerhutang}
                  InputProps={{
                    inputComponent: FormatAngka,
                  }}
                  sx={{
                    input: {
                      color: jumlahTerhutang < jumlahTerbayar && "red",
                    },
                  }}
                  variant="standard"
                  onChange={(e) => {
                    setJumlahTerhutang(e.target.value);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit}>Batal</Button>
                <Button
                  disabled={jumlahTerhutang - jumlahTerbayar < 0 && true}
                  onClick={handleEdit}
                >
                  Ubah
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      },
    },
    {
      field: "jumlah-terbayar",
      headerName: "Jumlah Terbayar",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <div>Rp.{cellValues.row.jumlah_terbayar.toLocaleString("de-DE")}</div>
        );
      },
      valueGetter: (cellValues) =>
        "Rp." + cellValues.row.jumlah_terbayar.toLocaleString("de-DE"),
    },
  ];
  const total = rows.reduce((a, item) => (a = a + item.jumlah_terbayar), 0);
  return (
    <div>
      <Header
        title={nama.length > 0 && "Detail Komite \n" + nama[0].nama}
        button_tambah={true}
      />
      <div>
        <TableCustom
          rows={rows}
          columns={columnss}
          sortmodel={sortModel}
          loading={loading}
          title={"komite"}
          reset={reset}
          total={total}
        />
      </div>
    </div>
  );
};

export default DetailKomite;
