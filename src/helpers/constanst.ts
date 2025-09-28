import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

interface Items {
  name: string;
  link?: string;
  icon: React.ElementType;
}

export const navItems: Items[] = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: ExploreOutlinedIcon,
  },
  {
    name: "Analytics",
    link: "/analytics",
    icon: AssessmentOutlinedIcon,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: AccountCircleOutlinedIcon,
  },
  {
    name: "Logout",
    icon: LogoutOutlinedIcon,
  },
];
