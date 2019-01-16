import React from 'react';
import PasswordForgetPage from "../passwordforget/Index";
import PasswordChangeForm from "../passwordchange/Index";
import withAuthorization from "../session/withAuthorization";
import AuthUserContext from '../session/context';
const AccountPage = ()=>(
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Account {authUser.email}</h1>
                <PasswordForgetPage/>
                <hr/>
                <PasswordChangeForm/>
            </div>
        )}
    </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);