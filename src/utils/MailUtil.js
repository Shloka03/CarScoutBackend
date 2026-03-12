const mailer = require("nodemailer")
require("dotenv").config()

const mailSend = async (to, subject, html) => {

    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: `"Car Scout 🚗" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html   
    }

    const mailResponse = await transporter.sendMail(mailOptions)

    console.log("Mail sent:", mailResponse)

    return mailResponse
}

module.exports = mailSend