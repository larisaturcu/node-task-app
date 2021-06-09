const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'turcu.larisa@gmail.com',
        subject: 'Welcome to the app',
        text: `Welcome to the app, ${name}. Let me know it you like it`
    })
}

const sendCancelEmail = (email, name) => {
    console.log('sending delete mail')
    sgMail.send({
        to: email,
        from: 'turcu.larisa@gmail.com',
        subject: 'Bye bye from the app',
        text: `We are sorry you are leaving, ${name}. Please give us a feedback`
    })
}

module.exports = {
    sendWelcomeEmail, sendCancelEmail
}