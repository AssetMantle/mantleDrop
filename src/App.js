import React, { useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// style
import "./styles/App.css";

import Header from "./layout/Header";
import RouteNotFound from "./components/RouteNotFound";
import Footer from "./layout/Footer";
import Home from "./pages/Home";

const App = () => {
  const [theme, setTheme] = useState(false);

  const routes = [
    {
      component: Home,
      path: "/",
    },
  ];

  return (
    <div className="app">
      <Header theme={theme} setTheme={setTheme} />

      <Switch>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              exact
              component={withRouter(route.component)}
              path={route.path}
            />
          );
        })}
        <Route component={RouteNotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default withRouter(App);
