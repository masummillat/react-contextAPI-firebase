import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from "../navigation/Index";
import LandingPage from '../landing/Index';
import SignUpPage from '../singup/Index';
import SignInPage from '../singin/Index';
import PasswordForgetPage from '../passwordforget/Index';
import HomePage from '../home/Index';
import AdminPage from '../admin/Index';
import * as Routes from '../constants/routes';
import AccountPage from "../accounts/Index";
import PageNotFound from '../pagenotfound/PageNotFound'
import withAuthentication from "../session/withAuthentication";
import PasswordChange from '../passwordchange/Index';


class App extends Component {


    render() {
        return (
            <Router >
                <div>
                    <Navigation/>
                    <hr/>
                    <Switch>
                        <Route exact path={Routes.LANDING} component={LandingPage}/>
                        <Route path={Routes.SIGN_UP} component={SignUpPage}/>
                        <Route path={Routes.SIGN_IN} component={SignInPage}/>
                        <Route path={Routes.PASSWORD_FORGET} component={PasswordForgetPage}/>
                        <Route path={Routes.HOME} component={HomePage}/>
                        {/*<Route path={Routes.} component={PasswordChange}/>*/}
                        <Route path={Routes.ACCOUNT} component={AccountPage}/>
                        <Route path={Routes.ADMIN} component={AdminPage}/>
                        <Route path='*' exact={true} component={PageNotFound} />
                    </Switch>

                </div>
            </Router>

        );
    }
}

export default withAuthentication(App);
