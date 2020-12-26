const functions = require('firebase-functions');
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
admin.initializeApp()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'een9.aman@gmail.com',
        pass: 'Aman2000'
    }
})
exports.sendEmailNotification = functions.firestore.document('/mail/{mailId}').onCreate(
    async (snapshot) => {
        const data = await snapshot.data()
        const mailOptions = {
            from: '"Fundwire manager request" <info.fundwire@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: "aman_A00@mail.ru",
            subject: 'Hello from subject', // email subject
            html: `
                <div>
                    <div> <b>Fullname: </b> <span>${data.fullname}</span> </div>
                    <div> <b>Email: </b> <span>${data.email}</span> </div>
                    <div> <b>Company name: </b> <span>${data.companyName}</span> </div>
                    <div> <b>Position: </b> <span>${data.position}</span> </div>
                </div>
            ` // email content in HTML
        };

        transporter.sendMail(mailOptions, (err) => {
            if(err){
                console.log(err)
                return err.toString()
            }
            console.log('Email sent successfully')
            return 'Email sent successfully'
        });
        // return authData.sendMail(mailOptions).then((res)=> console.log('successfully sent that mail', res.toString()) ).catch((error) => console.log('error )) : ',error))
    }
)