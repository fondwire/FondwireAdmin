const functions = require('firebase-functions');
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

admin.initializeApp(
    // functions.config().firebase
)
require('dotenv').config()

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env
exports.sendEmailNotification = functions.firestore.document('/mail').onCreate(
    async (snapshot) => {
        const data = snapshot.data()
        console.log(snapshot.data())

        const authData = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASSWORD
            }
        })

        authData.sendMail({
            from: 'info@fundwire.com',
            to: `${data.email}`,
            subject: 'The new request from fundwire admin!',
            text: `${data.email}`,
            html: `${data.message.html}`
        }).then(()=> console.log('successfully sent that mail') ).catch((error) => console.log(error))
    }
)