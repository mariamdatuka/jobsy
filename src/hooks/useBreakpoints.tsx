import { useTheme, useMediaQuery } from "@mui/material";

const useBreakpoints = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSmallDesktop = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isMediumDesktop = useMediaQuery(theme.breakpoints.between("lg", "xxl"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("xxl"));
  const isTabletOnly = useMediaQuery(theme.breakpoints.down("md"));
  const isReallyTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const isMediumOnly = useMediaQuery(theme.breakpoints.down("lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("xl"));

  return {
    isMobile,
    isTablet,
    isSmallDesktop,
    isMediumDesktop,
    isLargeDesktop,
    isTabletOnly,
    isMediumOnly,
    isReallyTablet,
    isDesktop,
  };
};

export default useBreakpoints;
