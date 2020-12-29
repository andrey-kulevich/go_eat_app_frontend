import {useContext, useEffect, useState} from "react";
import {useObserver} from "mobx-react-lite";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {routes} from "../helpers/paths";
import {HomePage} from "../pages/HomePage";
import Login from "../pages/LoginPage";
import {requests} from "../helpers/requests";
import {useHttp} from "./useHttp";
import {WaitingPage} from "../pages/WaitingPage";
import {UserContext} from "../context/UserProvider";

export const useRoutes = () => {
    const {user, isAuth} = useContext(UserContext)
    const {request, loading} = useHttp()
    const [rand, setRand] = useState<number>(0)

    useEffect(() => {
        const auth = localStorage.getItem('isAuth')
        if (auth === 'true') setRand(Math.random)
        else setRand(Math.random)
    },[localStorage.getItem('isAuth')])

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
