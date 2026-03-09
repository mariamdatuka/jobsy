import { useFormContext, Controller } from "react-hook-form";
import { InputOTP, REGEXP_ONLY_DIGITS } from "@heroui/react";
import Text from "../general/Text";

const OTP = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="code"
      control={control}
      render={({ field, fieldState }) => (
        <>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={field.value}
            onChange={field.onChange}
            isInvalid={!!fieldState.error}
          >
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
            </InputOTP.Group>

            <InputOTP.Group>
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>

          {fieldState.error && (
            <Text variant="body2" color="error.main">
              {fieldState.error.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default OTP;
