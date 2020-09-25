import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBQzR-N5sSCwp2CCuucyjrhaOzN32__pbM",
    authDomain: "clothing-app-11b25.firebaseapp.com",
    databaseURL: "https://clothing-app-11b25.firebaseio.com",
    projectId: "clothing-app-11b25",
    storageBucket: "clothing-app-11b25.appspot.com",
    messagingSenderId: "1025025002919",
    appId: "1:1025025002919:web:86e98509e151eb72177a82",
    measurementId: "G-VYGQV816VM"
};

export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const{displayName , email} = userAuth;
        const createdAt = new Date();
        try{
           await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData
           }) 
        }
        catch(error){
            console.log('error creating user',error.message);
        }
    }

    return userRef;

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;