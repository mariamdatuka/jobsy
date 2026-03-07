import { Box, CircularProgress } from "@mui/material";

interface LoadingOverlaySpinnerProps {
  loading: boolean;
  children: React.ReactNode;
}

const LoadingOverlaySpinner = ({
  loading,
  children,
}: LoadingOverlaySpinnerProps) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {children}

      {loading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(1px)",
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default LoadingOverlaySpinner;
