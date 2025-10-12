import { useTheme, useMediaQuery } from "@mui/material";

const useBreakpoints = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSmallDesktop = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isMediumDesktop = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  return {
    isMobile,
    isTablet,
    isSmallDesktop,
    isMediumDesktop,
    isLargeDesktop,
  };
};

export default useBreakpoints;
