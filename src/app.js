import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";
import AppRouter, { history } from "./routers/AppRouter";
import configurStore from "./store/configureStore";
import "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";
import { firebase } from "./firebase/firebase";
import { render } from "enzyme";
import { login, logout } from "./actions/auth";

const store = configurStore();

//normalize ensures all browser starts at the same base
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/dashboard"); //only do when they are on the login page
    } //
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
}); //takes call back function, and
// runs the call back function when the authentication status changed
