import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDGLpSrSPY88ADC6IDujnhfUpM8MsQeqXo",
    authDomain: "test-51227.firebaseapp.com",
    databaseURL: "https://test-51227.firebaseio.com",
    projectId: "test-51227",
    storageBucket: "test-51227.appspot.com",
    messagingSenderId: "91418477934",
    appId: "1:91418477934:web:3f1dd7e2588de4a90a6d7f",
    measurementId: "G-9JSXVG789R"
}

firebase.initializeApp(config)

export const auth = firebase.auth;
export const db = firebase.database();


export function signInFirebase(email:string, password: string) {
    return auth().signInWithEmailAndPassword(email, password);
}
