import { Box, Typography, Button, CardContent, Card } from "@mui/material";
import React, { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
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
        <Typography textTransform="uppercase" fontSize={"13px"}>
          Export
        </Typography>
      </Button>
      <Button
        sx={{
          boxShadow: 0,
          padding: "4px 5px",
          textTransform: "none !important",
          color: "#53c79e",
        }}
      >
        <DeleteIcon sx={{ paddingRight: "0.5rem" }} />{" "}
        <Typography textTransform="uppercase" fontSize={"13px"}>
          Delete
        </Typography>
      </Button>
    </GridToolbarContainer>
  );
}
const TableCustom = ({ rows, columns, loading, sortmodel }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  return (
    <Box>
      <Card variant="outlined" sx={{ margin: "1rem 0" }}>
        <CardContent>
          <Box sx={{ borderColor: "white", height: 404.5, padding: "1rem 0" }}>
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
              rowSelectionModel={rowSelectionModel}
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
