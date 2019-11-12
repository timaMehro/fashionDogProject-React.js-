import * as React from "react";
import { Route, Switch } from "react-router";
import NotFound from "../views/NotFound";
import {AppProtected} from "../views/protected/AppProtected";
import AppPublic from "../views/public/AppPublic";

const routes = (
    <Route >
        <Switch>
            <Route path="/admin" component={AppProtected} />
            <Route exact path="/" component={AppPublic} />
            <Route component={NotFound} />
        </Switch>
    </Route>


);

export default routes;
