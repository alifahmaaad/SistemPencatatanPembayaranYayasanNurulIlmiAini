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
function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ color: "red" }}>
      <GridToolbarColumnsButton sx={{ boxShadow: 0 }} />
      <GridToolbarFilterButton sx={{ boxShadow: 0 }} />
      <Button
        sx={{
          boxShadow: 0,
          padding: "4px 5px",
          textTransform: "none !important",
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
    <Box
      sx={{
        width: "100%",
        padding: "3rem 1rem",
      }}
    >
      <Typography
        id="header"
        variant="p"
        color={"#1976d2"}
        fontStyle={"italic"}
      >
        {title}
      </Typography>
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
