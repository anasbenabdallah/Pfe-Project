import { IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
//;
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const SocialMediaSection = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="h5">SOCIAL MEDIA</Typography>
      <Stack direction={"row"}>
        {Icons.map((list) => (
          <div key={list.id}>
            <IconButton
              target="_blank"
              color="primary"
              component="a"
              href="https://github.com/yopex-official/yopex"
              sx={{
                transition: "transform 0.2s ease-out",

                "&:hover": {
                  transform: "translate(0px, -20%)",
                },
              }}
            >
              <list.icon />
            </IconButton>
          </div>
        ))}
      </Stack>
    </Stack>
  );
};

const Icons = [
  {
    id: 1,
    name: "Github",
    description: "icon",
    icon: GitHubIcon,
  },
  {
    id: 2,
    name: "instagram",
    description: "icon",
    icon: InstagramIcon,
  },
  {
    id: 3,
    name: "Linkedin",
    description: "icon",
    icon: LinkedInIcon,
  },
];
