const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

const app = express()

const port = 3000

const MONGO_URI = 'mongodb+srv://admin:admin@cluster0.clbnh.mongodb.net/Cluster0?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

app.use(express.json())

app.use(cookieSession({
  name: 'session',
  keys: ['testKey'],
}))

app.use('/account', accountRouter)
app.use('/api', apiRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// })

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
