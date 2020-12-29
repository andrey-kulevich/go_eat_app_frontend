import {useContext, useEffect, useState} from "react";
import {useObserver} from "mobx-react-lite";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {routes} from "../helpers/paths";
import {HomePage} from "../pages/HomePage";
import Login from "../pages/LoginPage";
import {useHttp} from "./useHttp";
import {WaitingPage} from "../pages/WaitingPage";
import {UserContext} from "../context/UserProvider";

export const useRoutes = () => {
    const {user, isAuth} = useContext(UserContext)
    const {request, loading} = useHttp()
    const [update, setUpdate] = useState<boolean>(true)

    // useEffect(() => {
    //     //document.location.reload()
    //     setUpdate(false)
    // },[update])

    return useObserver(() => (
        <Switch>
            {loading?
                <>
                    <Route exact path={routes.toWaitingPage}> <WaitingPage/> </Route>
                    <Redirect to={routes.toWaitingPage}/>
                </>:
                <>
                    {localStorage.getItem('isAuth') === 'true' ? <>
                        <Route exact path={routes.toHome}> <HomePage/> </Route>
                        {/*<Route exact path={routes.toHome}> <HomePage/> </Route>*/}
                        <Redirect to={routes.toHome}/>
                    </>:<>
                        <Route exact path={routes.toLogin}> <Login/> </Route>
                        <Redirect to={routes.toLogin}/>
                    </>}
                </>}
        </Switch>
    ))
}
