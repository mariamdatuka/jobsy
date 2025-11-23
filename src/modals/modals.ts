import NiceModal from "@ebay/nice-modal-react";
import { SIGNUP_SUCCESS_MODAL, LOGOUT_MODAL } from "./modal_names";
import SignUpSuccessModal from "./Modal/SignUpSuccessModal";
import LogoutModal from "./Modal/LogoutModal";

NiceModal.register(SIGNUP_SUCCESS_MODAL, SignUpSuccessModal);
NiceModal.register(LOGOUT_MODAL, LogoutModal);
