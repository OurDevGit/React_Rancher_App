import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadSettings } from "./actions/settings";
import { loadMe } from "./actions/user";
import { loadLocales } from "./actions/language";

import Login from "./containers/Auth/Login";
import Global from "./containers/Global";
import Apps from "./containers/Apps";
import Settings from "./containers/Settings";
import Cluster from "./containers/Cluster"

import "./styles/index.scss";
import "@duik/it/dist/styles.css";
import "@duik/icon/dist/styles.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSettings());
    dispatch(loadLocales("en-us", "vmaster-dev"));
    dispatch(loadMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/g" component={Global} />
          <Route path="/login" component={Login} />
          <Route path="/c/:id" component={Cluster} />
          <Route path="/apps" component={Apps} />
          <Route path="/settings" component={Settings} />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
