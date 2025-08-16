import NiceModal from "@ebay/nice-modal-react";
import { SIGNUP_SUCCESS_MODAL } from "./modal_names";
import SignUpSuccessModal from "./modals/SignUpSuccessModal";

NiceModal.register(SIGNUP_SUCCESS_MODAL, SignUpSuccessModal);
