import React from "react";
import "./styles/styles.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <ProtectedRoute path="/home">
          <Dashboard />
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect exact from="/" to="home" />
        </Route>
        <Route path="*">
          <Redirect from="/" to="home" />
        </Route>
      </Switch>
    </Router>
  );
}