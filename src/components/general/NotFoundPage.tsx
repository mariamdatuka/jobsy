import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import MainButton from "./Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h1" fontWeight={700}>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" mb={3}>
        Page not found
      </Typography>
      <MainButton
        title="Go Home"
        variant="contained"
        onClick={() => navigate("/")}
      />
    </Box>
  );
};

export default NotFoundPage;
