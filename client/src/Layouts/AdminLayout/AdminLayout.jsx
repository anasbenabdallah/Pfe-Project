import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./Navbar/AdminNavbar";
import AdminDrawer from "./Drawer/AdminDrawer";
import { Box, Toolbar, useMediaQuery } from "@mui/material";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <Box sx={{ display: "flex", width: "100%" }}>
        <AdminDrawer />
        <Box
          component="main"
          sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}
        >
          {children}
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
