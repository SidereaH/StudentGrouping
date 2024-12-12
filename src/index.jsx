import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";

const root = document.getElementById("root");

render(() => (
  <Router>
    <Route path="/" component={App} />
    <Route path="/form" component={FormPage} />
    <Route path="/login" component={LoginPage} />
  </Router>
), root);
