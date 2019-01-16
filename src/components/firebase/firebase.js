import app from 'firebase/app';
import  'firebase/auth';
import 'firebase/database'
var config = {
    apiKey: "AIzaSyDmweYJE1ESDqLoT-6DJTPI2llj-3Xgh4U",
    authDomain: "reat-with-firebase-auth.firebaseapp.com",
    databaseURL: "https://reat-with-firebase-auth.firebaseio.com",
    projectId: "reat-with-firebase-auth",
    storageBucket: "reat-with-firebase-auth.appspot.com",
    messagingSenderId: "191647222479"
};
console.log(process.env)
class Firebase  {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();

        //    Socail Singin Provider
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
        this.twitterProvider = new app.auth.TwitterAuthProvider();
    }


//        Auth API

    doCreateUserWithEmailAndPassword = (email,password)=>
        this.auth.createUserWithEmailAndPassword(email,password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);
    doSignInWithFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);
    doSignInWithTwitter = () =>
        this.auth.signInWithPopup(this.twitterProvider);

    doSignOut = ()=> this.auth.signOut();

    doPasswordReset = email=> this.auth.sendPasswordResetEmail(email);

    doSendEmailVerification = ()=>
        this.auth.currentUser.sendEmailVerification({
            url:'http://localhost:3000'
        })

    doPasswordUpdate = password => this.auth.currentUser(password);

    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next,fallback)=>
        this.auth.onAuthStateChanged(authUser=>{
            if(authUser){
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot=>{
                        const dbUser = snapshot.val();
                        if(!dbUser.roles){
                            dbUser.roles =[];
                        }

                    //    merge auth and db user
                        authUser ={
                            uid: authUser.uid,
                            email:authUser.email,
                            emailVerified:authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };
                        next(authUser)
                    })
            }else{
                fallback();
            }
        })
    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;