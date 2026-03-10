import MainButton from "../general/Button";
import { formatTime } from "@src/helpers/helpers";
import Text from "../general/Text";

const ResendCode = ({
  coolDown,
  handleResendOtp,
}: {
  coolDown: number;
  handleResendOtp: any;
}) => {
  return (
    <>
      {coolDown > 0 ? (
        <>
          <Text variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
            Didn't receive code? Resend in {formatTime(coolDown)}
          </Text>
        </>
      ) : (
        <MainButton
          variant="text"
          size="small"
          onClick={handleResendOtp}
          title="resend code"
        />
      )}
    </>
  );
};

export default ResendCode;
