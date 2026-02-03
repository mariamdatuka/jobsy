import { Stack } from "@mui/material";
import Text from "./Text";

export type Status =
  | "applied"
  | "saved"
  | "interviewing"
  | "rejected"
  | "offered";

type Props = {
  status: Status;
};

const statusStyles: Record<
  Status,
  { text: string; border: string; bg: string; label: string }
> = {
  offered: {
    text: "#1B5E20",
    border: "#81C784",
    bg: "#E8F5E9",
    label: "Offered",
  },
  rejected: {
    text: "#B71C1C",
    border: "#E57373",
    bg: "#FFEBEE",
    label: "Rejected",
  },
  applied: {
    text: "#E65100",
    border: "#FFB74D",
    bg: "#FFF3E0",
    label: "Applied",
  },
  interviewing: {
    text: "#0D47A1",
    border: "#64B5F6",
    bg: "#E3F2FD",
    label: "Interviewing",
  },
  saved: {
    text: "#4a4c4e",
    border: "#1b1e20",
    bg: "#E3F2FD",
    label: "Saved",
  },
};

const StatusColor = ({ status }: Props) => {
  const styles = statusStyles[status];

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      borderRadius="5px"
      border={`1px solid ${styles.border}`}
      bgcolor={styles.bg}
      maxWidth="100px"
      py="2px"
    >
      <Text color={styles.text}>{styles.label}</Text>
    </Stack>
  );
};

export default StatusColor;
