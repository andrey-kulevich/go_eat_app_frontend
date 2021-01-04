import React, {useContext, useEffect} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {routes} from "../helpers/paths";
import {HomePage} from "../pages/HomePage";
import Login from "../pages/LoginPage";
import {UserPage} from "../pages/UserPage";
import {UserContext} from "../context/UserProvider";
import {useObserver} from "mobx-react-lite";
import {useHttp} from "./useHttp";
import {requests} from "../helpers/requests";

export const useRoutes = () => {

    const {user, isAuth, setUser, setIsAuth} = useContext(UserContext)
    const {request} = useHttp()

    useEffect(() => {
        try {
            request(requests.login.url(localStorage.getItem('login') as string,
                localStorage.getItem('password') as string), requests.login.method, null)
                .then(data => {
                    setUser(data)
                    setIsAuth(true)
                })
        } catch (e) {}
    }, [])

    return useObserver(() => (
        <Switch>
            <Route exact path={routes.toHome}> <HomePage user={user}/> </Route>
            <Route exact path={routes.toLogin}> <Login/> </Route>
            <Route exact path={routes.userPage}> <UserPage/>  </Route>
            <Redirect to={routes.toHome}/>
        </Switch>
    ))
}
