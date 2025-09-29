import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate, useLocation } from "react-router";
import type { NavItems } from "@src/helpers/constanst";
import { useState } from "react";
import { useSidebarStore } from "@src/store/useSidebar";

const NavItem = ({ link, name, Icon }: NavItems) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { open } = useSidebarStore((state) => state);
  const isActive = link && location.pathname === link;
  const handleClick = () => {
    if (name === "Logout") {
      console.log("modal");
      setOpenLogoutModal(true);
    } else if (link) {
      navigate(link);
    }
  };
  return (
    <ListItemButton
      onClick={handleClick}
      sx={(theme) => ({
        width: "100%", // full width
        borderRadius: "50px",

        backgroundColor: isActive ? theme.palette.primary.light : "transparent",
        color: isActive ? "#fff" : theme.palette.primary.main,
        transition: "all 0.25s ease",
        "&:hover": {
          backgroundColor: "#fff",
          color: theme.palette.primary.main,
          "& .MuiListItemIcon-root": {
            color: theme.palette.primary.main,
          },
        },
        "& .MuiListItemIcon-root": {
          color: isActive ? "#fff" : theme.palette.text.primary,
          transition: "color 0.25s ease",
        },
        // "&.MuiListItemButton-gutters": {
        //   paddingTop: "0",
        //   paddingBottom: "0",
        //   paddingLeft: "5px",
        //   margin: "0",
        // },
      })}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      {open && <ListItemText primary={name} />}
    </ListItemButton>
  );
};

export default NavItem;
