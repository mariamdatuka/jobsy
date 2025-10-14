import { Box, Divider, Stack, styled } from "@mui/material";
import { KebabMenu } from "@src/assets/icons/KebabMenu";
import Text from "@src/components/general/Text";
import theme from "@src/theme";

const JobCard = () => {
  const appliedDate = true;
  return (
    <JobContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Text variant="body2" fontWeight="600">
          Microsoft
        </Text>
        <KebabMenu />
      </Stack>
      <Text variant="caption" color={theme.palette.secondary.light}>
        Frontend Developer
      </Text>
      <Divider sx={{ borderColor: "#eceef2", my: 1.2 }} />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {appliedDate && (
          <Text variant="caption" color={theme.palette.secondary.dark}>
            25 Dec 2025
          </Text>
        )}

        <CountryTag>USA</CountryTag>
      </Stack>
    </JobContainer>
  );
};

export default JobCard;

const JobContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "10px 14px",
  border: "1px solid #eceef2",
  borderRadius: "12px",
  gap: "4px",
}));

const CountryTag = styled(Box)(({ theme }) => ({
  backgroundColor: "#F2F4F7",
  color: theme.palette.secondary.dark,
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
  fontWeight: 500,
}));
