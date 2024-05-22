import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BannerContainer = styled(Box)(() => ({
  width: "100%",
  maxHeight: "219px",
  overflow: "hidden",
  position: "relative",
}));

export const BannerImage = styled("img")(({ src }) => ({
  src: `url(${src})`,
  width: "100%",
}));
