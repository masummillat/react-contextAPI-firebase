import React from 'react';
import withAuthorization from "../session/withAuthorization";
import {withFirebase} from "../firebase";
import withEmailVerification from "../session/withEmailVerification";
import {compose} from 'recompose'
const HomePage = ()=>(
    <div>
        Home
        <p>The home page is accessible by every signed in User</p>
    </div>
)

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
    )(HomePage);