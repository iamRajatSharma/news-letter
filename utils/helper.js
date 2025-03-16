const nodemailer = require("nodemailer");

async function sendConfirmationMail(subject, body, to) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    return transporter.sendMail({
        from: `'"Node Mailer " <${process.env.EMAIL_USER}>'`,
        to: to,
        subject,
        text: body,
    });
}

module.exports = {
    sendConfirmationMail
}