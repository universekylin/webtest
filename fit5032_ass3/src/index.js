const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const functions = require('firebase-functions')
const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send(
    'We are an organization dedicated to providing healthcare services to the immigrant community. We understand the language barriers, cultural differences, and unique challenges in healthcare needs that immigrants may face when adapting to a new environment. Therefore, our platform is designed to help them better integrate into their new society by providing multilingual support, culturally sensitive medical resources, and health services designed specifically for immigrants, while ensuring that their health needs are properly addressed. Whether it is the first time you seek medical services or you need ongoing health management, we are here to provide you with comprehensive support!'
  )
})

exports.api = functions.https.onRequest(app)
