const Mailgun = require('mailgun.js');
const formData = require('form-data');
const fs = require('fs');
const path = require('path');

const DOMAIN = "sandbox058100d9b5e1454ea9bab0d9e6850ca1.mailgun.org";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: '0ad3b385f21f2400fbda434b0d36a702-5dcb5e36-c797349b'
});

exports.sendWelcomeEmail = (email) => {
    const filePath = path.join(__dirname, 'welcome.pdf'); 
    const attachment = fs.createReadStream(filePath);     

    mg.messages.create(DOMAIN, {
        from: "Mailgun Sandbox <postmaster@sandbox058100d9b5e1454ea9bab0d9e6850ca1.mailgun.org>",
        to: [email],
        subject: "welcome",
        template: "welcome",
        attachment: [attachment]   
    })
    .then((msg) => {
        console.log('Email sent successfully:', msg);
        return true;
    })
    .catch((err) => {
        console.error('Error sending email:', err);
        return false;
    });
};
