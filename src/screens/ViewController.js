import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/dashboard";
import Search from "./search/Search";
import Report from "./report/Report";

const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path={["/dashboard", "/"]}
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />

      <Route
          exact
          path={["/search"]}
          render={(props) => <Search {...props} baseUrl={baseUrl} />}
        />

      <Route
          exact
          path={["/report"]}
          render={(props) => <Report {...props} baseUrl={baseUrl} />}
        />
      
      </div>
    </Router>
  );
};

export default Controller;
