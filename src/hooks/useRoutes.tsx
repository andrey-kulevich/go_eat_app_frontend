import React, {useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {routes} from "../helpers/paths";
import {HomePage} from "../pages/HomePage";
import Login from "../pages/LoginPage";
import {UserContext} from "../context/UserProvider";
import {WaitingPage} from "../pages/WaitingPage";
import {useObserver} from "mobx-react-lite";
import {useHttp} from "./useHttp";

export const useRoutes = () => {

    const {user, isAuth} = useContext(UserContext)
    const {loading} = useHttp()

    console.log(isAuth)

    return useObserver(() => (
        <Switch>
            <Route exact path={routes.toHome}> <HomePage user={user}/> </Route>
            <Route exact path={routes.toLogin}> <Login/> </Route>
        </Switch>
    ))
}
