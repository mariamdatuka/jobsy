import { Box, Stack, styled, Typography } from "@mui/material";
import Card from "./Card";
import Text from "@src/components/general/Text";

interface Column {
  title: string;
  color: string;
}

const ColumnContainer = ({ column }: { column: Column }) => {
  return (
    <>
      <Box width="250px">
        <TitleBox bgcolor={column.color}>
          <Text variant="body2" color="#fff">
            {column.title}
          </Text>
          <Typography component="span" color="#fff">
            /
          </Typography>
          <Text color="#fff">3</Text>
        </TitleBox>
        <ColumnBox>
          <Card />
        </ColumnBox>
      </Box>
    </>
  );
};

export default ColumnContainer;

const TitleBox = styled(Stack)<{ bgcolor: string }>(({ bgcolor, theme }) => ({
  backgroundColor: bgcolor,
  padding: "10px 16px",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  flexDirection: "row",
  gap: "8px",
  alignItems: "center",
}));

const ColumnBox = styled(Stack)({
  height: "450px",
  maxHeight: "450px",
  padding: "12px",
  backgroundColor: "#f5f7f9",
  overflowY: "scroll",
  scrollbarWidth: "none",
});
