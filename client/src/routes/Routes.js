import React, { Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./History";
import * as LazyComponent from "../utils/LazyLoaded";
import Loader from "../components/Loader";

const Routes = (
  <Suspense fallback={<div className="mt-100"><Loader /></div>}>
    <Router history={history}>
      <Switch>
        <LazyComponent.ProjectsList path="/" exact />
        <LazyComponent.RolesList path="/roles" exact />
        <LazyComponent.ProjectsList path="/projects" exact />
        <LazyComponent.ProjectAdd path="/projects/add" exact />
        <Route path="/projects/edit/:projectId">
          <LazyComponent.ProjectEdit />
        </Route>
        <LazyComponent.UsersList path="/users" exact />
        <LazyComponent.NotFound path="**" title="This page doesn't exist..." exact />
      </Switch>
    </Router>
  </Suspense>
);

export default Routes;
