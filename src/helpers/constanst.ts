import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export interface NavItems {
  name: string;
  link?: string;
  Icon: React.ElementType;
}

export const navItems: NavItems[] = [
  {
    name: "Dashboard",
    link: "/dashboard",
    Icon: ExploreOutlinedIcon,
  },
  {
    name: "Analytics",
    link: "/analytics",
    Icon: AssessmentOutlinedIcon,
  },
  {
    name: "Profile",
    link: "/profile",
    Icon: AccountCircleOutlinedIcon,
  },
  {
    name: "Logout",
    Icon: LogoutOutlinedIcon,
  },
];
