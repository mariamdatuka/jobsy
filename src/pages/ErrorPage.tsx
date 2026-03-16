import { Box, Typography } from "@mui/material";
import MainButton from "@src/components/general/Button";
import { useNavigate, useRouteError } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError() as any; // react router hook to get the error

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={2}
    >
      <Typography variant="h1" fontWeight={700}>
        Oops!
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Something went wrong
      </Typography>
      <Typography variant="body2" color="text.secondary">
        An unexpected error occurred
      </Typography>
      <MainButton
        title="Go Home"
        variant="contained"
        onClick={() => navigate("/")}
      />
    </Box>
  );
};

export default ErrorPage;
