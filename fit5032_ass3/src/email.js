const Mailgun = require('mailgun.js')
const formData = require('form-data')

const DOMAIN = 'sandboxbbe7dedbf4d24743a5436b0f85ed9e29.mailgun.org'

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: '5dcb5e36-d3865fff'
})
exports.sendWelcomeEmail = (email) => {
  mg.messages
    .create(DOMAIN, {
      from: 'Mailgun Sandbox <postmaster@sandboxbbe7dedbf4d24743a5436b0f85ed9e29.mailgun.org>',
      to: [email],
      subject: 'Welcome!',
      template: 'welcome email'
    })
    .then((msg) => {
      console.log(msg)
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })
}
