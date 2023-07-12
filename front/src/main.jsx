import Provider from "./context/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Panel from "./pages/panel";
import { Switch, Route, Redirect } from "wouter";
import Guard from "./components/Guarda";
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";
const Main = () => {
  return (
    <Provider>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/">
          <Guard component={Panel} />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
