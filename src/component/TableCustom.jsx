import {
  Box,
  Typography,
  Button,
  CardContent,
  Card,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { GridToolbarExport } from "@mui/x-data-grid";
import { delete_spp_siswa_by_id } from "../Database/SPP/dbspp";
import { delete_qurban_siswa_by_id } from "../Database/qurban/dbqurban";
import { delete_pendaftaran_ulang_siswa_by_id } from "../Database/pendaftaranulang/dbpendaftaranulang";
import { delete_pendaftaran_siswa_by_id } from "../Database/pendaftaran/dbpendaftaran";
import { delete_pakaian_siswa_by_id } from "../Database/pakaian/dbpakaian";
import { delete_les_un_siswa_by_id } from "../Database/lesun/dblesun";
import { delete_les_siswa_by_id } from "../Database/Les/dbles";
import { delete_komite_siswa_by_id } from "../Database/Komite/dbkomite";
import { delete_ekskul_siswa_by_id } from "../Database/ekskul/dbekskul";
import { delete_buku_siswa_by_id } from "../Database/buku/dbbuku";
import { deletekelas, deletesiswa } from "../Database/database";
import { delete_harian_siswa_by_id } from "../Database/laporan/dbharian";
import { delete_bulanan_siswa_by_id } from "../Database/laporan/dbbulanan";
const deleteData = async (selectionModel, title, reset) => {
  switch (title) {
    case "spp":
      await delete_spp_siswa_by_id(selectionModel);
      reset();
      break;
    case "Qurban":
      await delete_qurban_siswa_by_id(selectionModel);
      reset();
      break;
    case "pendaftaran_ulang":
      await delete_pendaftaran_ulang_siswa_by_id(selectionModel);
      reset();
      break;
    case "pendaftaran":
      await delete_pendaftaran_siswa_by_id(selectionModel);
      reset();
      break;
    case "pakaian":
      await delete_pakaian_siswa_by_id(selectionModel);
      reset();
      break;
    case "les_un":
      await delete_les_un_siswa_by_id(selectionModel);
      reset();
      break;
    case "les":
      await delete_les_siswa_by_id(selectionModel);
      reset();
      break;
    case "komite":
      await delete_komite_siswa_by_id(selectionModel);
      reset();
      break;
    case "ekskul":
      await delete_ekskul_siswa_by_id(selectionModel);
      reset();
      break;
    case "buku":
      await delete_buku_siswa_by_id(selectionModel);
      reset();
      break;
    case "siswa":
      await deletesiswa(selectionModel);
      reset();
      break;
    case "kelas":
      await deletekelas(selectionModel);
      reset();
      break;
    case "Data Laporan Harian":
      await delete_harian_siswa_by_id(selectionModel);
      reset();
      break;
    case "Data Laporan Bulanan":
      await delete_bulanan_siswa_by_id(selectionModel);
      reset();
      break;
    default:
      break;
  }
};
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
function CustomToolbar({
  selectionModel,
  deldisable,
  title,
  tanggal,
  total,
  reset,
}) {
  return (
    <GridToolbarContainer sx={{ color: "red" }}>
      <GridToolbarColumnsButton sx={{ boxShadow: 0, color: "#53c79e" }} />
      <GridToolbarFilterButton sx={{ boxShadow: 0, color: "#53c79e" }} />
      <GridToolbarExport
        sx={{ boxShadow: 0, color: "#53c79e" }}
        csvOptions={{
          fileName: title,
          delimiter: ";",
          utf8WithBom: true,
        }}
      />
      {!deldisable && (
        <Button
          sx={{
            boxShadow: 0,
            padding: "4px 5px",
            textTransform: "none !important",
            color: "#d32f2f",
          }}
          onClick={() => deleteData(selectionModel, title, reset)}
        >
          <DeleteIcon sx={{ paddingRight: "0.5rem" }} />
          <Typography textTransform="uppercase" fontSize={"13px"}>
            Delete
          </Typography>
        </Button>
      )}
      {(title == "siswa") & (selectionModel.length > 0) ? (
        <Box padding={"0.5rem 0 0 0"}>
          <Alert severity="error">
            Menghapus Data Siswa Akan menghapus Seluruh data pada pembayaran dan
            History Pembayaran (Harap download laporan harian atau bulanan
            terlebih dahulu jika diperlukan)
          </Alert>
        </Box>
      ) : null}
      {(title == "kelas") & (selectionModel.length > 0) ? (
        <Box padding={"0.5rem 0 0 0"}>
          <Alert severity="error">
            Menghapus Data Kelas Akan menghapus Seluruh data siswa pada kelas,
            pembayaran dan History Pembayaran (Harap download laporan harian
            atau bulanan terlebih dahulu jika diperlukan)
          </Alert>
        </Box>
      ) : null}
      {(title == "Data Laporan Bulanan") & (selectionModel.length > 0) ? (
        <Box padding={"0.5rem 0 0 0"}>
          <Alert severity="error">
            Menghapus Data Laporan Bulanan dapat mengurangi jumlah pada
            perhitungan
          </Alert>
        </Box>
      ) : null}
      {(title == "Data Laporan Harian") & (selectionModel.length > 0) ? (
        <Box padding={"0.5rem 0 0 0"}>
          <Alert severity="error">
            Menghapus Data Laporan Harian dapat mengurangi jumlah pada
            perhitungan
          </Alert>
        </Box>
      ) : null}
      {title == "Qurban" && (
        <Typography
          margin="1rem auto 0 auto"
          width={"95%"}
          color={"black"}
          fontWeight={"bold"}
        >
          {"Total Pembayaran Qurban Siswa = Rp." + total.toLocaleString("id")}
        </Typography>
      )}
      {title == "Qurban" && (
        <Typography
          margin="1rem auto 0 auto"
          width={"95%"}
          color={"black"}
          fontWeight={"bold"}
        >
          {"Total Pembayaran Qurban Siswa = Rp." + total.toLocaleString("id")}
        </Typography>
      )}
      {title == "spp" && (
        <Typography
          margin="1rem auto 0 auto"
          width={"95%"}
          color={"black"}
          fontWeight={"bold"}
        >
          {"Total Pembayaran Spp Siswa = Rp." + total.toLocaleString("id")}
        </Typography>
      )}
      {title == "komite" && (
        <Typography
          margin="1rem auto 0 auto"
          width={"95%"}
          color={"black"}
          fontWeight={"bold"}
        >
          {"Total Pembayaran Komite Siswa = Rp." + total.toLocaleString("id")}
        </Typography>
      )}
      {title == "ekskul" && (
        <Typography
          margin="1rem auto 0 auto"
          width={"95%"}
          color={"black"}
          fontWeight={"bold"}
        >
          {"Total Pembayaran Ekskul Siswa = Rp." + total.toLocaleString("id")}
        </Typography>
      )}
      {title == "les" && (
        <Typography
          margin="1rem auto 0 auto"
          width={"95%"}
          color={"black"}
          fontWeight={"bold"}
        >
          {"Total Pembayaran Les Siswa = Rp." + total.toLocaleString("id")}
        </Typography>
      )}
      {title == "les_un" && (
        <Typography
          margin="1rem auto 0 auto"
          width={"95%"}
          color={"black"}
          fontWeight={"bold"}
        >
          {"Total Pembayaran Les UN Siswa = Rp." + total.toLocaleString("id")}
        </Typography>
      )}
      {title == "Data Laporan Bulanan" && (
        <Typography
          margin="1rem auto 0 auto"
          width={"95%"}
          color={"black"}
          fontWeight={"bold"}
        >
          {"Total Pembayaran Pada Bulan " +
            bulan[tanggal.$M] +
            " " +
            tanggal.$y +
            " = Rp." +
            total.toLocaleString("id")}
        </Typography>
      )}
      {title == "Data Laporan Harian" && (
        <Typography
          margin="1rem auto 0 auto"
          width={"95%"}
          color={"black"}
          fontWeight={"bold"}
        >
          {"Total Pembayaran Pada Tanggal " +
            tanggal.$D +
            " " +
            bulan[tanggal.$M] +
            " " +
            tanggal.$y +
            " = Rp." +
            total.toLocaleString("id")}
        </Typography>
      )}
    </GridToolbarContainer>
  );
}
const TableCustom = ({
  rows,
  columns,
  loading,
  sortmodel,
  isDelDisable,
  title,
  tanggal,
  total,
  reset,
}) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  return (
    <Box>
      <Card variant="outlined" sx={{ margin: "1rem 0" }}>
        <CardContent>
          <Box sx={{ borderColor: "white", height: 500, padding: "1rem 0" }}>
            <DataGrid
              loading={loading}
              checkboxSelection
              onSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              initialState={{
                ...rows.initialState,
                sorting: {
                  ...rows.initialState?.sorting,
                  sortModel: sortmodel,
                },
              }}
              selectionModel={rowSelectionModel}
              rows={rows}
              columns={columns}
              components={{
                Toolbar: CustomToolbar,
              }}
              componentsProps={{
                toolbar: {
                  rows: rows,
                  selectionModel: rowSelectionModel,
                  deldisable: isDelDisable,
                  title: title,
                  tanggal: tanggal,
                  total: total,
                  reset: reset,
                },
              }}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TableCustom;
