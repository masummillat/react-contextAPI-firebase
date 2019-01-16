import React,{Component} from 'react';
import {withRouter} from 'react-router-dom'
import {compose} from 'recompose';
import {withFirebase} from "../firebase";
import * as ROUTES from '../constants/routes';
import {PasswordForgetLink} from "../passwordforget/Index";
import {SignUpLink} from "../singup/Index";
import SignInGoogle from './SignInGoogleBase'
const SignInPage = ()=>(
    <div>
        <h1>Sign In</h1>
        <SignInGoogle/>
        <SignInForm/>
        <PasswordForgetLink/>
        <SignUpLink/>
    </div>
)


const INITIAL_STATE={
    email:'',
    password:'',
    error:'',
    isInvalid:false
}
class SignInFormBase extends Component{

    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event)=>{
        const {email,password} = this.state;
        this.props.firebase.doSignInWithEmailAndPassword(email,password)
            .then(authuser=>{
                this.setState({...INITIAL_STATE})
                this.props.history.push(ROUTES.HOME);
            }).catch(error=>{
                this.setState({error})
        })

        event.preventDefault();

    }

    onChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render() {
        const {email,password,error,isInvalid} = this.state;
        return(
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}
const SignInForm = compose(withRouter,withFirebase)(SignInFormBase)
export default SignInPage;