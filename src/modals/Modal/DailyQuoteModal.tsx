import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import { useSupabaseQuery } from "@src/hooks/useSupabaseQuery";
import { getDailyQuote } from "@src/services/getDailyQuote";
import { QKEY_QUOTE } from "@src/services/queryKeys";
import quoteIcon from "@src/assets/icons/quotation-mark.svg";
import Text from "@src/components/general/Text";
import { Stack } from "@mui/material";
import octobus from "@src/assets/images/octopus.png";
import Spinner from "@src/components/animations/Spinner";

const DailyQuoteModal = NiceModal.create(() => {
  const { visible, hide } = useModal();
  const { data, isLoading } = useSupabaseQuery([QKEY_QUOTE], getDailyQuote);

  const handleDoNotShowAgain = () => {
    localStorage.setItem("hide_quote_today", new Date().toDateString());
    hide();
  };

  return (
    <PopUp
      title="Your Daily Quote"
      open={visible}
      onClose={hide}
      children={
        <Content
          data={data}
          isLoading={isLoading}
          handleDoNotShowAgain={handleDoNotShowAgain}
        />
      }
      showActionSection={false}
    />
  );
});

export default DailyQuoteModal;

export const Content = ({
  data,
  isLoading,
  handleDoNotShowAgain,
}: {
  data: any;
  isLoading: boolean;
  handleDoNotShowAgain: () => void;
}) => {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Stack alignItems="center">
          <Stack direction="row" gap={2} alignItems="flex-start">
            <img src={quoteIcon} alt="icon" width="50px" height="50px" />
            <Text
              variant="body2"
              color="secondary.light"
              sx={{ mt: 3, fontFamily: "Viga", fontStyle: "italic" }}
            >
              {data?.q}
            </Text>
          </Stack>
          <img src={octobus} alt="octobus" width="120px" height="120px" />
          <Text
            variant="body2"
            color="secondary.light"
            sx={{ cursor: "pointer" }}
            onClick={handleDoNotShowAgain}
          >
            Do not show again today
          </Text>
        </Stack>
      )}
    </>
  );
};
