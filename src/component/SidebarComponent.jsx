import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PaymentIcon from "@mui/icons-material/Payment";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SchoolIcon from "@mui/icons-material/School";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MosqueIcon from "@mui/icons-material/Mosque";
import PaidIcon from "@mui/icons-material/Paid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactsIcon from "@mui/icons-material/Contacts";
import RepeatIcon from "@mui/icons-material/Repeat";
import ClassIcon from "@mui/icons-material/Class";
import { useSelector } from "react-redux";
const SidebarComponent = () => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const Role = useSelector((state) => state.role);
  return (
    <Sidebar
      backgroundColor="white"
      style={{
        minHeight: "100vh",
        maxHeight: "max-content",
      }}
      collapsedWidth="70px"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          padding: collapsed ? "10px 0 10px 8px" : "10px",
        }}
      >
        <IconButton
          onClick={() => collapseSidebar()}
          sx={{ boxShadow: 0, color: "#53c79e" }}
        >
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Box>
      <Menu
        menuItemStyles={{
          button: () => {
            return {
              color: "#53c79e",
              backgroundColor: "white",
            };
          },
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <Typography
            variant="h4"
            id="nameside"
            textAlign={"center"}
            color={"#53c79e"}
          >
            {collapsed ? (
              ""
            ) : (
              <div>
                Yayasan
                <br />
                Nurul Ilmi Aini
              </div>
            )}
          </Typography>
        </div>
        <MenuItem
          active={window.location.pathname === "/kelas"}
          icon={<ClassIcon />}
          component={<Link to="/kelas" />}
        >
          Daftar Kelas
        </MenuItem>
        <MenuItem
          active={window.location.pathname === "/siswa"}
          icon={<ContactsIcon />}
          component={<Link to="/siswa" />}
        >
          Data Siswa
        </MenuItem>
        <SubMenu
          label="Pembayaran"
          icon={<PaidIcon />}
          //  defaultOpen={true}
        >
          <MenuItem
            active={window.location.pathname === "/Pembayaran/spp"}
            icon={<PaymentIcon />}
            component={<Link to="/Pembayaran/spp" />}
          >
            SPP
          </MenuItem>

          <MenuItem
            active={window.location.pathname === "/Pembayaran/komite"}
            icon={<PriceCheckIcon />}
            component={<Link to="/Pembayaran/komite" />}
          >
            Komite
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/Pembayaran/daftar"}
            icon={<HowToRegIcon />}
            component={<Link to="/Pembayaran/daftar" />}
          >
            Pendaftaran
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/Pembayaran/daftarulang"}
            icon={<RepeatIcon />}
            component={<Link to="/Pembayaran/daftarulang" />}
          >
            Daftar Ulang
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/Pembayaran/les"}
            icon={<SchoolIcon />}
            component={<Link to="/Pembayaran/les" />}
          >
            les
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/Pembayaran/lesun"}
            icon={<SchoolIcon />}
            component={<Link to="/Pembayaran/lesun" />}
          >
            les UN
          </MenuItem>

          <MenuItem
            active={window.location.pathname === "/Pembayaran/ekskul"}
            icon={<SportsSoccerIcon />}
            component={<Link to="/Pembayaran/ekskul" />}
          >
            Ekskul
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/Pembayaran/qurban"}
            icon={<MosqueIcon />}
            component={<Link to="/Pembayaran/qurban" />}
          >
            Qurban
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/Pembayaran/buku"}
            icon={<MenuBookIcon />}
            component={<Link to="/Pembayaran/buku" />}
          >
            Buku
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/Pembayaran/pakaian"}
            icon={<CheckroomIcon />}
            component={<Link to="/Pembayaran/pakaian" />}
          >
            Pakaian
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Laporan"
          icon={<AssignmentIcon />}
          // defaultOpen={true}
        >
          <MenuItem
            active={window.location.pathname === "/Laporan/harian"}
            icon={<TodayIcon />}
            component={<Link to="/Laporan/harian" />}
          >
            Harian
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/Laporan/bulanan"}
            icon={<CalendarMonthIcon />}
            component={<Link to="/Laporan/bulanan" />}
          >
            Bulanan
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
