import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";
import ProfileMenu from "./components/ProfileMenu";
import NotificationBell2 from "./components/NotificationCompany";
import Chat from "./components/Chat";
import AddPostMenuList from "./components/AddPost/AddPostMenuList";
import NotificationBell from "./components/Notifications/Notification";

const MenuIcons = ({ color = "purple" }) => {
  // Default to purple if no color is provided
  const role = JSON.parse(localStorage.getItem("user")).role;

  return (
    <div>
      <Box sx={{ display: { xs: "none", sm: "flex", alignItems: "center" } }}>
        <AddPostMenuList color={color} />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Chat color={color} />
        {role === "tester" ? (
          <NotificationBell2 color={color} />
        ) : (
          <NotificationBell color={color} />
        )}
        <ProfileMenu color={color} />
      </Box>
    </div>
  );
};

export default MenuIcons;
