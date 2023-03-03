import {
  Box,
  Divider,
  Typography,
  Button,
  CardContent,
  Card,
} from "@mui/material";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import buttonSX from "../buttonsx";
import AddIcon from "@mui/icons-material/Add";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ color: "red" }}>
      <GridToolbarColumnsButton sx={{ boxShadow: 0, color: "#53c79e" }} />
      <GridToolbarFilterButton sx={{ boxShadow: 0, color: "#53c79e" }} />
      <Button
        sx={{
          boxShadow: 0,
          padding: "4px 5px",
          textTransform: "none !important",
          color: "#53c79e",
        }}
      >
        <FileDownloadIcon sx={{ paddingRight: "0.5rem" }} />{" "}
        <Typography fontSize={"13px"}>Export</Typography>
      </Button>
    </GridToolbarContainer>
  );
}
const TableCustom = ({ title, rows, columns }) => {
  return (
    <Box>
      <Typography
        id="header"
        variant="p"
        color={"#53c79e"}
        fontStyle={"italic"}
      >
        {title}
      </Typography>
      <Typography
        color={"gray"}
        fontStyle={"italic"}
        fontSize={"13px"}
        // marginLeft={"1rem"}
        textAlign={"left"}
        // fontFamily={"font-family: 'Lobster', cursive"}
      >
        Sistem Keuangan Sekolah{window.location.pathname}
      </Typography>
      <Box display={"flex"} justifyContent="flex-end">
        <Button sx={buttonSX} href={"/Login"}>
          <AddIcon /> Tambah
        </Button>
      </Box>
      <Divider sx={{ margin: "0.5rem 1rem 2rem 1rem", borderWidth: "1.5px" }} />
      <Card variant="outlined" sx={{ margin: "1rem 0" }}>
        <CardContent>
          <Box sx={{ borderColor: "white", height: 404.5, padding: "1rem 0" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              components={{
                Toolbar: CustomToolbar,
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
