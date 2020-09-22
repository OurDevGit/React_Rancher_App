import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSettings } from "./actions/settings";
import { loadMe } from "./actions/user";
import { loadLocales } from "./actions/language";

import Login from "./containers/Auth/Login";
import Dashboard from "./containers/Dashboard";

import "./styles/index.scss";
import "@duik/it/dist/styles.css";
import "@duik/icon/dist/styles.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadSettings());
      dispatch(loadLocales("en-us", "vmaster-dev"));
      dispatch(loadMe());
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
