const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const db = require('./data/databse.js')

//set folder public as Public source for static files
app.use(express.static('public'))

//Setting custom view
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/main.html'));
})

//Use database
app.get('/db', (req, res) => {
  res.send(db)
})

app.use(express.urlencoded({
  extended: true
}))

//Update database
app.post('/', function (req, res) {
  const newData = req.body;
  const currentData = db.people;
  currentData.push(newData);
  console.log('New person added to db!')
  res.redirect('/')
})

//Server listening
app.listen(port, () => {
  console.log(`App works at the address: http://localhost:${port}`)
})