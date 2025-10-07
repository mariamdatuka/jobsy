import { Box, Stack, styled } from "@mui/material";
import Card from "./Card";

interface Column {
  title: string;
  color: string;
}

const ColumnContainer = ({ column }: { column: Column }) => {
  return (
    <>
      <Box>
        <Title bgcolor={column.color}>{column.title}</Title>
        <ColumnBox>
          <Card />
        </ColumnBox>
      </Box>
    </>
  );
};

export default ColumnContainer;

const Title = styled(Box)<{ bgcolor: string }>(({ bgcolor, theme }) => ({
  fontSize: "14px",
  backgroundColor: bgcolor,
  padding: "10px 16px",
  color: "#ffffff",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
}));

const ColumnBox = styled(Stack)({
  height: "30vh",
  padding: "12px",
  width: "250px",
  backgroundColor: "#f5f7f9",
  overflowY: "scroll",
  scrollbarWidth: "none",
});
