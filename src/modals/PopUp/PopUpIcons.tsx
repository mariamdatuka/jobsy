import type { PopupIconTypeProps } from "@src/types/PopUpTypes";
import success from "@src/assets/IconSuccess.svg";

const PopUpIcons = ({ type }: { type: PopupIconTypeProps }) => {
  const getIcon = (type: PopupIconTypeProps) => {
    switch (type) {
      case "success":
        return {
          Icon: <img src={success} alt="success" width={40} height={40} />,
        };
    }
  };
  return <>{type === "success" && getIcon(type)?.Icon}</>;
};

export default PopUpIcons;
