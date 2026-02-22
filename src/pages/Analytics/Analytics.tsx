import AnalyticsHeader from "./components/AnalyticsHeader";
import { Stack } from "@mui/material";
import SummerySection from "./components/SummerySection";

const Analytics = () => {
  return (
    <>
      <AnalyticsHeader />
      <Stack pt={5}>
        <SummerySection />
      </Stack>
    </>
  );
};

export default Analytics;
