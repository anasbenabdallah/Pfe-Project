import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CustomNavbar from "./Navbar/CustomNavbar";

//render the data under the navbar
import { Outlet, useNavigate } from "react-router-dom";

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  return (
    <div>
      <Box>
        <CustomNavbar />
        <Outlet />
      </Box>
    </div>
  );
};

export default MainLayout;
