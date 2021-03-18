import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

// initialize firebaseConfig
export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}
//handle google sign in
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                success: true
            }
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.code);
            console.log(err.message);
        })
}
//handle facebook sign in
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then(res => {
            // eslint-disable-next-line no-unused-vars
            var token = res.credential.accessToken;
            var user = res.user;
            user.success = true;
            return user;
        })
        .catch(err => {
            console.log(err);
            console.log(err.code);
            console.log(err.message);
        })
}
//handle sign out 
export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signedOutUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.code);
            console.log(err.message);
        })
}
//(new user): create user with email and password
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
        })
}
//(returning user): sign in user with email and password
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}
//update user name
const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({ displayName: name })
        .then(function () {
            console.log('user name updated successfully')
        })
        .catch(function (error) {
            console.log(error)
        })
}
