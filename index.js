const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ 
  extended: true
}))
app.use(bodyParser.json());

const routes = require('./routes/lowdb');

// get list of all food postings
app.get('/api/food', routes.listFood);

// post a new food post
app.post('/api/food', routes.createFood);

// update a food posting
app.put('/api/food/:id', routes.reserveFood);


// create new user 
app.post('/api/user', routes.createUser);

// get all users
app.get('/api/users', routes.listUsers);

// retrieve user details 
// get user by id
app.get('/api/user/:id', routes.retrieveUser);

// update user details
// app.put('/api/user/:id', routes.updateUser)


app.listen(process.env.PORT, () => {
  console.log('App is listening to port ', process.env.PORT)
})