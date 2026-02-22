import { Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import useBreakpoints from "@src/hooks/useBreakpoints";

interface Props {
  title: string;
  value: number;
}

const SummuryCard = ({ title, value }: Props) => {
  const { isMediumOnly } = useBreakpoints();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      p={2}
      gap={1}
      width="250px"
      borderRadius="12px"
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Text
        variant={isMediumOnly ? "body1" : "h6"}
        sx={{ wordBreak: "break-word" }}
      >
        {title}
      </Text>
      <Text variant={isMediumOnly ? "h6" : "h5"} color="secondary.light">
        {value}
      </Text>
    </Stack>
  );
};

export default SummuryCard;
