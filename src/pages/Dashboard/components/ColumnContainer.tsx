import { Box, Stack, styled } from "@mui/material";

const columns = ["saved", "applied", "interviewing", "rejected", "offered"];

const ColumnContainer = ({
  title,
  color,
}: {
  title: string;
  color: string;
}) => {
  return (
    <>
      <Title bgcolor={"#65cdfe"}>Saved</Title>
      <Stack bgcolor="#f5f7f9" height="60vh" padding={2} width="250px"></Stack>
    </>
  );
};

export default ColumnContainer;

const Title = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  fontSize: "14px",
  backgroundColor: bgcolor,
  color: "#333",
  padding: "10px 12px",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
}));
