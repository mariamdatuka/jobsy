import fireyellow from "@src/assets/icons/fireyellow.svg";
import { Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import dayjs from "dayjs";

interface MaxStreakProps {
  longest_streak: number;
  start_date: string | null;
  end_date: string;
}
const MaxStreak = ({
  longest_streak,
  start_date,
  end_date,
}: MaxStreakProps) => {
  const startDateFormatted = start_date
    ? dayjs(start_date).format("MM.YY")
    : "";
  const endDateFormatted = end_date ? dayjs(end_date).format("MM.YY") : "";
  return (
    <Stack
      ml={8}
      width="300px"
      height="200px"
      alignItems="center"
      gap={1}
      justifyContent="center"
      sx={{
        background: "linear-gradient(135deg, #ffeaea, #ffd6d6)",
        borderRadius: "20px",
        padding: 3,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={fireyellow}
        alt="Fire Yellow"
        style={{ width: 50, height: 50 }}
      />
      <Text variant="body1" color="error.light">
        Applying Longest Streak
      </Text>
      <Text variant="h6" fontWeight={700} color="error.light">
        {longest_streak === 1
          ? `${longest_streak} Day`
          : `${longest_streak} Days`}
      </Text>
      <Text variant="body2" color="secondary.light">
        {startDateFormatted && endDateFormatted}
      </Text>
    </Stack>
  );
};

export default MaxStreak;
