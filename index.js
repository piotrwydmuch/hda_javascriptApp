const express = require('express');
const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator')
const path = require('path');
const database = require('./data/databse.js');

const app = express();
const port = 3000;

//Limiters
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50 // limit each IP to 50 requests per windowMs
})
const addUserLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, //max users
  message: 'Too many users added from this IP.'
})

//Run main Limiter
app.use(limiter);

//Set folder public as Public source for static files
app.use(express.static('public'))

//Setting home view
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/main.html'));
})

//Creating API for fetch calls
app.get('/db', (req, res) => {
  res.send(database.db)
})

//Returns urlencoded bodies
app.use(express.urlencoded({
  extended: true
}))

//Post new users to database
app.post('/', [
  addUserLimiter,
  check('name')
  .isLength({ min: 4, max: 32 })
  .withMessage('Name must be at least 4 and max 32 characters')
  .isAlpha()
  .withMessage('Only normal, alphabetic characters'),
  check('age').notEmpty().isNumeric(),
], (req, res) => {
  
  let newData = {
    'name': req.body.name,
    'age': Number(req.body.age),
  }

  //If there are any errors, print them to console
  //and stop adding new users to database
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('New user cannot be added.', errors);
    return res.status(400).json({ errors: errors});
  }

  //Adding new user to databse
  let currentData = database.db.people;
  currentData.push(newData);
  console.log('New person added to db!');
  res.redirect(`/?user=added`);
})

//Server listening
app.listen(port, () => {
  console.log(`App works at the address: http://localhost:${port}`)
})