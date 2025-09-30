import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate, useLocation } from "react-router";
import type { NavItems } from "@src/helpers/constanst";
import { useState } from "react";
import { useSidebarStore } from "@src/store/useSidebar";

const NavItem = ({ link, name, Icon }: NavItems) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setOpenLogoutModal] = useState(false);
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
        width: "100%",
        borderRadius: "50px",
        minHeight: 40,
        mb: 2,
        px: open ? 1 : 0,
        justifyContent: open ? "flex-start" : "center",
        backgroundColor: isActive ? theme.palette.primary.light : "transparent",
        color: "#fff",
        transition: "all 0.25s ease",
        "&:hover": {
          backgroundColor: "#fff",
          color: theme.palette.primary.main,
          "& .MuiListItemIcon-root": {
            color: theme.palette.primary.main,
          },
        },
        "& .MuiListItemIcon-root": {
          color: "#fff",
          transition: "color 0.25s ease",
          minWidth: open ? 40 : 0,
          mr: open ? 1 : 0,
          justifyContent: "center",
        },
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
