import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
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
const SidebarComponent = () => {
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <Sidebar style={{ height: "100vh" }} collapsedWidth="70px">
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          padding: "10px",
        }}
      >
        <IconButton
          onClick={() => collapseSidebar()}
          color="primary"
          sx={{ boxShadow: 0 }}
        >
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Box>
      <Menu
        iconShape="square"
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0 || level === 1)
              return {
                color: disabled ? "#f5d9ff" : "#d359ff",
                backgroundColor: active ? "#eecef9" : undefined,
              };
          },
        }}
      >
        <div style={{ padding: "0 24px", marginBottom: "8px" }}>
          <Typography
            variant="body2"
            fontWeight={600}
            style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
          >
            General
          </Typography>
        </div>
        <SubMenu label="Charts" icon={<MenuOutlinedIcon />}>
          <MenuItem>
            <IconButton>
              <MenuOutlinedIcon />
            </IconButton>
          </MenuItem>
        </SubMenu>
        <MenuItem
          active={window.location.pathname === "/"}
          icon={<MenuOutlinedIcon />}
          component={<Link to="/" />}
        >
          dashboard
        </MenuItem>
        <MenuItem
          active={window.location.pathname === "/Home"}
          icon={<MenuOutlinedIcon />}
          component={<Link to="/Home" />}
        >
          Home
        </MenuItem>
        <MenuItem
          active={window.location.pathname === "/Home"}
          icon={<MenuOutlinedIcon />}
          component={<Link to="/Home" />}
        >
          Home
        </MenuItem>
        <MenuItem
          active={window.location.pathname === "/Home"}
          icon={<MenuOutlinedIcon />}
          component={<Link to="/Home" />}
        >
          Home
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
