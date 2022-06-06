import React, { useEffect } from "react";
import { Route, Switch, useLocation, withRouter } from "react-router-dom";

// style
import "./styles/App.css";

import Footer from "./layout/Footer";

import Header from "./layout/Header";

import RouteNotFound from "./components/RouteNotFound";
import Airdrop from "./pages/Airdrop";
import StakeDrop from "./pages/StakeDrop";
import OsmosisClaimPage from "./pages/claim/OsmosisClaimPage";

import CalculationPage from "./pages/StakeDrop/CalculationPage";
import {initialize} from "./pages/Airdrop/utils/mantle";

const App = () => {
  const location = useLocation();
  initialize();

  // changing header
  const CURRENT_VERSION = process.env.REACT_APP_VERSION;
  if (localStorage.getItem("VERSION") !== CURRENT_VERSION) {
    localStorage.clear();
    localStorage.setItem("VERSION", CURRENT_VERSION);
    window.location.reload();
  }

  // scrolling to top on every page change
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const routes = [
    {
      component: Airdrop,
      path: "/",
    },
    {
      component: StakeDrop,
      path: "/stakedrop",
    },
    {
      component: CalculationPage,
      path: "/stakedrop/:id",
    },
    {
      component: OsmosisClaimPage,
      path: "/osmosis-claim",
    },
  ];

  return (
    <div className="app">
      <Header />
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
