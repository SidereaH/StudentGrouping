import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import { createSignal } from "solid-js";
import ProfilePage from "./pages/ProfilePage";

const root = document.getElementById("root");
const [isAuthenticated, setIsAuthenticated] = createSignal(true);

render(() => (
  <Router>
    <Route path="/" component={App} />
    <Route path="/form" component={FormPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/profile" component={ProfilePage} />
  </Router>
), root);
