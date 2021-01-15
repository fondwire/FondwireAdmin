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

auth().onAuthStateChanged((res:any)=>{
    let user:any = res?.toJSON()
    let data: any = {
        isAdmin: false,
        ...res?.toJSON()
    }
    if(user) {
        db.ref('/admins').once('value', function (snapshot) {
            return snapshot.toJSON()
        }).then((d) => {
            let admins = Object.values(d.toJSON() as string)
            admins.forEach((admin) => {
                if (admin === user.uid) {
                    data = {isAdmin: true, ...res.user?.toJSON()}
                }
            })
            if (!data.isAdmin) {
                let ref = db.ref('/users')
                ref.orderByChild("email").on("child_added", function (snapshot) {
                    if (snapshot.val().email === data.email) {
                        // console.log(snapshot.key + " : " + snapshot.val().email );
                        // console.log(snapshot.val().verified)
                        data = {
                            verified: snapshot.val().verified ? snapshot.val().verified : false,
                            id: snapshot.key,
                            ...data
                        }
                        localStorage.setItem('userData', JSON.stringify(data))
                    }
                });
            }
            localStorage.setItem('userData', JSON.stringify(data))
        })
    }
})