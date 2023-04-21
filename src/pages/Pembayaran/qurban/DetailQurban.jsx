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
import { buttonSXdelete } from "../../../buttonsx";
import PaidIcon from "@mui/icons-material/Paid";
import FormatAngka from "../../../component/FormatAngka";
import { editQurban, getQurban } from "../../../Database/qurban/dbqurban";
import { getSiswabyId } from "../../../Database/database";
const DetailQurban = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [defaultterbayar, setDefaultterbayar] = useState(0);
  const [jumlahTerbayar, setJumlahTerbayar] = useState(0);
  const [idedit, setIdedit] = useState([]);
  const [reseter, setReseter] = useState(0);
  const reset = () => {
    setReseter(reseter + 1);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = async () => {
    await editQurban(idedit, jumlahTerbayar);
    setReseter(reseter + 1);
    handleCloseEdit();
  };
  const params = useParams();
  const isLogin = useSelector((state) => state.isLogin);
  const [rows, setRow] = useState([]);
  const { state } = useLocation();
  const [isNewdata, setIsNewdata] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState(true);
  const [namakelas, setNamakelas] = useState("testest");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  useEffect(() => {
    const getSiswafromdb = async () => {
      setRow(await getQurban(params.id_siswa));
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
      renderCell: () => {
        return (
          <Button
            disabled
            sx={{
              boxShadow: "0 !important",
              padding: "0 !important",
              textTransform: "none !important",
              color: "#53c79e !important",
            }}
          >
            <PaidIcon /> Terbayar
          </Button>
        );
      },
      valueGetter: () => "Terbayar",
    },
    {
      field: "nama",
      headerName: "Nama",
      width: 150,
    },
    {
      field: "jumlah",
      headerName: "Jumlah",
      width: 100,
      renderCell: (cellValues) => {
        return <div>Rp.{cellValues.row.jumlah.toLocaleString("de-DE")}</div>;
      },
      valueGetter: (cellValues) =>
        "Rp." + cellValues.row.jumlah.toLocaleString("de-DE"),
    },
    // {
    //   field: "Aksi",
    //   sortable: false,
    //   width: 220,
    //   headerName: "Aksi",
    //   renderCell: (cellValues) => {
    //     return (
    //       <div>
    //         <Button
    //           sx={buttonSXdelete}
    //           variant="contained"
    //           color="primary"
    //           onClick={async (event) => {
    //             event.stopPropagation();
    //             setJumlahTerbayar(cellValues.row.jumlah);
    //             setDefaultterbayar(cellValues.row.jumlah);
    //             setIdedit(cellValues.row.id);
    //             handleClickOpenEdit();
    //           }}
    //         >
    //           <Typography fontSize={"10px"}>Edit Data</Typography>
    //         </Button>
    //         <Dialog
    //           open={openEdit}
    //           onClose={handleCloseEdit}
    //           componentsProps={{
    //             backdrop: { style: { opacity: "50%" } },
    //           }}
    //         >
    //           <DialogTitle color={"#53c79e"} fontWeight={"bold"}>
    //             Edit data Qurban
    //           </DialogTitle>
    //           <DialogContent>
    //             <DialogContentText width={"25rem"}>
    //               <b>Edit data Pembayaran Qurban </b>
    //               <br /> Siswa <span>: </span>
    //               {cellValues.row.nama} <br /> kelas
    //               <span> : {cellValues.row.kelas}</span>
    //               <br />
    //               Tingkat <span> : </span>
    //               {cellValues.row.tingkat}
    //               <br />
    //               Jumlah Qurban <span> : </span>Rp.
    //               {defaultterbayar.toLocaleString("id")}
    //             </DialogContentText>
    //             <TextField
    //
    //               margin="dense"
    //               name="jumlah_terhutang"
    //               id="jumlah_terhutang"
    //               label="Edit Jumlah Qurban"
    //               fullWidth
    //               defaultValue={jumlahTerbayar}
    //               InputProps={{
    //                 inputComponent: FormatAngka,
    //               }}
    //               sx={{
    //                 input: {
    //                   color: jumlahTerbayar < 0 && "red",
    //                 },
    //               }}
    //               variant="standard"
    //               onChange={(e) => {
    //                 setJumlahTerbayar(e.target.value);
    //               }}
    //             />
    //           </DialogContent>
    //           <DialogActions>
    //             <Button onClick={handleCloseEdit}>Batal</Button>
    //             <Button
    //               disabled={jumlahTerbayar < 0 && true}
    //               onClick={handleEdit}
    //             >
    //               Ubah
    //             </Button>
    //           </DialogActions>
    //         </Dialog>
    //       </div>
    //     );
    //   },
    // },
  ];
  return (
    <div>
      <Header
        title={nama.length > 0 && "Detail Qurban \n" + nama[0].nama}
        button_tambah={true}
      />
      <div>
        <TableCustom
          rows={rows}
          columns={columnss}
          sortmodel={sortModel}
          loading={loading}
          title={"Qurban"}
          reset={reset}
        />
      </div>
    </div>
  );
};

export default DetailQurban;
