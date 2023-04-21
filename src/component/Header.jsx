import { Box, Divider, Typography, Button, Link, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buttonSX } from "../buttonsx";
import AddIcon from "@mui/icons-material/Add";
import { login } from "../Redux/Reducer/Reducer";
// import DeleteIcon from "@mui/icons-material/Delete";
const Header = ({ title, button_tambah, idkelas }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlebuttonTambah = () => {
    if (!idkelas) {
      navigate(window.location.pathname + "/tambah");
    } else {
      navigate(window.location.pathname + "/tambah/" + idkelas);
    }
  };
  return (
    <Box>
      <Grid container>
        <Grid item xs={6}>
          <Typography
            id="header"
            variant="p"
            color={"#53c79e"}
            fontStyle={"italic"}
            className="new-line"
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Link
            className="logout"
            onClick={() => {
              dispatch(login());
            }}
          >
            logout
          </Link>
        </Grid>
      </Grid>
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
        {button_tambah && (
          <Button sx={buttonSX} onClick={handlebuttonTambah}>
            <AddIcon /> Tambah
          </Button>
        )}
        {/* {button_delete && (
          <Button
            sx={buttonSXdelete}
            onClick={() => {
              dispatch(login());
            }}
          >
            <DeleteIcon /> Hapus
          </Button>
        )} */}
      </Box>
      <Divider sx={{ margin: "0.5rem 1rem 1rem 1rem", borderWidth: "1.5px" }} />{" "}
    </Box>
  );
};

export default Header;
