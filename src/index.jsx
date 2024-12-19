import "./index.css"; 
import { Router, Route } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./App";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "./contexts/UserContext";
import RoleRoute from "./security/RoleRoute";

const root = document.getElementById("root");

render(() => (
  <UserProvider>
    <Router>
      {/* Публичный маршрут */}
      <Route path="/login" component={LoginPage} />

      {/* Защищённый маршрут: доступен всем авторизованным */}
      <Route path="/profile" component={() => (
        <RoleRoute roles={["ROLE_USER", "ROLE_ADMIN"]}>
          <ProfilePage />
        </RoleRoute>
      )} />

      {/* Защищённый маршрут: доступен только админам */}
      <Route path="/form" component={() => (
        <RoleRoute roles={["ROLE_ADMIN"]}>
          <FormPage />
        </RoleRoute>
      )} />

      {/* Главная страница */}
      <Route path="/" component={App} />
    </Router>
  </UserProvider>
), root);
