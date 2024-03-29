import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    //leer props

    const { user } = useContext( AuthContext );
    console.log(user);

    return (
        <Router>
            <div>  
                <Switch>
                    <PublicRoute 
                        exact path="/login" 
                        component={ LoginScreen } 
                        isAutenticated = {user.logged}
                    />
                    
                    <PrivateRoute 
                        path="/" 
                        component={ DashboardRoutes } 
                        isAutenticated = {user.logged}
                    />
                </Switch>
            </div>
      </Router>
    )
}
