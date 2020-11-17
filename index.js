const express = require('express')
const app = express()
const port = 3000
const db = require('./data/databse.js')
const path = require('path')

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

//Server listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})