import firebase from "firebase";

const config = {
    apiKey: "AIzaSyBD5eMPVjDDsP_rYWQZrrq7CO2V3KFGGKM",
    authDomain: "fondwire.firebaseapp.com",
    databaseURL: "https://fondwire.firebaseio.com",
    projectId: "fondwire",
    storageBucket: "fondwire.appspot.com",
    messagingSenderId: "49055553295",
    appId: "1:49055553295:web:c2401460d86a0f3dab507a",
    measurementId: "G-NP0K4HCDP6"
}

firebase.initializeApp(config)

export const auth = firebase.auth;
export const db = firebase.database();

export function signInFirebase(email:string, password: string) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function Logout() {
    return auth().signOut()
}

// auth().onAuthStateChanged((user:any)=>{
//     console.log(user?.toJSON())
// })