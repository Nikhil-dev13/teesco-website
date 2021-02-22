//Utils
import ApiClient from "../../utils/ApiClient";
import { makeErrorDict } from "../../utils/ApiUtils";
import CustomHistory from "../../utils/CustomHistory";
import { storeUserToken } from "../../utils/Token";

//Types
import * as authTypes from "./types";

//SetLoading state
export const setLoadingAction = (loading) => (dispatch) => {
  dispatch({
    type: authTypes.SET_LOADING,
    payload: loading,
  });
};

//Set and clear error
export const setErrorAlert = (errors, timeout=3000) => (dispatch) => {
  //Generate random number for error tracking and removing
  const id = Math.floor((Math.random() * 10000000) + 1);
  //Make Error Object
  const error  = { ...errors, ...id };
  dispatch({
    type: authTypes.SET_AUTH_ERROR,
    payload: error
  })
  //Clear error after timeout provided
  setTimeout(() => dispatch({ type: authTypes.REMOVE_AUTH_ERROR }), timeout)
}

//Login User
export const loginAction = (email, password) => (dispatch) => {// import rootReducer from "../reducers";
  dispatch(setLoadingAction(true));
  ApiClient()
    .post("/users/login/", {
      email,
      password,
    })
    .then((response) => {
      storeUserToken(response.data.token);
      CustomHistory.push("/orgs");
    })
    .catch((err) => {
      dispatch(setErrorAlert(makeErrorDict(err)));
      dispatch({ type: authTypes.LOGIN_ERROR });
    })
    .finally(() => {
      dispatch(setLoadingAction(false));
    });
};
