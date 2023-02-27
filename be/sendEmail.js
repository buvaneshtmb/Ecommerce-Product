// const nodemailer = require('nodemailer')
// const { HOST, SERVICE, EMAIL_PORT, SECURE, USER, PASS } = require('./emailConfig')

// module.exports = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: HOST,
//             service: SERVICE,
//             post: Number(EMAIL_PORT),
//             secure: Boolean(SECURE),
//             auth: {
//                 user: USER,
//                 pass: PASS
//             }
//         })
//         await transporter.sendMail({
//             from: USER,
//             to: email,
//             subject: subject,
//             text: text
//         })
//         console.log("Email sent succefully")
//     } catch (error) {
//         console.log("Email not send")
//         console.log(error)
//     }
// }