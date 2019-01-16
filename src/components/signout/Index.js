import React from 'react';
import {withFirebase} from "../firebase";

const SignOut = ({firebase})=>(
    <button type="button" onClick={firebase.doSignOut}>Sing out</button>
)

export default withFirebase(SignOut);
