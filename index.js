const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const db = require('./data/databse.js')

//set folder public as Public source for static files
app.use(express.static('public'))

//Setting home view
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/main.html'));
})

//Creating API for fetch calls
app.get('/db', (req, res) => {
  res.send(db)
})

//Returns urlencoded bodies
app.use(express.urlencoded({
  extended: true
}))

//Post new users to database
app.post('/', function (req, res) {
  const newData = req.body;
  const currentData = db.db.people;
  currentData.push(newData);
  console.log('New person added to db!');
  res.redirect(`/?user=added`);
})

//Server listening
app.listen(port, () => {
  console.log(`App works at the address: http://localhost:${port}`)
})