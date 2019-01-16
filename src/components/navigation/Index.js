import React from 'react';
import {Link} from "react-router-dom";

import * as ROUTES from '../constants/routes';
import SignOut from "../signout/Index";
import { AuthUserContext } from '../session';

const Navigation = () =>(
<AuthUserContext.Consumer>
    {authUser=> authUser ? <NavigationAuth/>: <NavigationNonAuth/>}
</AuthUserContext.Consumer>
)
const NavigationAuth = ()=>(
    <ul>

        <li>
            <Link to={ROUTES.SIGN_UP}>Sing Up</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
            <SignOut/>
        </li>
    </ul>
)
const NavigationNonAuth = ()=>(
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sing In</Link>
        </li>

    </ul>
)
export default Navigation;