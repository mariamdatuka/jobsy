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

export const columns = [
  {
    id: "SAVED",
    title: "Saved",
    color: "#e0e0e0",
  },
  {
    id: "APPLIED",
    title: "Applied",
    color: "#f8a83c ",
  },
  {
    id: "INTERVIEWING",
    title: "Interviewing",
    color: "#65cdfe",
  },
  {
    id: "REJECTED",
    title: "Rejected",
    color: "#e2435b",
  },
  {
    id: "OFFERED",
    title: "Offered",
    color: "#02c575",
  },
];
