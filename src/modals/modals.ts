import NiceModal from "@ebay/nice-modal-react";
import {
  SIGNUP_SUCCESS_MODAL,
  LOGOUT_MODAL,
  ADD_JOB_MODAL,
  DELETE_JOB_MODAL,
} from "./modal_names";
import SignUpSuccessModal from "./Modal/SignUpSuccessModal";
import LogoutModal from "./Modal/LogoutModal";
import AddJobModal from "./Modal/AddJobModal";
import DeleteCardModal from "./Modal/DeleteCardModal";

NiceModal.register(SIGNUP_SUCCESS_MODAL, SignUpSuccessModal);
NiceModal.register(LOGOUT_MODAL, LogoutModal);
NiceModal.register(ADD_JOB_MODAL, AddJobModal);
NiceModal.register(DELETE_JOB_MODAL, DeleteCardModal);
